# Monasterio de San Antonio el Real — Web de localización

Herramienta interactiva de preproducción para el largometraje ***Silencio***.  
Permite explorar el plano del monasterio, consultar la ficha de cada estancia y gestionar el material fotográfico de localización.

**GitHub Pages:** https://luisgrajeragit.github.io/monasterio-san-antonio-el-real/

---

## Estructura del proyecto

```
index.html          Plano interactivo (Leaflet.js)
sala.html           Ficha de estancia (cargada dinámicamente)
js/
  data.js           Base de datos de estancias (nombre, foto, bounds/polygon, fichas)
  mapa.js           Lógica del plano interactivo
  sala.js           Lógica de la ficha de estancia + galería + lightbox
css/
  style.css         Estilos globales
img/
  salas/            Fotografías de las estancias (WebP, máx. 1200 px, calidad 82)
lib/                Leaflet 1.x (CSS + JS + iconos, sin dependencias externas)
convert_images.sh   Convierte PNG/JPG → WebP
update_fotos.py     Actualiza automáticamente el array fotos[] en data.js
```

---

## Uso en local

```bash
cd "ruta/al/proyecto/WEB"
python3 -m http.server 8081
# Abrir http://localhost:8081
```

> El sitio es completamente estático; cualquier servidor HTTP sirve.

---

## Añadir o actualizar fotos

1. **Colocar las imágenes** en `img/salas/` con el convenio de nombre:
   ```
   San_Antonio_el_Real_-_NombreSala_01.jpg   ← foto principal
   San_Antonio_el_Real_-_NombreSala_02.jpg   ← fotos adicionales
   ```

2. **Convertir a WebP:**
   ```bash
   bash convert_images.sh
   ```
   Genera archivos `.webp` (calidad 82, máx. 1200 px). Los originales no se eliminan.

3. **Actualizar data.js** para registrar las fotos adicionales:
   ```bash
   python3 update_fotos.py
   ```
   El script detecta automáticamente los archivos `_02`, `_03`… y actualiza el array `fotos: [...]` de cada estancia.

---

## Añadir o editar estancias

Editar `js/data.js`. Cada entrada sigue este esquema:

```js
"id-de-sala": {
  id:           "id-de-sala",
  nombre:       "Nombre visible",
  foto:         "img/salas/San_Antonio_el_Real_-_NombreSala_01.webp",
  fotos: [                                   // opcional, si hay más de una foto
    "img/salas/San_Antonio_el_Real_-_NombreSala_02.webp"
  ],
  bounds:       [[latSur, lngOeste], [latNorte, lngEste]],  // sala rectangular
  // polygon:   [[lat,lng], ...],            // sala oblicua (sustituye a bounds)
  funcion:      "Uso histórico de la estancia.",
  uso_dramatico: "",
  objeto:       "",
  descripcion:  ""
}
```

### Obtener coordenadas del plano

Abre el mapa en el navegador y pulsa **D** para activar el modo de coordenadas.  
Mueve el cursor para ver la posición en tiempo real; haz clic para copiarla al portapapeles.

- Salas rectangulares: toma dos esquinas opuestas → `bounds`.  
- Salas oblicuas: toma los vértices en orden → `polygon`.

---

## Despliegue en GitHub Pages

El sitio se publica automáticamente desde la rama `main`.  
Configurar en **Settings → Pages → Source: Deploy from branch → main / (root)**.

URL pública: **https://luisgrajeragit.github.io/monasterio-san-antonio-el-real/**
