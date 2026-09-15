#!/usr/bin/env bash
# Idempotent local dev env setup for Alloy sessions.
set -euo pipefail

cd "$(dirname "$0")/.."
ENV_FILE=".env.local"
touch "$ENV_FILE"

set_if_blank() {
  local key="$1" value="$2"
  local current
  current="$(grep -E "^${key}=" "$ENV_FILE" | tail -n1 | cut -d= -f2- || true)"
  if [ -n "${current:-}" ]; then
    return 0
  fi
  # remove blank/placeholder line, then append
  if grep -qE "^${key}=" "$ENV_FILE"; then
    grep -vE "^${key}=" "$ENV_FILE" > "$ENV_FILE.tmp" && mv "$ENV_FILE.tmp" "$ENV_FILE"
  fi
  printf '%s=%s\n' "$key" "$value" >> "$ENV_FILE"
}

set_if_blank NEXT_PUBLIC_WEB3FORMS_KEY "${NEXT_PUBLIC_WEB3FORMS_KEY:-local-dev-placeholder}"
set_if_blank NEXT_PUBLIC_SUPABASE_URL "${NEXT_PUBLIC_SUPABASE_URL:-}"
set_if_blank SUPABASE_SERVICE_ROLE_KEY "${SUPABASE_SERVICE_ROLE_KEY:-}"
set_if_blank IS_ALLOY "${IS_ALLOY:-false}"
