// js/mapa.js
// Mapa interactivo del Monasterio de San Antonio el Real
// Requiere: Leaflet, js/data.js

(function () {

  // ── Dimensiones reales de la imagen del plano ──────────────────────────────
  const IMG_W = 1462;
  const IMG_H = 1076;

  // ── Inicializar mapa Leaflet con CRS simple (sin proyección geográfica) ────
  const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 3,
    zoomSnap: 0.1,
    zoomDelta: 0.5,
    attributionControl: false,
    zoomControl: true
  });

  // Imagen del plano como capa base
  // Bounds: [[sur, oeste], [norte, este]] → aquí mapeamos píxeles de imagen:
  //   lat = -y_píxel  (y=0 arriba en imagen → lat=0 en Leaflet)
  //   lng =  x_píxel
  const imageBounds = [[-IMG_H, 0], [0, IMG_W]];
  L.imageOverlay(
    'img/San_Antonio_el_Real_-_Mapa_Quinta_de_el_Campillo.png',
    imageBounds
  ).addTo(map);

  map.fitBounds(imageBounds);

  // Límites de paneo (un 15 % de margen alrededor de la imagen)
  map.setMaxBounds([
    [-IMG_H * 1.15, -IMG_W * 0.15],
    [ IMG_H * 0.15,  IMG_W * 1.15]
  ]);

  // ── Estado ─────────────────────────────────────────────────────────────────
  let salaActiva = null;

  // ── Crear zona interactiva para cada sala ──────────────────────────────────
  Object.values(SALAS).forEach(function (sala) {
    if (!sala.bounds && !sala.polygon) return;

    var shapeOpts = {
      color:       '#2E7D32',
      weight:      2,
      fillColor:   '#2E7D32',
      fillOpacity: 0,
      opacity:     0,
      interactive: true
    };
    var rect = sala.polygon
      ? L.polygon(sala.polygon, shapeOpts)
      : L.rectangle(sala.bounds, shapeOpts);

    rect.addTo(map);

    // Tooltip con nombre al pasar el cursor
    rect.bindTooltip(sala.nombre, {
      className: 'sala-tooltip',
      direction: 'top',
      sticky:    true,
      offset:    [0, -6]
    });

    // Hover: muestra el panel con la foto y los datos de la sala
    rect.on('mouseover', function () {
      abrirPanel(sala, this);
    });

    // Al salir de la zona, el panel permanece abierto.
    // Se cierra haciendo clic en el mapa vacío o con el botón ×.
    rect.on('mouseout', function () {
      // el highlight se mantiene mientras sea la sala activa
    });

    // Clic: navegar directamente a la ficha completa de la sala
    rect.on('click', function (e) {
      L.DomEvent.stopPropagation(e);
      window.location.href = 'sala.html?sala=' + sala.id;
    });

    // Guardar referencia para poder manipularla desde el panel
    sala._rect = rect;
  });

  // ── Panel lateral ──────────────────────────────────────────────────────────
  var panelWrapper = document.getElementById('panel-wrapper');

  function abrirPanel(sala, rect) {
    // Desactivar sala anterior
    if (salaActiva && SALAS[salaActiva] && SALAS[salaActiva]._rect) {
      SALAS[salaActiva]._rect.setStyle({ opacity: 0, fillOpacity: 0 });
    }

    salaActiva = sala.id;
    rect.setStyle({ opacity: 1, fillOpacity: 0.22 });

    // Nombre
    document.getElementById('panel-nombre').textContent = sala.nombre;

    // Campos de texto
    var campos = [
      { campo: 'funcion',       elId: 'panel-funcion'   },
      { campo: 'uso_dramatico', elId: 'panel-dramatico' },
      { campo: 'objeto',        elId: 'panel-objeto'    }
    ];
    campos.forEach(function (c) {
      var el = document.getElementById(c.elId);
      if (sala[c.campo]) {
        el.textContent = sala[c.campo];
        el.classList.remove('vacio');
      } else {
        el.textContent = '—';
        el.classList.add('vacio');
      }
    });

    // Foto
    var foto        = document.getElementById('panel-foto');
    var placeholder = document.getElementById('panel-foto-placeholder');
    foto.style.display = 'block';
    placeholder.style.display = 'none';
    foto.src = sala.foto;
    foto.alt = sala.nombre;

    // Mostrar panel y avisar a Leaflet del cambio de tamaño
    panelWrapper.classList.remove('oculto');
    setTimeout(function () { map.invalidateSize(); }, 340);
  }

  function cerrarPanel() {
    if (salaActiva && SALAS[salaActiva] && SALAS[salaActiva]._rect) {
      SALAS[salaActiva]._rect.setStyle({ opacity: 0, fillOpacity: 0 });
    }
    salaActiva = null;
    panelWrapper.classList.add('oculto');
    setTimeout(function () { map.invalidateSize(); }, 340);
  }

  // Cerrar al hacer clic en el mapa (zona sin sala)
  map.on('click', function () {
    if (!debugMode && salaActiva) {
      cerrarPanel();
    }
  });

  // Exponer globalmente para el onclick del HTML
  window.cerrarPanel = cerrarPanel;

  // ── Modo debug: pulsa D para ver coordenadas en tiempo real ───────────────
  //
  //  Cómo usarlo para ajustar las zonas de las salas:
  //    1. Pulsa D. Aparece el panel verde en la esquina inferior izquierda.
  //    2. Mueve el cursor sobre el plano para ver coordenadas en píxeles
  //       de imagen y en formato Leaflet.
  //    3. Haz clic para copiar las coordenadas al portapapeles.
  //    4. Copia los valores obtenidos en js/data.js, en el campo `bounds`
  //       de la sala correspondiente.
  //    5. Pulsa D de nuevo para desactivar el modo debug.

  var debugMode = false;
  var dbgEl = document.getElementById('coords-debug');

  document.addEventListener('keydown', function (e) {
    if ((e.key === 'd' || e.key === 'D') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      debugMode = !debugMode;
      dbgEl.style.display = debugMode ? 'block' : 'none';
      if (debugMode) {
        dbgEl.innerHTML = '<strong>MODO DEBUG</strong> — mueve el cursor para ver coordenadas<br>Haz clic para copiar al portapapeles';
      }
    }
  });

  map.on('mousemove', function (e) {
    if (!debugMode) return;
    var imgX  = Math.round(e.latlng.lng);
    var imgY  = Math.round(-e.latlng.lat);
    var lLat  = Math.round(e.latlng.lat);
    var lLng  = Math.round(e.latlng.lng);
    dbgEl.innerHTML =
      'Imagen: (' + imgX + ', ' + imgY + ') px &nbsp;|&nbsp; ' +
      'Leaflet: [' + lLat + ', ' + lLng + ']';
  });

  map.on('click', function (e) {
    if (!debugMode) return;
    var lat   = Math.round(e.latlng.lat);
    var lng   = Math.round(e.latlng.lng);
    var texto = '[' + lat + ', ' + lng + ']';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(texto).then(function () {
        dbgEl.innerHTML = '✓ Copiado: <strong>' + texto + '</strong>';
      });
    }
    console.log('Coordenada Leaflet:', texto,
      '| Imagen:', '(' + lng + ', ' + (-lat) + ')');
  });

})();
