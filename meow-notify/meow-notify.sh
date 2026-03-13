#!/bin/bash
# SPDX-License-Identifier: MIT
# Copyright (c) 2026 umichan0621
# MeoW Notify - Task completion notification script

set -e

CONFIG_FILE="$HOME/.config/meow.conf"
API_BASE="${MEOW_API_BASE:-https://api.chuckfang.com}"
WORK_SUMMARY_FILE="$HOME/.opencode/WORK_SUMMARY.md"

CONFIG_USER=$([ -f "$CONFIG_FILE" ] && cat "$CONFIG_FILE" | tr -d '[:space:]' || echo "")
USER_NAME="${1:-$CONFIG_USER}"

if [ -z "$USER_NAME" ]; then
  echo "❌ MeoW username not found"
  echo "Configure: echo 'your-username' > ~/.config/meow.conf"
  exit 1
fi

echo "📊 MeoW Notification"

if [ -f "$WORK_SUMMARY_FILE" ]; then
  WORK_SUMMARY=$(tail -n +2 "$WORK_SUMMARY_FILE" | head -n 50)
  TITLE="✅ Tasks Completed"
  MSG=$(printf "📊 Task Completion Report\n\n%s\n\n---\nPowered by MeoW" "$WORK_SUMMARY")
else
  TITLE="✅ Tasks Completed"
  MSG="📊 Task Completion Report\n\nAll tasks have been completed.\n\n---\nPowered by MeoW"
fi

RESPONSE=$(curl -s -X POST "$API_BASE/$USER_NAME" \
  -H "Content-Type: application/json" \
  -d "$(printf '{"title":"%s","msg":"%s"}' \
    "$(echo "$TITLE" | sed 's/"/\\"/g')" \
    "$(echo "$MSG" | sed ':a;N;$!ba;s/\n/\\n/g' | sed 's/"/\\"/g')")")

if echo "$RESPONSE" | grep -q '"status":200'; then
  echo "✅ Notification sent"
else
  echo "❌ Send failed: $RESPONSE"
  exit 1
fi
