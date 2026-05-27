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
//  objetos       → objetos o props verosímiles asociados a la sala.
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
    objetos: ["lápidas", "paños negros", "velas", "candelabros bajos", "crucifijo", "relicario", "libro de difuntas", "flores secas"],
    descripcion: ""
  },

  "capilla-mayor": {
    id: "capilla-mayor",
    nombre: "Capilla Mayor",
    foto: "img/salas/San_Antonio_el_Real_-_Capilla_Mayor.jpg",
    bounds: [[-318, 445], [-188, 545]],
    funcion: "Lugar principal de culto, celebración litúrgica y concentración visual del poder espiritual.",
    objetos: ["altar", "mantel de altar", "crucifijo", "candeleros", "sagrario", "atril", "misal", "vinajeras", "cáliz", "patena", "floreros"],
    descripcion: ""
  },

  "sacristia": {
    id: "sacristia",
    nombre: "Sacristía",
    foto: "img/salas/San_Antonio_el_Real_-_Sacristia.jpg",
    bounds: [[-298, 558], [-185, 640]],
    funcion: "Sala de preparación y custodia de ornamentos, vasos sagrados y objetos litúrgicos.",
    objetos: ["casullas", "albas", "amitos", "cíngulos", "estolas", "corporales", "purificadores", "cáliz", "patena", "copón", "vinajeras", "lavabo", "armario de ornamentos", "arca con llave"],
    descripcion: ""
  },

  "sala-capitular": {
    id: "sala-capitular",
    nombre: "Sala Capitular",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_Capitular.jpg",
    bounds: [[-298, 649], [-185, 730]],
    funcion: "Espacio de reunión comunitaria, lectura de la regla, gobierno interno y corrección de faltas.",
    objetos: ["bancos corridos", "sitial de la abadesa", "mesa pequeña", "libro de regla", "libro de actas", "campanilla", "crucifijo mural", "urna de votación", "llaves"],
    descripcion: ""
  },

  "sala-de-los-frailes": {
    id: "sala-de-los-frailes",
    nombre: "Sala de los Frailes",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_de_los_Frailes.jpg",
    bounds: [[-298, 739], [-185, 822]],
    funcion: "Estancia vinculada a la presencia masculina autorizada, asistencia religiosa o usos conventuales externos.",
    objetos: ["banco de espera", "mesa sobria", "sillas", "crucifijo", "aguamanil", "jarra", "cuenco", "libros devotos", "capa o manteo colgado"],
    descripcion: ""
  },

  "almacen-de-paso": {
    id: "almacen-de-paso",
    nombre: "Almacén de Paso",
    foto: "img/salas/San_Antonio_el_Real_-_Almacen_de_Paso.jpg",
    bounds: [[-298, 836], [-185, 918]],
    funcion: "Zona auxiliar de tránsito y depósito temporal de objetos, materiales o provisiones.",
    objetos: ["cestas", "sacos", "cuerdas", "candiles", "escobas", "cubos", "tablas", "herramientas pequeñas", "paños doblados", "cajas de madera"],
    descripcion: ""
  },

  "almacen": {
    id: "almacen",
    nombre: "Almacén",
    foto: "img/salas/San_Antonio_el_Real_-_Almacen.jpg",
    bounds: [[-242, 1005], [-152, 1160]],
    funcion: "Espacio de guarda de bienes, herramientas, enseres y materiales de uso cotidiano.",
    objetos: ["arcones", "estanterías", "sacos de grano", "tinajas", "velas", "aceite", "jabón", "lino", "lana", "herramientas", "cestos", "llaves"],
    descripcion: ""
  },

  "hornos": {
    id: "hornos",
    nombre: "Hornos",
    foto: "img/salas/San_Antonio_el_Real_-_Hornos.jpg",
    bounds: [[-308, 1218], [-132, 1435]],
    funcion: "Zona de cocción, panificación y preparación de alimentos mediante fuego.",
    objetos: ["horno de leña", "palas de pan", "artesa", "cedazos", "sacos de harina", "leña", "brasero", "tenazas", "cántaros", "paños de cocina", "bandejas de barro"],
    descripcion: ""
  },

  "patio-de-la-vicaria": {
    id: "patio-de-la-vicaria",
    nombre: "Patio de la Vicaría",
    foto: "img/salas/San_Antonio_el_Real_-_Patio_de_la_Vicaria.jpg",
    bounds: [[-398, 30], [-200, 265]],
    funcion: "Patio asociado a dependencias de gestión, tránsito y relación con ámbitos administrativos o eclesiásticos.",
    objetos: ["banco de piedra", "cántaro", "farol", "macetas", "escoba de palma", "cubo", "llavero", "papeles doblados", "sello", "cordón de clausura"],
    descripcion: ""
  },
