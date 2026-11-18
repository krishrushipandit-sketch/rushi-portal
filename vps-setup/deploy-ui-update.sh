#!/bin/bash
# ============================================================
# Safe app update for the Hostinger VPS (72.61.228.175)
#
# Rebuilds ONLY the app container. The database container
# (rushi_portal_db) and its data volume are never stopped,
# rebuilt, re-initialised or written to by this script.
#
# Usage (on the VPS, inside the repo):  bash vps-setup/deploy-ui-update.sh
# ============================================================
set -euo pipefail

cd "$(dirname "$0")"
REPO_DIR="$(cd .. && pwd)"
BACKUP_DIR="${HOME}/rushi-backups"
STAMP="$(date +%Y-%m-%d_%H%M%S)"
APP_CONTAINER="rushi_portal_app"
DB_CONTAINER="rushi_portal_db"

if docker compose version >/dev/null 2>&1; then COMPOSE="docker compose"; else COMPOSE="docker-compose"; fi

echo "▶ 1/6  Pre-flight checks"
docker ps --format '{{.Names}}' | grep -qx "$DB_CONTAINER" || { echo "✗ Database container $DB_CONTAINER is not running — aborting, nothing changed."; exit 1; }
LEADS_BEFORE="$(docker exec "$DB_CONTAINER" psql -U rushi_admin -d rushi_portal -Atc 'SELECT count(*) FROM leads')"
PROFILES_BEFORE="$(docker exec "$DB_CONTAINER" psql -U rushi_admin -d rushi_portal -Atc 'SELECT count(*) FROM profiles')"
# Read-only fingerprint of every login password (no hashes are printed) — proves passwords are unchanged afterwards
PW_SQL="SELECT md5(coalesce(string_agg(id::text || ':' || coalesce(password_hash, ''), ',' ORDER BY id), '')) FROM profiles"
PW_BEFORE="$(docker exec "$DB_CONTAINER" psql -U rushi_admin -d rushi_portal -Atc "$PW_SQL")"
echo "   leads: $LEADS_BEFORE   profiles: $PROFILES_BEFORE"

echo "▶ 2/6  Read-only database backup (safety copy, does not modify anything)"
mkdir -p "$BACKUP_DIR"
docker exec "$DB_CONTAINER" pg_dump -U rushi_admin -d rushi_portal -Fc > "$BACKUP_DIR/rushi_portal_$STAMP.dump"
echo "   saved $BACKUP_DIR/rushi_portal_$STAMP.dump ($(du -h "$BACKUP_DIR/rushi_portal_$STAMP.dump" | cut -f1))"

echo "▶ 3/6  Save uploaded photos from the current app container"
mkdir -p "$BACKUP_DIR/uploads_$STAMP"
if docker ps -a --format '{{.Names}}' | grep -qx "$APP_CONTAINER"; then
  docker cp "$APP_CONTAINER:/app/public/uploads/." "$BACKUP_DIR/uploads_$STAMP/" 2>/dev/null || true
fi
echo "   $(ls "$BACKUP_DIR/uploads_$STAMP" | wc -l | tr -d ' ') file(s) saved"

echo "▶ 4/6  Pull latest code"
PREV_COMMIT="$(git -C "$REPO_DIR" rev-parse HEAD)"
git -C "$REPO_DIR" pull --ff-only origin main
NEW_COMMIT="$(git -C "$REPO_DIR" rev-parse HEAD)"
echo "   $PREV_COMMIT → $NEW_COMMIT"

echo "▶ 5/6  Rebuild and restart the APP container only (--no-deps: database untouched)"
$COMPOSE up -d --build --no-deps app
if [ -n "$(ls -A "$BACKUP_DIR/uploads_$STAMP" 2>/dev/null)" ]; then
  docker cp "$BACKUP_DIR/uploads_$STAMP/." "$APP_CONTAINER:/app/public/uploads/"
  docker exec -u root "$APP_CONTAINER" chown -R 1001:1001 /app/public/uploads
fi

echo "▶ 6/6  Health check"
for i in $(seq 1 30); do
  if curl -fsS -o /dev/null "http://localhost:3005/"; then break; fi
  sleep 2
done
curl -fsS -o /dev/null "http://localhost:3005/" || { echo "✗ App did not come up. Roll back with:"; echo "   git -C $REPO_DIR checkout $PREV_COMMIT && $COMPOSE up -d --build --no-deps app"; exit 1; }
LEADS_AFTER="$(docker exec "$DB_CONTAINER" psql -U rushi_admin -d rushi_portal -Atc 'SELECT count(*) FROM leads')"
PROFILES_AFTER="$(docker exec "$DB_CONTAINER" psql -U rushi_admin -d rushi_portal -Atc 'SELECT count(*) FROM profiles')"
echo "   leads: $LEADS_BEFORE → $LEADS_AFTER   profiles: $PROFILES_BEFORE → $PROFILES_AFTER"
PW_AFTER="$(docker exec "$DB_CONTAINER" psql -U rushi_admin -d rushi_portal -Atc "$PW_SQL")"
if [ "$PW_BEFORE" = "$PW_AFTER" ]; then echo "   passwords: all $PROFILES_AFTER unchanged ✓"; else echo "   ⚠ passwords fingerprint changed — check before telling staff"; fi

echo ""
echo "✅ Deployed $NEW_COMMIT. Database container and data were not touched."
echo "   Rollback if needed:  git -C $REPO_DIR checkout $PREV_COMMIT && $COMPOSE up -d --build --no-deps app"
