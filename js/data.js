// js/data.js
// Datos de todas las estancias del Monasterio de San Antonio el Real
//
// ─── CÓMO EDITAR ───────────────────────────────────────────────────────────────
//
//  foto          → ruta a la imagen principal de la sala (se muestra en el
//                  panel del plano y en la cabecera de la ficha).
//                  Convenio: San_Antonio_el_Real_-_NombreSala_01.webp
//                  La extensión puede ser jpg, webp o png.
//
//  fotos         → (opcional) array con imágenes adicionales de la sala.
//                  Se muestran como miniaturas en la ficha; al hacer clic
//                  en una se convierte en la imagen principal.
//                  Ejemplo:
//                    fotos: [
//                      "img/salas/San_Antonio_el_Real_-_Claustro_Central_02.webp",
//                      "img/salas/San_Antonio_el_Real_-_Claustro_Central_03.webp"
//                    ]
//                  Si solo hay una foto, omite este campo.
//
//  funcion       → uso histórico de la estancia (texto breve).
//
//  uso_dramatico → cómo funciona dramáticamente en el guion.
//
//  objeto        → objeto o prop asociado a la sala.
//
//  descripcion   → notas ampliadas. Acepta HTML básico (<em>, <br>, etc.).
//
//  bounds        → zona del plano para salas RECTANGULARES (alineadas con los ejes).
//                  Pulsa la tecla D en el mapa para activar el modo de coordenadas:
//                  mueve el cursor para ver la posición y haz clic para copiarla.
//                  Formato: [[latSur, lngOeste], [latNorte, lngEste]]
//                  Conversión desde píxeles de imagen: lat = -y_px, lng = x_px
//
//  polygon       → zona del plano para salas NO RECTANGULARES (oblicuas, rombos,
//                  trapecios, etc.). Sustituye a bounds cuando la sala no es
//                  un rectángulo alineado.
//                  Formato: array de N vértices en orden (sentido horario o antihorario):
//                    [[lat1,lng1], [lat2,lng2], [lat3,lng3], [lat4,lng4], ...]
//                  Usa el modo D para obtener las coordenadas de cada esquina.
//                  Ejemplo de rombo/paralelogramo:
//                    polygon: [[-100,200], [-80,350], [-140,350], [-160,200]]
//
// ──────────────────────────────────────────────────────────────────────────────

