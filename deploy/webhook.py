#!/usr/bin/env python3
"""GitHub push webhook for neo: deploy the site as soon as main changes.

GitHub POSTs to /github on every push. The request is checked against the
shared secret (X-Hub-Signature-256), and a push to main queues a deploy:
deploy.sh --if-changed, run by one worker thread. Pushes that arrive during a
deploy are coalesced into one more run afterwards, so nothing is missed and
builds never overlap. On start it also runs once to catch anything pushed while
the listener was down.

Standard library only. Configured by environment (see install-autodeploy.sh):
  WEBHOOK_SECRET  shared secret, same value as in the GitHub webhook (required)
  WEBHOOK_PORT    loopback port, default 9471
  WEBHOOK_BRANCH  branch that deploys, default main
"""

import hashlib
import hmac
import json
import os
import subprocess
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

SECRET = os.environ.get("WEBHOOK_SECRET", "").encode()
PORT = int(os.environ.get("WEBHOOK_PORT", "9471"))
BRANCH = os.environ.get("WEBHOOK_BRANCH", "main")
DEPLOY = Path(__file__).resolve().parent / "deploy.sh"
MAX_BODY = 5 * 1024 * 1024

pending = threading.Event()


def log(msg: str) -> None:
    print(msg, flush=True)


def worker() -> None:
    while True:
        pending.wait()
        pending.clear()
        result = subprocess.run([str(DEPLOY), "--if-changed"], cwd=DEPLOY.parent.parent)
        if result.returncode != 0:
            log(f"deploy failed with exit code {result.returncode}; the site stays on the previous version")


class Handler(BaseHTTPRequestHandler):
    server_version = "wongworks-webhook"
    sys_version = ""

    def reply(self, code: int, text: str) -> None:
        body = (text + "\n").encode()
        self.send_response(code)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        if self.path == "/healthz":
            self.reply(200, "ok")
        else:
            self.reply(404, "not found")

    def do_POST(self) -> None:
        if self.path != "/github":
            return self.reply(404, "not found")

        try:
            length = int(self.headers.get("Content-Length", ""))
        except ValueError:
            return self.reply(411, "length required")
        if length <= 0 or length > MAX_BODY:
            return self.reply(413, "payload too large")
        body = self.rfile.read(length)

        expected = "sha256=" + hmac.new(SECRET, body, hashlib.sha256).hexdigest()
        given = self.headers.get("X-Hub-Signature-256", "")
        if not hmac.compare_digest(expected, given):
            log("rejected a request with a bad or missing signature")
            return self.reply(401, "bad signature")

        event = self.headers.get("X-GitHub-Event", "")
        if event == "ping":
            log("ping from GitHub: webhook is connected")
            return self.reply(200, "pong")
        if event != "push":
            return self.reply(200, f"ignored {event} event")

        try:
            payload = json.loads(body)
        except ValueError:
            return self.reply(400, "bad json")
        ref = payload.get("ref", "")
        if ref != f"refs/heads/{BRANCH}":
            return self.reply(200, f"ignored push to {ref}")

        head = (payload.get("head_commit") or {}).get("message", "").splitlines()
        log(f"push to {BRANCH}: {head[0] if head else '(no message)'}; deploy queued")
        pending.set()
        self.reply(202, "deploy queued")

    def log_message(self, *args) -> None:  # requests are logged above, not per line
        pass


def main() -> None:
    if not SECRET:
        sys.exit("WEBHOOK_SECRET is not set")
    if not os.access(DEPLOY, os.X_OK):
        sys.exit(f"{DEPLOY} is missing or not executable")

    threading.Thread(target=worker, daemon=True).start()
    pending.set()  # catch up on anything pushed while the listener was down

    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    log(f"listening on 127.0.0.1:{PORT}, deploying pushes to {BRANCH}")
    server.serve_forever()


if __name__ == "__main__":
    main()