*/
  "iglesia": {
    id: "iglesia",
    nombre: "Iglesia",
    foto: "img/salas/San_Antonio_el_Real_-_Iglesia_01.webp",
    bounds: [[-317, 500], [-553, 570]],
    funcion: "Nave de culto, oración comunitaria y separación ritual entre clausura y mundo exterior.",
    objetos: ["bancos", "reclinatorios", "velas", "candeleros", "retablos", "atril", "misal", "lámpara votiva", "confesonario", "agua bendita", "campanilla", "flores"],
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
    objetos: ["fuente", "cubo de agua", "cántaros", "macetas", "escoba", "farol", "rosario", "banco de piedra", "ramas podadas", "llaves"],
    descripcion: ""
  },

  "claustro-del-nogal": {
    id: "claustro-del-nogal",
    nombre: "Claustro del Nogal",
    foto: "img/salas/San_Antonio_el_Real_-_Claustro_del_Nogal_01.webp",
    bounds: [[-252, 1011], [-525, 1276]],
    funcion: "Patio interior ajardinado, lugar de paso, trabajo ligero, espera y respiración dentro de la clausura.",
    objetos: ["nogal", "banco", "cántaro", "cubo", "azada pequeña", "tijeras de podar", "cesta de mimbre", "hojas secas", "hierbas", "farol"],
    descripcion: ""
  },
/*
  "pozo-i": {
    id: "pozo-i",
    nombre: "Pozo I",
    foto: "img/salas/San_Antonio_el_Real_-_Pozo_I.jpg",
    bounds: [[-582, 932], [-502, 1128]],
    funcion: "Punto de abastecimiento de agua para labores domésticas, cocina, limpieza y cuidado.",
    objetos: ["pozo", "cubo", "soga", "cántaros", "jarra", "palangana", "trapo", "piedra húmeda", "polea", "banco bajo"],
    descripcion: ""
  },

  "lavaderos": {
    id: "lavaderos",
    nombre: "Lavaderos",
    foto: "img/salas/San_Antonio_el_Real_-_Lavaderos.jpg",
    bounds: [[-546, 1218], [-308, 1435]],
    funcion: "Zona de lavado de ropa, paños y útiles textiles de la vida conventual.",
    objetos: ["pilas de lavar", "jabón", "ceniza", "tabla de lavar", "cubos", "cestos de ropa", "paños", "sábanas", "tendederos", "pinzas de madera", "delantales"],
    descripcion: ""
  },

  "lonja-de-la-iglesia": {
    id: "lonja-de-la-iglesia",
    nombre: "Lonja de la Iglesia",
    foto: "img/salas/San_Antonio_el_Real_-_Lonja_de_la_Iglesia.jpg",
    bounds: [[-700, 73], [-555, 265]],
    funcion: "Espacio previo o exterior vinculado al acceso, espera y relación con la iglesia.",
    objetos: ["banco exterior", "farol", "pila de agua bendita", "puerta claveteada", "llamador", "capa", "cesto", "bastón", "paquete envuelto"],
    descripcion: ""
  },
*/
  "coro-mayor": {
    id: "coro-mayor",
    nombre: "Coro Mayor",
    foto: "img/salas/San_Antonio_el_Real_-_Coro_Mayor_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Coro_Mayor_02.webp",
    ],
    bounds: [[-566, 494], [-697, 579]],
    funcion: "Lugar reservado para el rezo coral, los oficios cantados y la presencia comunitaria ante la liturgia.",
    objetos: ["sillería de coro", "facistol", "libros de coro", "antifonario", "salterio", "misal", "puntero", "vela", "campanilla", "órgano", "reclinatorios", "atril"],
    descripcion: ""
  },

  "refectorio": {
    id: "refectorio",
    nombre: "Refectorio",
    foto: "img/salas/San_Antonio_el_Real_-_Refectorio_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Refectorio_02.webp",
      "img/salas/San_Antonio_el_Real_-_Refectorio_03.webp"
    ],
    bounds: [[-569, 696], [-634, 863]],
    funcion: "Comedor comunitario donde la comida se ordena como ritual de silencio, lectura y jerarquía.",
    objetos: ["mesas largas", "bancos", "escudillas", "cuencos", "jarras", "pan", "cuchillos romos", "servilletas de lino", "salero", "atril de lectura", "campanilla", "armario de vajilla"],
    descripcion: ""
  },
