#!/usr/bin/env zsh
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"

find "$root" -type f -name "*.md" ! -path "$root/docs/*" -print0 | while IFS= read -r -d '' file; do
  rel="${file#$root/}"
  dest_dir="$root/docs/${rel%/*}"
  mkdir -p "$dest_dir"
  mv -f "$file" "$root/docs/$rel"
done

echo "Moved Markdown files into docs preserving structure."