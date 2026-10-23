// js/mapa.js
// Mapa interactivo del Monasterio de San Antonio el Real
// Requiere: Leaflet, js/data.js

(function () {

  // iOS Safari: bloquear scroll de html/body para evitar que el browser dispare
  // pointercancel al intentar scrollear la página durante el drag del divisor
  document.documentElement.style.height   = '100%';
  document.documentElement.style.overflow = 'hidden';

  // ── Dimensiones del sistema de coordenadas de los planos ───────────────────
  // Las dos plantas están alineadas entre sí y comparten coordenadas, así que
  // al cambiar de planta se conserva el encuadre. Las imágenes tienen el doble
  // de resolución para que el plano se vea nítido al hacer zoom.
  const IMG_W = 1963;
  const IMG_H = 1402;

  const PLANTAS = {
    baja: { nombre: 'Planta baja', imagen: 'img/San_Antonio_el_Real_-_Plano_Planta_Baja.png' },
    alta: { nombre: 'Planta alta', imagen: 'img/San_Antonio_el_Real_-_Plano_Planta_Alta.png' }
  };

  // Estilos de las zonas (un único color para todas las salas)
  const ESTILO_SALA        = { color: '#7d2020', weight: 1, opacity: 0.9, fillColor: '#973d35', fillOpacity: 0.82 };
  const ESTILO_SALA_ACTIVA = { color: '#ffffff', weight: 2, opacity: 1,   fillColor: '#b8473c', fillOpacity: 0.9 };
  const ESTILO_SIN_FICHA   = { color: '#973d35', weight: 1.5, opacity: 0.9, dashArray: '5 4', fillColor: '#973d35', fillOpacity: 0.08 };

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

  // Bounds: [[sur, oeste], [norte, este]] → aquí mapeamos píxeles de imagen:
  //   lat = -y_píxel  (y=0 arriba en imagen → lat=0 en Leaflet)
  //   lng =  x_píxel
  const imageBounds = [[-IMG_H, 0], [0, IMG_W]];

  // Una capa por planta con su imagen, sus zonas y sus etiquetas
  var capas = {};
  Object.keys(PLANTAS).forEach(function (id) {
    capas[id] = L.layerGroup([L.imageOverlay(PLANTAS[id].imagen, imageBounds)]);
  });

  map.fitBounds(imageBounds);

  // Límites de paneo (un 15 % de margen alrededor de la imagen)
  map.setMaxBounds([
    [-IMG_H * 1.15, -IMG_W * 0.15],
    [ IMG_H * 0.15,  IMG_W * 1.15]
  ]);

  // ── Estado ─────────────────────────────────────────────────────────────────
  let salaActiva = null;
  let plantaActiva = null;

  // Detectar dispositivo táctil para adaptar la interacción
  var esMovil = window.matchMedia('(pointer: coarse)').matches;

  // ── Etiquetas con el nombre de cada zona ───────────────────────────────────
  // Se colocan en el centroide y se giran según el lado más largo de la zona,
  // de modo que las salas estrechas u oblicuas llevan el texto a lo largo.
  function geometriaEtiqueta(anillo) {
    var area = 0, cx = 0, cy = 0, n = anillo.length;
    var ladoMax = 0, angulo = 0;
    for (var i = 0; i < n; i++) {
      var p = anillo[i], q = anillo[(i + 1) % n];
      var x0 = p[1], y0 = -p[0], x1 = q[1], y1 = -q[0];
      var f = x0 * y1 - x1 * y0;
      area += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f;
      var lado = Math.hypot(x1 - x0, y1 - y0);
      if (lado > ladoMax) { ladoMax = lado; angulo = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI; }
    }
    area /= 2;
    if (angulo >= 90) angulo -= 180;
    if (angulo < -90) angulo += 180;

    // Extensión de la zona medida perpendicularmente al lado más largo
    var rad = angulo * Math.PI / 180, perpMin = Infinity, perpMax = -Infinity;
    anillo.forEach(function (p) {
      var d = -p[1] * Math.sin(rad) + (-p[0]) * Math.cos(rad);
      perpMin = Math.min(perpMin, d); perpMax = Math.max(perpMax, d);
    });
    var ancho = ladoMax, grosor = perpMax - perpMin;

    // Zonas verticales con sitio suficiente: texto horizontal
    if (Math.abs(angulo) > 45 && grosor >= 70) { angulo = 0; ancho = grosor; }

    return { centro: [-cy / (6 * area), cx / (6 * area)], angulo: angulo, ancho: ancho * 0.9 };
  }

  function crearEtiqueta(nombre, anillo, clase) {
    var g = geometriaEtiqueta(anillo);
    var span = document.createElement('span');
    span.textContent = nombre;
    // Zonas muy pequeñas (p. ej. el pozo): texto horizontal y ancho mínimo
    // para que no se parta el nombre
    if (g.ancho < 60) { g.angulo = 0; g.ancho = 60; }
    span.style.setProperty('--w', g.ancho.toFixed(0));
    span.style.transform = 'translate(-50%, -50%) rotate(' + g.angulo.toFixed(1) + 'deg)';
    return L.marker(g.centro, {
      interactive: false,
      keyboard:    false,
      icon: L.divIcon({ className: 'zona-etiqueta ' + clase, html: span.outerHTML, iconSize: [0, 0] })
    });
  }

  // Anillo exterior de una zona (bounds → 4 esquinas; polygon con huecos → el primero)
  function anilloExterior(zona) {
    if (zona.bounds) {
      var b = zona.bounds;
      return [b[0], [b[0][0], b[1][1]], b[1], [b[1][0], b[0][1]]];
    }
    return Array.isArray(zona.polygon[0][0]) ? zona.polygon[0] : zona.polygon;
  }

  // El tamaño del texto acompaña al zoom (1 unidad del plano = 2^zoom px)
  var mapEl = document.getElementById('map');
  function actualizarEscala(zoom) {
    var escala = Math.pow(2, zoom);
    mapEl.style.setProperty('--escala', escala);
    mapEl.classList.toggle('etiquetas-ocultas', escala < 0.42);
  }
  map.on('zoomanim', function (e) { actualizarEscala(e.zoom); });
  map.on('zoomend',  function ()  { actualizarEscala(map.getZoom()); });
  actualizarEscala(map.getZoom());

  // Plantas en las que aparece una sala: `planta` admite un valor o una lista
  // (los patios y espacios a doble altura se dibujan en las dos)
  function plantasDe(sala) {
    return [].concat(sala.planta || 'baja');
  }

  // Resaltar o restaurar todas las zonas de una sala (una por planta)
  function estiloSala(id, estilo) {
    if (id && SALAS[id] && SALAS[id]._rects) {
      SALAS[id]._rects.forEach(function (r) { r.setStyle(estilo); });
    }
  }

  // ── Crear zona interactiva para cada sala ──────────────────────────────────
  Object.values(SALAS).forEach(function (sala) {
    if (!sala.bounds && !sala.polygon) return;
    sala._rects = [];
    plantasDe(sala).forEach(function (planta) {
      crearZonaSala(sala, capas[planta] || capas.baja);
    });
  });

  function crearZonaSala(sala, capa) {
    var shapeOpts = L.extend({ interactive: true }, ESTILO_SALA);
    var rect = sala.polygon
      ? L.polygon(sala.polygon, shapeOpts)
      : L.rectangle(sala.bounds, shapeOpts);

    rect.addTo(capa);
    crearEtiqueta(sala.nombre, anilloExterior(sala), '').addTo(capa);

    // Tooltip y hover sólo en escritorio (no hay hover en táctil)
    if (!esMovil) {
      rect.bindTooltip(sala.nombre, {
        className: 'sala-tooltip',
        direction: 'top',
        sticky:    true,
        offset:    [0, -6]
      });

      rect.on('mouseover', function () {
        abrirPanel(sala);
      });
    }

    // Clic: en móvil abre el panel (bottom sheet); en escritorio navega directo
    rect.on('click', function (e) {
      L.DomEvent.stopPropagation(e);
      if (esMovil) {
        abrirPanel(sala);
      } else {
        window.location.href = 'sala.html?sala=' + sala.id;
      }
    });

    // Guardar referencia para poder manipularla desde el panel
    sala._rects.push(rect);
  }

  // ── Zonas del índice de los planos que aún no tienen ficha ─────────────────
  // Borde discontinuo, sin enlace; el tooltip indica su número en la leyenda.
  if (typeof ZONAS_SIN_FICHA !== 'undefined') {
    ZONAS_SIN_FICHA.forEach(function (zona) {
      var capa = capas[zona.planta] || capas.baja;
      var forma = L.polygon(zona.polygon, L.extend({ interactive: true }, ESTILO_SIN_FICHA));
      forma.bindTooltip(zona.nombre + ' · sin ficha (nº ' + zona.indice + ' del índice)', {
        className: 'sala-tooltip',
        direction: 'top',
        sticky:    true,
        offset:    [0, -6]
      });
      forma.on('click', function (e) { L.DomEvent.stopPropagation(e); });
      forma.addTo(capa);
      crearEtiqueta(zona.nombre, anilloExterior(zona), 'sin-ficha').addTo(capa);
    });
  }

  // ── Cambio de planta ───────────────────────────────────────────────────────
  // La planta elegida se refleja en la URL (index.html#alta) para poder
  // enlazarla directamente, p. ej. desde la ficha de una sala de planta alta.
  var botonesPlanta = {};

  function mostrarPlanta(id) {
    if (!capas[id] || id === plantaActiva) return;
    if (salaActiva && plantasDe(SALAS[salaActiva]).indexOf(id) === -1) cerrarPanel();
    if (plantaActiva) map.removeLayer(capas[plantaActiva]);
    capas[id].addTo(map);
    plantaActiva = id;
    Object.keys(botonesPlanta).forEach(function (k) {
      botonesPlanta[k].classList.toggle('activa', k === id);
      botonesPlanta[k].setAttribute('aria-pressed', k === id ? 'true' : 'false');
    });
    history.replaceState(null, '', id === 'baja' ? location.pathname + location.search : '#' + id);
  }

  var ControlPlantas = L.Control.extend({
    options: { position: 'topright' },
    onAdd: function () {
      var cont = L.DomUtil.create('div', 'control-plantas');
      // De arriba abajo: planta alta sobre planta baja
      ['alta', 'baja'].forEach(function (id) {
        var btn = L.DomUtil.create('button', '', cont);
        btn.type = 'button';
        btn.textContent = PLANTAS[id].nombre;
        btn.addEventListener('click', function () { mostrarPlanta(id); });
        botonesPlanta[id] = btn;
      });
      L.DomEvent.disableClickPropagation(cont);
      return cont;
    }
  });
  map.addControl(new ControlPlantas());

  mostrarPlanta(location.hash === '#alta' ? 'alta' : 'baja');
  window.addEventListener('hashchange', function () {
    mostrarPlanta(location.hash === '#alta' ? 'alta' : 'baja');
  });

  // ── Panel lateral ──────────────────────────────────────────────────────────
  var panelWrapper = document.getElementById('panel-wrapper');

  function abrirPanel(sala) {
    // Desactivar sala anterior
    estiloSala(salaActiva, ESTILO_SALA);

    salaActiva = sala.id;
    estiloSala(salaActiva, ESTILO_SALA_ACTIVA);

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
    estiloSala(salaActiva, ESTILO_SALA);
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

  // ── Salas sin ubicar en el plano (sin bounds/polygon) ──────────────────────
  // Se listan aquí para que sigan siendo accesibles aunque no tengan zona
  // dibujada en el mapa. La lista se genera sola: cualquier sala futura sin
  // bounds/polygon aparece automáticamente, sin tocar este código.
  (function () {
    var salasSinUbicar = Object.values(SALAS).filter(function (sala) {
      return !sala.bounds && !sala.polygon;
    });

    var btn    = document.getElementById('btn-sin-ubicar');
    var lista  = document.getElementById('lista-sin-ubicar');
    var badge  = document.getElementById('contador-sin-ubicar');
    if (!btn || !lista || !badge || !salasSinUbicar.length) return;

    badge.textContent = salasSinUbicar.length;
    btn.classList.remove('oculto');

    salasSinUbicar.forEach(function (sala) {
      var link = document.createElement('a');
      link.href = 'sala.html?sala=' + sala.id;
      link.textContent = sala.nombre;
      lista.appendChild(link);
    });

    function cerrarLista() {
      lista.classList.add('oculto');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var abierta = !lista.classList.contains('oculto');
      if (abierta) {
        cerrarLista();
      } else {
        lista.classList.remove('oculto');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', function (e) {
      if (!lista.classList.contains('oculto') && !lista.contains(e.target) && e.target !== btn) {
        cerrarLista();
      }
    });
  }());

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