/*
  "cilla": {
    id: "cilla",
    nombre: "Cilla",
    foto: "img/salas/San_Antonio_el_Real_-_Cilla.jpg",
    bounds: [[-647, 834], [-558, 966]],
    funcion: "Despensa o almacén de grano, alimentos y provisiones esenciales de la comunidad.",
    objetos: ["sacos de trigo", "sacos de cebada", "tinajas de aceite", "orzas", "quesos", "legumbres secas", "balanza", "pesas", "libro de cuentas", "llaves", "cucharón", "arca"],
    descripcion: ""
  },

  "noviciado": {
    id: "noviciado",
    nombre: "Noviciado",
    foto: "img/salas/San_Antonio_el_Real_-_Noviciado.jpg",
    bounds: [[-716, 863], [-634, 1040]],
    funcion: "Área de formación, vigilancia y aprendizaje de las normas para las mujeres que ingresan en la comunidad.",
    objetos: ["bancos", "mesas pequeñas", "libro de regla", "catecismo", "rosarios", "velo de novicia", "costurero", "aguja", "hilo", "tablillas de escritura", "vela", "crucifijo"],
    descripcion: ""
  },

  "jardin-de-la-enfermeria": {
    id: "jardin-de-la-enfermeria",
    nombre: "Jardín de la Enfermería",
    foto: "img/salas/San_Antonio_el_Real_-_Jardin_de_la_Enfermeria.jpg",
    bounds: [[-762, 574], [-657, 764]],
    funcion: "Patio asociado al cuidado, la convalecencia y el uso de plantas o remedios.",
    objetos: ["hierbas medicinales", "macetas", "mortero", "cesto", "paños", "jarra de agua", "banco", "tijeras", "vendas", "cuenco", "ramilletes secos"],
    descripcion: ""
  },
*/
  "cocina": {
    id: "cocina",
    nombre: "Cocina",
    foto: "img/salas/San_Antonio_el_Real_-_Cocina.jpg",
    bounds: [[-708, 872], [-799, 904]],
    funcion: "Lugar de preparación de alimentos, reparto de raciones y trabajo doméstico.",
    objetos: ["fogón", "ollas de barro", "calderos de cobre", "sartenes", "cucharones", "cuchillos", "mortero", "tabla de cortar", "leña", "cántaros", "tinajas", "paños", "delantales"],
    descripcion: ""
  },
