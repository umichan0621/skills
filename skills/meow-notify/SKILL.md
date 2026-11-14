---
name: meow-notify
description: "MeoW Notification Skill - Push notifications via MeoW when tasks are completed. Supports auto-trigger (when all TODOs are complete) and manual trigger. Keywords: meow, notify me, push notification"
argument-hint: "[username]"
---

# MeoW Notification Skill

Push task completion notifications via [MeoW](https://github.com/user/meow) message service.

## How It Works

**Auto-trigger**: Automatically send notification when all TODO tasks are completed (at least 1 completed, no pending/in-progress)

**Manual trigger**: User inputs `meow`, `notify me`

## Installation

```bash
# Install skill and configure
mkdir -p ~/.config/opencode/skills/meow-notify
cp SKILL.md meow-notify.sh ~/.config/opencode/skills/meow-notify/
chmod +x ~/.config/opencode/skills/meow-notify/meow-notify.sh
echo "your-username" > ~/.config/meow.conf

# Create POST-HOOK (auto-trigger)
mkdir -p ~/.config/opencode/hooks
cat > ~/.config/opencode/hooks/post-todowrite.sh << 'EOF'
#!/bin/bash
CONFIG_FILE="$HOME/.config/meow.conf"
TODO_DIR="$HOME/.local/share/opencode/storage/todo"
LATEST_TODO=$(ls -t "$TODO_DIR"/*.json 2>/dev/null | head -1)
[ -z "$LATEST_TODO" ] && exit 0

if ! grep -q '"status":"pending"' "$LATEST_TODO" && \
   ! grep -q '"status":"in_progress"' "$LATEST_TODO" && \
   grep -q '"status":"completed"' "$LATEST_TODO"; then
  USER_NAME=$(cat "$CONFIG_FILE" 2>/dev/null | tr -d '[:space:]')
  [ -n "$USER_NAME" ] && bash ~/.config/opencode/skills/meow-notify/meow-notify.sh "$USER_NAME"
fi
EOF
chmod +x ~/.config/opencode/hooks/post-todowrite.sh
```

## Usage

After installation, AI creates TODOs and completes them step by step. When all are complete, notification is sent automatically.

**Manual trigger**: `meow` or `notify me` or specify username `meow username`

## Configuration

Username priority: command line argument > `~/.config/meow.conf`

Custom API endpoint: edit `API_BASE` variable in `meow-notify.sh`
