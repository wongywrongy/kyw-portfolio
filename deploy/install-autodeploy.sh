#!/usr/bin/env bash
# One-time setup on neo. Installs two systemd timers that run deploy.sh as you:
#
#   wongworks-deploy.timer   every 2 minutes: rebuild if origin/main moved
#                            (so a save in Pages CMS goes live on its own)
#   wongworks-refresh.timer  daily at 06:00: rebuild without cache so the
#                            GitHub activity graph stays current
#
# Run from the repo on neo:
#   sudo ./deploy/install-autodeploy.sh
#
# Undo:
#   sudo systemctl disable --now wongworks-deploy.timer wongworks-refresh.timer

set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo "run with sudo: sudo $0" >&2
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

chmod +x "$REPO/deploy/deploy.sh"

unit() {
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
TimeoutStartSec=20min
EOF
}

unit wongworks-deploy --if-changed "wongworks: deploy new commits on main"
unit wongworks-refresh --fresh "wongworks: daily rebuild to refresh the activity graph"

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

systemctl daemon-reload
systemctl enable --now wongworks-deploy.timer wongworks-refresh.timer

echo
echo "Installed. Deploys run as $RUN_AS from $REPO."
systemctl list-timers 'wongworks-*' --no-pager
echo
echo "Logs: journalctl -u wongworks-deploy -f"