/*
  "comedor": {
    id: "comedor",
    nombre: "Comedor",
    foto: "img/salas/San_Antonio_el_Real_-_Comedor.jpg",
    bounds: [[-762, 852], [-657, 922]],
    funcion: "Estancia auxiliar para comidas, servicio o usos domésticos ligados a la alimentación.",
    objetos: ["mesa auxiliar", "bancos", "jarras", "escudillas", "bandejas", "panera", "paños", "jarro de agua", "cesta", "armario bajo"],
    descripcion: ""
  },

  "acceso": {
    id: "acceso",
    nombre: "Acceso",
    foto: "img/salas/San_Antonio_el_Real_-_Acceso.jpg",
    bounds: [[-840, 442], [-730, 493]],
    funcion: "Punto de entrada controlada y transición entre el exterior y las zonas interiores.",
    objetos: ["portón", "llaves", "cerrojo", "farol", "campanilla", "banco de espera", "reja", "torno", "paquete envuelto", "libro de entradas"],
    descripcion: ""
  },

  "fachada-de-las-clarisas": {
    id: "fachada-de-las-clarisas",
    nombre: "Fachada de las Clarisas",
    foto: "img/salas/San_Antonio_el_Real_-_Fachada_de_las_Clarisas.jpg",
    bounds: [[-820, 330], [-720, 445]],
    funcion: "Frente exterior de la clausura, límite visible entre la comunidad y el mundo.",
    objetos: ["puerta exterior", "llamador", "reja", "torno", "placa", "cruz", "farol", "banco", "paquetes", "cesta de limosna"],
    descripcion: ""
  },
*/
  "locutorios": {
    id: "locutorios",
    nombre: "Locutorios",
    foto: "img/salas/San_Antonio_el_Real_-_Locutorios_01.webp",
    polygon: [[-863, 540], [-868, 572], [-1053, 531], [-1045, 497]],
    funcion: "Espacio de comunicación vigilada a través de rejas, destinado a visitas, mensajes y asuntos externos.",
    objetos: ["rejas dobles", "sillas", "bancos", "crucifijo", "mesa estrecha", "cortina", "campanilla", "torno pequeño", "carta", "rosario", "pañuelo", "cesta"],
    descripcion: ""
  },

  "zaguan": {
    id: "zaguan",
    nombre: "Zagúan",
    foto: "img/salas/San_Antonio_el_Real_-_Zaguan_01.webp",
    polygon: [[-893, 644], [-920, 756], [-988, 741], [-961, 629]],
    funcion: "Vestíbulo de entrada, espera y distribución hacia otras dependencias.",
    objetos: ["banco", "farol", "perchero", "llaves", "escoba", "cubo", "alfombra de esparto", "puerta claveteada", "cesta", "paquetes"],
    descripcion: ""
  },

  "sala-cuadrada": {
    id: "sala-cuadrada",
    nombre: "Sala Cuadrada",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_Cuadrada_01.webp",
    polygon: [[-922, 764], [-941, 830], [-1006, 814], [-990, 748]],
    funcion: "Sala polivalente para reunión, recepción o uso doméstico según las necesidades del convento.",
    objetos: ["mesa", "sillas", "bancos", "arca", "candil", "caja de documentos", "paños", "cesto", "atril pequeño", "jarra de agua"],
    descripcion: ""
  },

  "establo": {
    id: "establo",
    nombre: "Establo",
    polygon: [[-971, 627], [-1018, 810], [-1061, 801], [-1014, 617]],
    funcion: "Dependencia de servicio para animales, aperos y trabajos ligados al abastecimiento.",
    objetos: ["pesebre", "paja", "heno", "cubo", "cuerda", "arneses", "silla de montar", "escoba", "horca", "azada", "sacos", "farol"],
    descripcion: ""
  },
/*
  "la-casa-del-principe": {
    id: "la-casa-del-principe",
    nombre: "La Casa del Príncipe",
    foto: "img/salas/San_Antonio_el_Real_-_La_Casa_del_Principe.jpg",
    bounds: [[-990, 924], [-755, 1114]],
    funcion: "Área residencial o representativa asociada al ámbito noble y externo al uso estrictamente conventual.",
    objetos: ["mesa de representación", "sillas de brazos", "arca", "tapiz", "brasero", "candeleros", "escribanía", "jarra", "aguamanil", "cortinas", "cofre"],
    descripcion: ""
  }
*/
};