const SALAS = {
/*
  "panteon": {
    id: "panteon",
    nombre: "Panteón",
    foto: "img/salas/San_Antonio_el_Real_-_Panteon.jpg",
    bounds: [[-156, 607], [-32, 717]],
    funcion: "Espacio funerario y memorial, vinculado a la conservación de restos, linajes y memoria religiosa.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "capilla-mayor": {
    id: "capilla-mayor",
    nombre: "Capilla Mayor",
    foto: "img/salas/San_Antonio_el_Real_-_Capilla_Mayor.jpg",
    bounds: [[-318, 445], [-188, 545]],
    funcion: "Lugar principal de culto, celebración litúrgica y concentración visual del poder espiritual.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "sacristia": {
    id: "sacristia",
    nombre: "Sacristía",
    foto: "img/salas/San_Antonio_el_Real_-_Sacristia.jpg",
    bounds: [[-298, 558], [-185, 640]],
    funcion: "Sala de preparación y custodia de ornamentos, vasos sagrados y objetos litúrgicos.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "sala-capitular": {
    id: "sala-capitular",
    nombre: "Sala Capitular",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_Capitular.jpg",
    bounds: [[-298, 649], [-185, 730]],
    funcion: "Espacio de reunión comunitaria, lectura de la regla, gobierno interno y corrección de faltas.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "sala-de-los-frailes": {
    id: "sala-de-los-frailes",
    nombre: "Sala de los Frailes",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_de_los_Frailes.jpg",
    bounds: [[-298, 739], [-185, 822]],
    funcion: "Estancia vinculada a la presencia masculina autorizada, asistencia religiosa o usos conventuales externos.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "almacen-de-paso": {
    id: "almacen-de-paso",
    nombre: "Almacén de Paso",
    foto: "img/salas/San_Antonio_el_Real_-_Almacen_de_Paso.jpg",
    bounds: [[-298, 836], [-185, 918]],
    funcion: "Zona auxiliar de tránsito y depósito temporal de objetos, materiales o provisiones.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "almacen": {
    id: "almacen",
    nombre: "Almacén",
    foto: "img/salas/San_Antonio_el_Real_-_Almacen.jpg",
    bounds: [[-242, 1005], [-152, 1160]],
    funcion: "Espacio de guarda de bienes, herramientas, enseres y materiales de uso cotidiano.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "hornos": {
    id: "hornos",
    nombre: "Hornos",
    foto: "img/salas/San_Antonio_el_Real_-_Hornos.jpg",
    bounds: [[-308, 1218], [-132, 1435]],
    funcion: "Zona de cocción, panificación y preparación de alimentos mediante fuego.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "patio-de-la-vicaria": {
    id: "patio-de-la-vicaria",
    nombre: "Patio de la Vicaría",
    foto: "img/salas/San_Antonio_el_Real_-_Patio_de_la_Vicaria.jpg",
    bounds: [[-398, 30], [-200, 265]],
    funcion: "Patio asociado a dependencias de gestión, tránsito y relación con ámbitos administrativos o eclesiásticos.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },
*/
  "iglesia": {
    id: "iglesia",
    nombre: "Iglesia",
    foto: "img/salas/San_Antonio_el_Real_-_Iglesia_01.webp",
    bounds: [[-317, 500], [-553, 570]],
    funcion: "Nave de culto, oración comunitaria y separación ritual entre clausura y mundo exterior.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "claustro-central": {
    id: "claustro-central",
    nombre: "Claustro Central",
    foto: "img/salas/San_Antonio_el_Real_-_Claustro_Central_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Claustro_Central_02.webp",
      "img/salas/San_Antonio_el_Real_-_Claustro_Central_03.webp"
    ],
    bounds: [[-354, 634], [-516, 867]],
    funcion: "Centro de circulación interior, recogimiento y ordenamiento cotidiano de la comunidad.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "claustro-del-nogal": {
    id: "claustro-del-nogal",
    nombre: "Claustro del Nogal",
    foto: "img/salas/San_Antonio_el_Real_-_Claustro_del_Nogal_01.webp",
    bounds: [[-252, 1011], [-525, 1276]],
    funcion: "Patio interior ajardinado, lugar de paso, trabajo ligero, espera y respiración dentro de la clausura.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },
/*
  "pozo-i": {
    id: "pozo-i",
    nombre: "Pozo I",
    foto: "img/salas/San_Antonio_el_Real_-_Pozo_I.jpg",
    bounds: [[-582, 932], [-502, 1128]],
    funcion: "Punto de abastecimiento de agua para labores domésticas, cocina, limpieza y cuidado.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "lavaderos": {
    id: "lavaderos",
    nombre: "Lavaderos",
    foto: "img/salas/San_Antonio_el_Real_-_Lavaderos.jpg",
    bounds: [[-546, 1218], [-308, 1435]],
    funcion: "Zona de lavado de ropa, paños y útiles textiles de la vida conventual.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "lonja-de-la-iglesia": {
    id: "lonja-de-la-iglesia",
    nombre: "Lonja de la Iglesia",
    foto: "img/salas/San_Antonio_el_Real_-_Lonja_de_la_Iglesia.jpg",
    bounds: [[-700, 73], [-555, 265]],
    funcion: "Espacio previo o exterior vinculado al acceso, espera y relación con la iglesia.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },
*/
  "coro-mayor": {
    id: "coro-mayor",
    nombre: "Coro Mayor",
    foto: "img/salas/San_Antonio_el_Real_-_Coro_Mayor_01.webp",
    bounds: [[-566, 494], [-697, 579]],
    funcion: "Lugar reservado para el rezo coral, los oficios cantados y la presencia comunitaria ante la liturgia.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "refectorio": {
    id: "refectorio",
    nombre: "Refectorio",
    foto: "img/salas/San_Antonio_el_Real_-_Refectorio_01.webp",
    bounds: [[-569, 696], [-634, 863]],
    funcion: "Comedor comunitario donde la comida se ordena como ritual de silencio, lectura y jerarquía.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },
/*
  "cilla": {
    id: "cilla",
    nombre: "Cilla",
    foto: "img/salas/San_Antonio_el_Real_-_Cilla.jpg",
    bounds: [[-647, 834], [-558, 966]],
    funcion: "Despensa o almacén de grano, alimentos y provisiones esenciales de la comunidad.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "noviciado": {
    id: "noviciado",
    nombre: "Noviciado",
    foto: "img/salas/San_Antonio_el_Real_-_Noviciado.jpg",
    bounds: [[-716, 863], [-634, 1040]],
    funcion: "Área de formación, vigilancia y aprendizaje de las normas para las mujeres que ingresan en la comunidad.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "jardin-de-la-enfermeria": {
    id: "jardin-de-la-enfermeria",
    nombre: "Jardín de la Enfermería",
    foto: "img/salas/San_Antonio_el_Real_-_Jardin_de_la_Enfermeria.jpg",
    bounds: [[-762, 574], [-657, 764]],
    funcion: "Patio asociado al cuidado, la convalecencia y el uso de plantas o remedios.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },
*/
  "cocina": {
    id: "cocina",
    nombre: "Cocina",
    foto: "img/salas/San_Antonio_el_Real_-_Cocina.jpg",
    bounds: [[-762, 774], [-657, 844]],
    funcion: "Lugar de preparación de alimentos, reparto de raciones y trabajo doméstico.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },
/*
  "comedor": {
    id: "comedor",
    nombre: "Comedor",
    foto: "img/salas/San_Antonio_el_Real_-_Comedor.jpg",
    bounds: [[-762, 852], [-657, 922]],
    funcion: "Estancia auxiliar para comidas, servicio o usos domésticos ligados a la alimentación.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "acceso": {
    id: "acceso",
    nombre: "Acceso",
    foto: "img/salas/San_Antonio_el_Real_-_Acceso.jpg",
    bounds: [[-840, 442], [-730, 493]],
    funcion: "Punto de entrada controlada y transición entre el exterior y las zonas interiores.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "fachada-de-las-clarisas": {
    id: "fachada-de-las-clarisas",
    nombre: "Fachada de las Clarisas",
    foto: "img/salas/San_Antonio_el_Real_-_Fachada_de_las_Clarisas.jpg",
    bounds: [[-820, 330], [-720, 445]],
    funcion: "Frente exterior de la clausura, límite visible entre la comunidad y el mundo.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },
*/
  "locutorios": {
    id: "locutorios",
    nombre: "Locutorios",
    foto: "img/salas/San_Antonio_el_Real_-_Locutorios_01.webp",
    polygon: [[-863, 540], [-868, 572], [-1053, 531], [-1045, 497]],
    funcion: "Espacio de comunicación vigilada a través de rejas, destinado a visitas, mensajes y asuntos externos.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },
/*
  "zaguan": {
    id: "zaguan",
    nombre: "Zagúan",
    foto: "img/salas/San_Antonio_el_Real_-_Zaguan.jpg",
    bounds: [[-892, 574], [-786, 678]],
    funcion: "Vestíbulo de entrada, espera y distribución hacia otras dependencias.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "sala-cuadrada": {
    id: "sala-cuadrada",
    nombre: "Sala Cuadrada",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_Cuadrada.jpg",
    bounds: [[-892, 688], [-786, 788]],
    funcion: "Sala polivalente para reunión, recepción o uso doméstico según las necesidades del convento.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "establo": {
    id: "establo",
    nombre: "Establo",
    foto: "img/salas/San_Antonio_el_Real_-_Establo.jpg",
    bounds: [[-988, 470], [-902, 790]],
    funcion: "Dependencia de servicio para animales, aperos y trabajos ligados al abastecimiento.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  },

  "la-casa-del-principe": {
    id: "la-casa-del-principe",
    nombre: "La Casa del Príncipe",
    foto: "img/salas/San_Antonio_el_Real_-_La_Casa_del_Principe.jpg",
    bounds: [[-990, 924], [-755, 1114]],
    funcion: "Área residencial o representativa asociada al ámbito noble y externo al uso estrictamente conventual.",
    uso_dramatico: "",
    objeto: "",
    descripcion: ""
  }
*/
};