#!/usr/bin/env python3
"""
update_fotos.py
───────────────
Escanea img/salas/ y actualiza automáticamente el campo fotos: en data.js
para cada sala cuya foto principal siga el convenio de numeración _01.ext.

Cómo funciona:
  - Para cada línea  foto: "img/salas/Nombre_01.ext"  que encuentre en data.js,
    busca en el directorio si existen  Nombre_02.ext, Nombre_03.ext… (cualquier
    extensión webp/jpg/jpeg/png).
  - Si hay extras, inserta o reemplaza el bloque  fotos: [...]  justo después.
  - Si ya no hay extras (borraste alguna foto), elimina el bloque fotos:.
  - Las salas sin numeración (p. ej. Cocina.jpg) se ignoran.

Uso:
  python3 update_fotos.py
"""

import re
import sys
from pathlib import Path

ROOT      = Path(__file__).parent
SALAS_DIR = ROOT / "img" / "salas"
DATA_JS   = ROOT / "js" / "data.js"

# Coincide con:  foto: "img/salas/NombreBase_01.ext"
FOTO_RE = re.compile(
    r'^([ \t]*foto:\s*"img/salas/)([\w\-]+?)_(\d{2})\.(webp|jpg|jpeg|png)(")'
)

# Inicio de bloque fotos: [
FOTOS_START_RE = re.compile(r'^[ \t]*fotos:\s*\[')


def buscar_extras(base_name: str) -> list:
    """Devuelve rutas 'img/salas/...' para _02, _03, … que existan."""
    extras = []
    for n in range(2, 50):
        for ext in ("webp", "jpg", "jpeg", "png"):
            f = SALAS_DIR / f"{base_name}_{n:02d}.{ext}"
            if f.exists():
                extras.append(f"img/salas/{base_name}_{n:02d}.{ext}")
                break  # una sola extensión por número
    return extras


def formatear_fotos(extras: list, indent: str) -> list:
    """Devuelve las líneas del bloque fotos: [...] ya listas."""
    lineas = [f"{indent}fotos: [\n"]
    for j, e in enumerate(extras):
        coma = "," if j < len(extras) - 1 else ""
        lineas.append(f'{indent}  "{e}"{coma}\n')
    lineas.append(f"{indent}],\n")
    return lineas


def consumir_fotos_block(src: list, start: int) -> int:
    """Devuelve el índice de la primera línea DESPUÉS del bloque fotos: [...]."""
    depth = 0
    i = start
    while i < len(src):
        depth += src[i].count("[") - src[i].count("]")
        i += 1
        if depth <= 0:
            break
    return i


def main():
    if not DATA_JS.exists():
        print(f"ERROR: No se encuentra {DATA_JS}", file=sys.stderr)
        sys.exit(1)

    original = DATA_JS.read_text(encoding="utf-8")
    src      = original.splitlines(keepends=True)
    out      = []
    i        = 0
    cambios  = 0

    while i < len(src):
        line = src[i]
        m    = FOTO_RE.match(line)

        if m:
            base_name = m.group(2)   # e.g. "San_Antonio_el_Real_-_Claustro_Central"
            indent    = re.match(r"([ \t]*)", line).group(1)
            extras    = buscar_extras(base_name)

            out.append(line)
            i += 1

            # Buscar si ya existe un bloque fotos: a continuación
            j = i
            while j < len(src) and src[j].strip() == "":
                j += 1
            tiene_fotos = j < len(src) and FOTOS_START_RE.match(src[j])

            if tiene_fotos:
                # Volcar las líneas vacías intermedias
                out.extend(src[i:j])
                fin = consumir_fotos_block(src, j)
                if extras:
                    out.extend(formatear_fotos(extras, indent))
                # sin extras → simplemente no reescribimos el bloque (lo eliminamos)
                i = fin
                cambios += 1
            elif extras:
                # Insertar nuevo bloque justo después de foto:
                out.extend(formatear_fotos(extras, indent))
                cambios += 1

        else:
            out.append(line)
            i += 1

    nuevo = "".join(out)
    if nuevo != original:
        DATA_JS.write_text(nuevo, encoding="utf-8")
        print(f"✓ data.js actualizado — {cambios} sala(s) con galería actualizadas.")
    else:
        print("Sin cambios — data.js ya está al día.")


if __name__ == "__main__":
    main()
