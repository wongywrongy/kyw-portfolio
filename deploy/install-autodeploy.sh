#!/usr/bin/env bash
# One-time setup on neo for automatic deploys. Run from the repo, as yourself:
#
#   sudo ./deploy/install-autodeploy.sh           webhook: deploy as soon as
#                                                 GitHub reports a push to main
#   sudo ./deploy/install-autodeploy.sh --poll    no webhook: check main every
#                                                 2 minutes instead
#
# Both modes also install a daily 06:00 rebuild without cache, which refetches
# the GitHub activity graph. Deploys always run as you, through deploy.sh.
# Safe to run again; switching modes turns the other one off.
#
# Webhook mode prints the remaining two steps (tunnel route + GitHub webhook);
# docs/DEPLOY.md has them too.
#
# Undo everything:
#   sudo systemctl disable --now wongworks-webhook.service \
#     wongworks-deploy.timer wongworks-refresh.timer

set -euo pipefail

MODE="${1:---webhook}"
case "$MODE" in
  --webhook | --poll) ;;
  *) echo "usage: sudo $0 [--webhook|--poll]" >&2; exit 2 ;;
esac

if [[ $EUID -ne 0 ]]; then
  echo "run with sudo: sudo $0 $*" >&2
  exit 1
fi

REPO="$(cd "$(dirname "$0")/.." && pwd)"
RUN_AS="${SUDO_USER:-}"
if [[ -z "$RUN_AS" || "$RUN_AS" == "root" ]]; then
  echo "run with sudo from your own account, not as root, so deploys run as you" >&2
  exit 1
fi
if ! id -nG "$RUN_AS" | tr ' ' '\n' | grep -qx docker; then
  echo "$RUN_AS isn't in the docker group; add it first: sudo usermod -aG docker $RUN_AS" >&2
  exit 1
fi

chmod +x "$REPO/deploy/deploy.sh" "$REPO/deploy/webhook.py"
PORT=9471
ENV_DIR=/etc/wongworks
ENV_FILE=$ENV_DIR/webhook.env

oneshot() {
  local name="$1" args="$2" description="$3"
  cat > "/etc/systemd/system/$name.service" <<EOF
[Unit]
Description=$description
After=network-online.target docker.service
Wants=network-online.target

[Service]
Type=oneshot
User=$RUN_AS
WorkingDirectory=$REPO
ExecStart=$REPO/deploy/deploy.sh $args
TimeoutStartSec=45min
EOF
}

# --- Daily refresh (both modes) ----------------------------------------------
oneshot wongworks-refresh --fresh "wongworks: daily rebuild to refresh the activity graph"
cat > /etc/systemd/system/wongworks-refresh.timer <<'EOF'
[Unit]
Description=wongworks: daily rebuild for the activity graph

[Timer]
OnCalendar=*-*-* 06:00:00
Persistent=true
RandomizedDelaySec=10min

[Install]
WantedBy=timers.target
EOF

if [[ "$MODE" == "--webhook" ]]; then
  # --- Webhook listener ------------------------------------------------------
  install -d -m 0750 -o root -g "$RUN_AS" "$ENV_DIR"
  if [[ ! -s "$ENV_FILE" ]] || ! grep -q '^WEBHOOK_SECRET=.' "$ENV_FILE"; then
    printf 'WEBHOOK_SECRET=%s\nWEBHOOK_PORT=%s\n' "$(openssl rand -hex 32)" "$PORT" > "$ENV_FILE"
  fi
  chown root:"$RUN_AS" "$ENV_FILE"
  chmod 0640 "$ENV_FILE"

  cat > /etc/systemd/system/wongworks-webhook.service <<EOF
[Unit]
Description=wongworks: deploy on GitHub push (webhook on 127.0.0.1:$PORT)
After=network-online.target docker.service
Wants=network-online.target

[Service]
User=$RUN_AS
WorkingDirectory=$REPO
EnvironmentFile=$ENV_FILE
ExecStart=/usr/bin/python3 -u $REPO/deploy/webhook.py
Restart=always
RestartSec=5
NoNewPrivileges=true
ProtectSystem=full
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

  systemctl daemon-reload
  systemctl disable --now wongworks-deploy.timer 2>/dev/null || true
  systemctl enable --now wongworks-refresh.timer
  systemctl enable wongworks-webhook.service
  systemctl restart wongworks-webhook.service
  sleep 1

  if curl -fsS "http://127.0.0.1:$PORT/healthz" >/dev/null; then
    status="listening on 127.0.0.1:$PORT"
  else
    status="NOT responding; check: journalctl -u wongworks-webhook -n 30"
  fi
  secret="$(sed -n 's/^WEBHOOK_SECRET=//p' "$ENV_FILE")"

  cat <<EOF

Webhook listener installed and $status.
Deploys run as $RUN_AS from $REPO.

Two steps left:

1. Cloudflare Zero Trust -> Networks -> Tunnels -> neo's tunnel -> Public Hostname -> Add
     Subdomain: hooks     Domain: wongworks.dev     Path: (empty)
     Service:   HTTP      URL:    localhost:$PORT

2. GitHub -> wongywrongy/kyw-portfolio -> Settings -> Webhooks -> Add webhook
     Payload URL:   https://hooks.wongworks.dev/github
     Content type:  application/json
     Secret:        $secret
     Events:        Just the push event

GitHub sends a ping when you save; "journalctl -u wongworks-webhook -f" should
show "ping from GitHub: webhook is connected".

See the secret again later: sudo cat $ENV_FILE
EOF
else
  # --- Polling timer -----------------------------------------------------------
  oneshot wongworks-deploy --if-changed "wongworks: deploy new commits on main"
  cat > /etc/systemd/system/wongworks-deploy.timer <<'EOF'
[Unit]
Description=wongworks: check main for new commits every 2 minutes

[Timer]
OnBootSec=2min
OnUnitActiveSec=2min
AccuracySec=15s

[Install]
WantedBy=timers.target
EOF

  systemctl daemon-reload
  systemctl disable --now wongworks-webhook.service 2>/dev/null || true
  systemctl enable --now wongworks-deploy.timer wongworks-refresh.timer

  echo
  echo "Polling installed: main is checked every 2 minutes. Deploys run as $RUN_AS from $REPO."
  systemctl list-timers 'wongworks-*' --no-pager
  echo
  echo "Logs: journalctl -u wongworks-deploy -f"
fi
