// js/sala.js
// Lógica de la página de ficha individual de sala (sala.html)
// Requiere: js/data.js

(function () {

  // Leer el parámetro ?sala=<id> de la URL
  function obtenerIdSala() {
    var params = new URLSearchParams(window.location.search);
    return params.get('sala');
  }

  // SVG de placeholder para cuando no hay foto
  var PLACEHOLDER_SVG =
    '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="3" y="3" width="18" height="18" rx="1.5" ry="1.5"/>' +
    '<circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>' +
    '</svg>';

  function mostrarError(mensaje) {
    document.title = 'Sala no encontrada — Monasterio de San Antonio el Real';
    document.getElementById('sala-foto').style.display = 'none';
    document.getElementById('sala-foto-placeholder').style.display = 'flex';
    document.getElementById('sala-foto-placeholder').innerHTML =
      PLACEHOLDER_SVG + '<span>Sin imagen</span>';

    var contenido = document.getElementById('sala-contenido');
    contenido.innerHTML =
      '<div class="sala-error">' +
      '<h2>Sala no encontrada</h2>' +
      '<p>' + (mensaje || '') + '</p>' +
      '<a href="index.html" class="btn-volver" style="margin-top:24px">← Volver al plano</a>' +
      '</div>';

    // Ocultar la barra inferior si hay error
    var nav = document.querySelector('.sala-nav-inferior');
    if (nav) nav.style.display = 'none';
  }

  function cargarSala() {
    var salaId   = obtenerIdSala();
    var sala     = salaId ? SALAS[salaId] : null;

    if (!sala) {
      mostrarError(salaId
        ? 'No existe ninguna sala con el identificador <em>' + salaId + '</em>.'
        : 'No se ha indicado ninguna sala.');
      return;
    }

    // Título de pestaña
    document.title = sala.nombre + ' — Monasterio de San Antonio el Real';

    // Título visible
    document.getElementById('sala-titulo').textContent = sala.nombre;

    // Foto de cabecera
    var foto        = document.getElementById('sala-foto');
    var placeholder = document.getElementById('sala-foto-placeholder');
    foto.alt = sala.nombre;
    foto.src = sala.foto;
    foto.style.display = 'block';
    placeholder.style.display = 'none';

    foto.onerror = function () {
      this.style.display = 'none';
      placeholder.innerHTML = PLACEHOLDER_SVG + '<span>Sin imagen</span>';
      placeholder.style.display = 'flex';
    };

    // ── Lightbox + badge de fotos ───────────────────────────
    var todasLasFotos = [sala.foto].concat(sala.fotos || []).filter(Boolean);
    var lbActual  = 0;   // índice de la foto actualmente visible

    // ── Lightbox ───────────────────────────────────────────────
    var lightboxEl  = document.getElementById('sala-lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var btnCerrar   = document.getElementById('lightbox-cerrar');
    var btnPrevLb   = document.getElementById('lightbox-prev');
    var btnNextLb   = document.getElementById('lightbox-next');

    function abrirLightbox(idx) {
      lbActual = idx;
      lightboxImg.src = todasLasFotos[lbActual];
      lightboxImg.alt = sala.nombre;
      btnPrevLb.classList.toggle('oculto', lbActual === 0);
      btnNextLb.classList.toggle('oculto', lbActual === todasLasFotos.length - 1);
      lightboxEl.classList.add('abierto');
      document.body.style.overflow = 'hidden';
    }

    function cerrarLightbox() {
      lightboxEl.classList.remove('abierto');
      document.body.style.overflow = '';
    }

    btnCerrar.addEventListener('click', cerrarLightbox);
    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl) cerrarLightbox();
    });
    btnPrevLb.addEventListener('click', function () {
      if (lbActual > 0) abrirLightbox(lbActual - 1);
    });
    btnNextLb.addEventListener('click', function () {
      if (lbActual < todasLasFotos.length - 1) abrirLightbox(lbActual + 1);
    });
    document.addEventListener('keydown', function (e) {
      if (!lightboxEl.classList.contains('abierto')) return;
      if (e.key === 'Escape')      cerrarLightbox();
      if (e.key === 'ArrowLeft'  && lbActual > 0)                         abrirLightbox(lbActual - 1);
      if (e.key === 'ArrowRight' && lbActual < todasLasFotos.length - 1) abrirLightbox(lbActual + 1);
    });

    // Clic en la foto de cabecera → abrir lightbox
    foto.style.cursor = 'zoom-in';
    foto.addEventListener('click', function () { abrirLightbox(lbActual); });

    // Badge de contador (sólo cuando hay varias fotos)
    if (todasLasFotos.length > 1) {
      var badge = document.createElement('button');
      badge.className = 'foto-badge';
      badge.setAttribute('aria-label', 'Ver galería (' + todasLasFotos.length + ' fotos)');
      badge.innerHTML =
        '<svg width="13" height="11" viewBox="0 0 13 11" fill="none" ' +
        'stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">' +
        '<rect x="0.6" y="2.4" width="11.8" height="8" rx="1"/>' +
        '<circle cx="6.5" cy="6.5" r="2"/>' +
        '<path d="M4.6 2.4 L5.3 0.6 L7.7 0.6 L8.4 2.4" stroke-linejoin="round"/>' +
        '</svg>' +
        todasLasFotos.length + '&thinsp;fotos';
      document.querySelector('.sala-foto-wrap').appendChild(badge);
      badge.addEventListener('click', function (e) {
        e.stopPropagation();
        abrirLightbox(0);
      });
    }

    // Secciones de contenido
    var campos = [
      { clave: 'funcion',     label: 'Función histórica' },
      { clave: 'objetos',     label: 'Atrezzo'           },
      { clave: 'descripcion', label: 'Notas'             }
    ];

    var html = campos.map(function (c) {
      var valor = sala[c.clave];
      var clase, contenido;
      if (Array.isArray(valor) && valor.length) {
        clase     = 'sala-seccion-texto sala-objetos';
        contenido = valor.map(function (o) {
          return '<span class="objeto-tag">' + o + '</span>';
        }).join('');
      } else if (valor) {
        clase     = 'sala-seccion-texto';
        contenido = valor;
      } else {
        clase     = 'sala-seccion-texto vacio';
        contenido = 'Sin información';
      }
      return (
        '<div class="sala-seccion">' +
          '<div class="sala-seccion-label">' + c.label + '</div>' +
          '<div class="' + clase + '">' + contenido + '</div>' +
        '</div>'
      );
    }).join('');

    document.getElementById('sala-secciones').innerHTML = html;

    // Índice (ej. "3 / 29")
    var ids   = Object.keys(SALAS);
    var idx   = ids.indexOf(salaId);
    var total = ids.length;
    if (idx !== -1) {
      document.getElementById('sala-indice').textContent =
        (idx + 1) + '\u202f/\u202f' + total;
    }

    // Navegación anterior / siguiente
    var prevId = idx > 0           ? ids[idx - 1] : null;
    var nextId = idx < total - 1   ? ids[idx + 1] : null;

    var btnPrev = document.getElementById('sala-prev');
    var btnNext = document.getElementById('sala-next');

    if (prevId) {
      btnPrev.href        = 'sala.html?sala=' + prevId;
      btnPrev.textContent = '← ' + SALAS[prevId].nombre;
      btnPrev.style.display = '';
    } else {
      btnPrev.style.visibility = 'hidden';
    }

    if (nextId) {
      btnNext.href        = 'sala.html?sala=' + nextId;
      btnNext.textContent = SALAS[nextId].nombre + ' →';
      btnNext.style.display = '';
    } else {
      btnNext.style.visibility = 'hidden';
    }
  }

  document.addEventListener('DOMContentLoaded', cargarSala);

})();
