// js/data.js
// Datos de todas las estancias del Monasterio de San Antonio el Real
//
// ─── CÓMO EDITAR ───────────────────────────────────────────────────────────────
//
//  foto          → ruta a la imagen principal de la sala (se muestra en el
//                  panel del plano y en la cabecera de la ficha).
//                  Convenio: San_Antonio_el_Real_-_NombreSala_01.jpg
//                  Si tienes varias fotos de una sala, pon aquí la _01 y
//                  guarda las demás como _02, _03… en la misma carpeta.
//                  La extensión puede ser jpg, webp o png.
//
//  funcion       → uso histórico de la estancia (texto breve).
//
//  uso_dramatico → cómo funciona dramáticamente en el guion.
//
//  objeto        → objeto o prop asociado a la sala.
//
//  descripcion   → notas ampliadas. Acepta HTML básico (<em>, <br>, etc.).
//
//  bounds        → zona del plano. Si necesitas ajustar una zona,
//                  abre el mapa y pulsa la tecla D para activar el modo
//                  de coordenadas. Mueve el cursor para ver la posición
//                  y haz clic para copiarla al portapapeles.
//                  Formato: [[latSur, lngOeste], [latNorte, lngEste]]
//                  Conversión desde píxeles de imagen: lat = -y_px, lng = x_px
//
// ──────────────────────────────────────────────────────────────────────────────

