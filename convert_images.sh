#!/usr/bin/env bash
# Convierte todos los PNG, JPG y JPEG de img/salas/ a WebP optimizado para web.
# - Resolución máxima: 1200px de ancho (mantiene proporción)
# - Calidad: 82  (buen equilibrio nitidez / peso)
# - Los originales no se borran

set -euo pipefail

SALAS_DIR="$(dirname "$0")/img/salas"
QUALITY=82
MAX_W=1200

echo "=== Conversión PNG / JPG / JPEG → WebP ==="
echo "Directorio: $SALAS_DIR"
echo ""

for src in "$SALAS_DIR"/*.png "$SALAS_DIR"/*.PNG \
           "$SALAS_DIR"/*.jpg "$SALAS_DIR"/*.JPG \
           "$SALAS_DIR"/*.jpeg "$SALAS_DIR"/*.JPEG; do
  [ -f "$src" ] || continue

  base="${src%.*}"
  dst="${base}.webp"

  size_antes=$(du -k "$src" | cut -f1)

  cwebp -q "$QUALITY" -resize "$MAX_W" 0 -mt "$src" -o "$dst" -quiet

  size_despues=$(du -k "$dst" | cut -f1)
  nombre=$(basename "$src")
  echo "✓ $nombre  →  $(basename "$dst")   [ ${size_antes}K → ${size_despues}K ]"
done

echo ""
echo "Listo. Actualiza las rutas en data.js cambiando .jpg/.jpeg/.png por .webp"
