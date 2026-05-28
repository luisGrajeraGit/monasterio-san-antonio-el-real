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

  // Detectar dispositivo táctil para adaptar la interacción
  var esMovil = window.matchMedia('(pointer: coarse)').matches;

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

    // Tooltip y hover sólo en escritorio (no hay hover en táctil)
    if (!esMovil) {
      rect.bindTooltip(sala.nombre, {
        className: 'sala-tooltip',
        direction: 'top',
        sticky:    true,
        offset:    [0, -6]
      });

      rect.on('mouseover', function () {
        abrirPanel(sala, this);
      });
    }

    // Clic: en móvil abre el panel (bottom sheet); en escritorio navega directo
    rect.on('click', function (e) {
      L.DomEvent.stopPropagation(e);
      if (esMovil) {
        abrirPanel(sala, this);
      } else {
        window.location.href = 'sala.html?sala=' + sala.id;
      }
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
    // funcion
    var elFuncion = document.getElementById('panel-funcion');
    if (sala.funcion) {
      elFuncion.textContent = sala.funcion;
      elFuncion.classList.remove('vacio');
    } else {
      elFuncion.textContent = '—';
      elFuncion.classList.add('vacio');
    }

    // atrezzo (array de objetos)
    var elAtrezzo = document.getElementById('panel-atrezzo');
    if (Array.isArray(sala.objetos) && sala.objetos.length) {
      elAtrezzo.textContent = sala.objetos.join(', ');
      elAtrezzo.classList.remove('vacio');
    } else {
      elAtrezzo.textContent = '—';
      elAtrezzo.classList.add('vacio');
    }

    // Foto
    var foto        = document.getElementById('panel-foto');
    var placeholder = document.getElementById('panel-foto-placeholder');
    foto.style.display = 'block';
    placeholder.style.display = 'none';
    foto.src = sala.foto;
    foto.alt = sala.nombre;

    // Enlace "Ver ficha completa" (esencial en móvil)
    var verFicha = document.getElementById('panel-ver-ficha');
    if (verFicha) verFicha.href = 'sala.html?sala=' + sala.id;

    // Nombre de sala también navega a la ficha
    var nombreLink = document.getElementById('panel-nombre-link');
    if (nombreLink) nombreLink.href = 'sala.html?sala=' + sala.id;

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

  // ── Toggle del mapa en móvil ───────────────────────────────────────────────
  // Altura personalizada del mapa guardada tras arrastrar (null = usar CSS)
  var mapaHeightPx = null;

  function toggleMapa() {
    var mapEl    = document.getElementById('map');
    var chevron  = document.getElementById('mapa-chevron');
    var colapsado = mapEl.classList.toggle('mapa-colapsado');
    if (colapsado) {
      // Al colapsar: limpiar el inline style para que height:0 del class funcione
      mapEl.style.height = '';
    } else if (mapaHeightPx !== null) {
      // Al expandir: restaurar la altura personalizada si la había
      mapEl.style.height = mapaHeightPx + 'px';
    }
    // Chevron: apunta arriba (⌃) cuando el mapa está visible, abajo (⌄) cuando colapsado
    if (chevron) chevron.style.transform = colapsado ? 'rotate(180deg)' : '';
    setTimeout(function () { map.invalidateSize(); }, 370);
  }
  window.toggleMapa = toggleMapa;

  // ── Divisor arrastrable entre mapa y panel (móvil) ────────────────────────
  // Usa Pointer Events + setPointerCapture para funcionar en iOS Safari,
  // que ignora overflow:hidden en body y puede ignorar preventDefault en touchmove.
  (function () {
    var dividerEl = document.getElementById('drag-divider');
    var mapElDrag = document.getElementById('map');

    if (!dividerEl || !mapElDrag) return;

    // touch-action:none es imprescindible para que pointermove no quede bloqueado
    dividerEl.style.touchAction = 'none';

    var isDragging = false;
    var dragStartY = 0;
    var dragStartH = 0;

    dividerEl.addEventListener('pointerdown', function (e) {
      // Si el mapa está colapsado, expandirlo primero
      if (mapElDrag.classList.contains('mapa-colapsado')) {
        mapElDrag.classList.remove('mapa-colapsado');
        var chevron = document.getElementById('mapa-chevron');
        if (chevron) chevron.style.transform = '';
        mapElDrag.style.height = (mapaHeightPx || Math.round(window.innerHeight * 0.38)) + 'px';
      }
      isDragging = true;
      dragStartY = e.clientY;
      dragStartH = mapElDrag.getBoundingClientRect().height;
      mapElDrag.style.transition = 'none';
      // Captura todos los eventos de este puntero/dedo en nuestro elemento,
      // sacándolos del sistema de scroll del navegador
      dividerEl.setPointerCapture(e.pointerId);
    });

    dividerEl.addEventListener('pointermove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      var dy    = e.clientY - dragStartY;
      var mainH = mapElDrag.parentElement
                    ? mapElDrag.parentElement.getBoundingClientRect().height
                    : window.innerHeight;
      var newH  = Math.max(80, Math.min(dragStartH + dy, mainH - 100));
      mapElDrag.style.height = newH + 'px';
      map.invalidateSize();
    });

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      mapElDrag.style.transition = '';
      mapaHeightPx = mapElDrag.getBoundingClientRect().height;
      map.invalidateSize();
    }
    dividerEl.addEventListener('pointerup',     endDrag);
    dividerEl.addEventListener('pointercancel', endDrag);
  }());

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