const SALAS = {

  "panteon": {
    id: "panteon",
    nombre: "Panteón",
    foto: "img/salas/San_Antonio_el_Real_-_Panteon.jpg",
    bounds: [[-156, 607], [-32, 717]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "capilla-mayor": {
    id: "capilla-mayor",
    nombre: "Capilla Mayor",
    foto: "img/salas/San_Antonio_el_Real_-_Capilla_Mayor.jpg",
    bounds: [[-318, 445], [-188, 545]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "sacristia": {
    id: "sacristia",
    nombre: "Sacristía",
    foto: "img/salas/San_Antonio_el_Real_-_Sacristia.jpg",
    bounds: [[-298, 558], [-185, 640]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "sala-capitular": {
    id: "sala-capitular",
    nombre: "Sala Capitular",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_Capitular.jpg",
    bounds: [[-298, 649], [-185, 730]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "sala-de-los-frailes": {
    id: "sala-de-los-frailes",
    nombre: "Sala de los Frailes",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_de_los_Frailes.jpg",
    bounds: [[-298, 739], [-185, 822]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "almacen-de-paso": {
    id: "almacen-de-paso",
    nombre: "Almacén de Paso",
    foto: "img/salas/San_Antonio_el_Real_-_Almacen_de_Paso.jpg",
    bounds: [[-298, 836], [-185, 918]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "almacen": {
    id: "almacen",
    nombre: "Almacén",
    foto: "img/salas/San_Antonio_el_Real_-_Almacen.jpg",
    bounds: [[-242, 1005], [-152, 1160]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "hornos": {
    id: "hornos",
    nombre: "Hornos",
    foto: "img/salas/San_Antonio_el_Real_-_Hornos.jpg",
    bounds: [[-308, 1218], [-132, 1435]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "patio-de-la-vicaria": {
    id: "patio-de-la-vicaria",
    nombre: "Patio de la Vicaría",
    foto: "img/salas/San_Antonio_el_Real_-_Patio_de_la_Vicaria.jpg",
    bounds: [[-398, 30], [-200, 265]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "iglesia": {
    id: "iglesia",
    nombre: "Iglesia",
    foto: "img/salas/San_Antonio_el_Real_-_Iglesia_01.jpeg",
    bounds: [[-548, 366], [-308, 453]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "claustro-central": {
    id: "claustro-central",
    nombre: "Claustro Central",
    foto: "img/salas/San_Antonio_el_Real_-_Claustro_Central_01.png",
    bounds: [[-364, 643], [-516, 867]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "claustro-del-nogal": {
    id: "claustro-del-nogal",
    nombre: "Claustro del Nogal",
    foto: "img/salas/San_Antonio_el_Real_-_Claustro_del_Nogal.jpg",
    bounds: [[-512, 930], [-298, 1200]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "pozo-i": {
    id: "pozo-i",
    nombre: "Pozo I",
    foto: "img/salas/San_Antonio_el_Real_-_Pozo_I.jpg",
    bounds: [[-582, 932], [-502, 1128]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "lavaderos": {
    id: "lavaderos",
    nombre: "Lavaderos",
    foto: "img/salas/San_Antonio_el_Real_-_Lavaderos.jpg",
    bounds: [[-546, 1218], [-308, 1435]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "lonja-de-la-iglesia": {
    id: "lonja-de-la-iglesia",
    nombre: "Lonja de la Iglesia",
    foto: "img/salas/San_Antonio_el_Real_-_Lonja_de_la_Iglesia.jpg",
    bounds: [[-700, 73], [-555, 265]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "coro-mayor": {
    id: "coro-mayor",
    nombre: "Coro Mayor",
    foto: "img/salas/San_Antonio_el_Real_-_Coro_Mayor.jpg",
    bounds: [[-700, 380], [-558, 455]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "refectorio": {
    id: "refectorio",
    nombre: "Refectorio",
    foto: "img/salas/San_Antonio_el_Real_-_Refectorio_01.png",
    bounds: [[-569, 696], [-634, 863]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "cilla": {
    id: "cilla",
    nombre: "Cilla",
    foto: "img/salas/San_Antonio_el_Real_-_Cilla.jpg",
    bounds: [[-647, 834], [-558, 966]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "noviciado": {
    id: "noviciado",
    nombre: "Noviciado",
    foto: "img/salas/San_Antonio_el_Real_-_Noviciado.jpg",
    bounds: [[-716, 863], [-634, 1040]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "jardin-de-la-enfermeria": {
    id: "jardin-de-la-enfermeria",
    nombre: "Jardín de la Enfermería",
    foto: "img/salas/San_Antonio_el_Real_-_Jardin_de_la_Enfermeria.jpg",
    bounds: [[-762, 574], [-657, 764]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "cocina": {
    id: "cocina",
    nombre: "Cocina",
    foto: "img/salas/San_Antonio_el_Real_-_Cocina.jpg",
    bounds: [[-762, 774], [-657, 844]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "comedor": {
    id: "comedor",
    nombre: "Comedor",
    foto: "img/salas/San_Antonio_el_Real_-_Comedor.jpg",
    bounds: [[-762, 852], [-657, 922]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "acceso": {
    id: "acceso",
    nombre: "Acceso",
    foto: "img/salas/San_Antonio_el_Real_-_Acceso.jpg",
    bounds: [[-840, 442], [-730, 493]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "fachada-de-las-clarisas": {
    id: "fachada-de-las-clarisas",
    nombre: "Fachada de las Clarisas",
    foto: "img/salas/San_Antonio_el_Real_-_Fachada_de_las_Clarisas.jpg",
    bounds: [[-820, 330], [-720, 445]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "locutorios": {
    id: "locutorios",
    nombre: "Locutorios",
    foto: "img/salas/San_Antonio_el_Real_-_Locutorios.jpg",
    bounds: [[-912, 386], [-786, 442]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "zaguan": {
    id: "zaguan",
    nombre: "Zagúan",
    foto: "img/salas/San_Antonio_el_Real_-_Zaguan.jpg",
    bounds: [[-892, 574], [-786, 678]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "sala-cuadrada": {
    id: "sala-cuadrada",
    nombre: "Sala Cuadrada",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_Cuadrada.jpg",
    bounds: [[-892, 688], [-786, 788]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "establo": {
    id: "establo",
    nombre: "Establo",
    foto: "img/salas/San_Antonio_el_Real_-_Establo.jpg",
    bounds: [[-988, 470], [-902, 790]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "la-casa-del-principe": {
    id: "la-casa-del-principe",
    nombre: "La Casa del Príncipe",
    foto: "img/salas/San_Antonio_el_Real_-_La_Casa_del_Principe.jpg",
    bounds: [[-990, 924], [-755, 1114]],
    funcion: "",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  }

};
