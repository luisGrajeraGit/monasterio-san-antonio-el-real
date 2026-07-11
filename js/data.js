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

  "panteon": {
    id: "panteon",
    nombre: "Panteón",
    foto: "img/salas/San_Antonio_el_Real_-_Panteon_01.webp",
    bounds: [[-58, 698], [-166, 766]],
    funcion: "Espacio funerario y memorial, vinculado a la conservación de restos, linajes y memoria religiosa. Tiene unas mesas de resrtauración. Suelo en bruto, sin rematar",
    objetos: ["lápidas", "paños negros", "velas", "candelabros bajos", "crucifijo", "relicario", "libro de difuntas", "flores secas"],
    descripcion: "",
    rodajeSecciones: [
      {
        titulo: "Bloque de rodaje",
        meta: "Día 1 · 12:30-14:30 · Vida · P1",
        abierta: true,
        contenido: "<ul><li>Escena: Danza de la novicia.</li><li>Personajes: NOV-B y 1-2 monjas de comunidad.</li><li>Bloque protegido para aprovechar el corte de luz en el suelo.</li></ul>"
      },
      {
        titulo: "Puesta en escena",
        contenido: "<ul><li>Plano secuencia con cámara fija: restauración, salida de acompañantes, baile y regreso rápido a la mesa.</li><li>Componer primero el plano general y colocar la mesa después.</li><li>Ensayar sin patear suelo; la primera toma buena es la del suelo más limpio.</li></ul>"
      },
      {
        titulo: "Luz y cámara",
        contenido: "<ul><li>Fuente principal: haz real de ventana sur, sin key artificial directa.</li><li>Opcionales: haze con permiso, Selens blanco para ojos, CX100 solo de rescate.</li><li>Óptica recomendada: una focal para todo el plano (Tokina 16-28 o Loxia 35).</li></ul>"
      }
    ]
  },
/*
  "capilla-mayor": {
    id: "capilla-mayor",
    nombre: "Capilla Mayor",
    foto: "img/salas/San_Antonio_el_Real_-_Capilla_Mayor.jpg",
    bounds: [[-318, 445], [-188, 545]],
    funcion: "Lugar principal de culto, celebración litúrgica y concentración visual del poder espiritual.",
    objetos: ["altar", "mantel de altar", "crucifijo", "candeleros", "sagrario", "atril", "misal", "vinajeras", "cáliz", "patena", "floreros"],
    descripcion: ""
  },
*/
  "sacristia": {
    id: "sacristia",
    nombre: "Sacristía",
    foto: "img/salas/San_Antonio_el_Real_-_Sacristia_01.webp",
    bounds: [[-220, 585], [-287, 673]],
    funcion: "Sala de preparación y custodia de ornamentos, vasos sagrados y objetos litúrgicos.",
    objetos: ["casullas", "albas", "amitos", "cíngulos", "estolas", "corporales", "purificadores", "cáliz", "patena", "copón", "vinajeras", "lavabo", "armario de ornamentos", "arca con llave"],
    descripcion: ""
  },

  "sala-capitular": {
    id: "sala-capitular",
    nombre: "Sala Capitular",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_Capitular_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Sala_Capitular_02.webp",
    ],
    bounds: [[-222, 682], [-306, 764]],
    funcion: "Espacio de reunión comunitaria, lectura de la regla, gobierno interno y corrección de faltas.",
    objetos: ["bancos corridos", "sitial de la abadesa", "mesa pequeña", "libro de regla", "libro de actas", "campanilla", "crucifijo mural", "urna de votación", "llaves"],
    descripcion: "",
    rodajeSecciones: [
      {
        titulo: "Bloque de rodaje",
        meta: "Día 1 · 09:20-10:50 · Muerte · P1",
        abierta: true,
        contenido: "<ul><li>Escena: Velatorio con imposición de manos de toda la comunidad.</li><li>Personajes: COM, ENFA, ABAD.</li><li>Bloque flexible de mañana para absorber pequeños retrasos.</li></ul>"
      },
      {
        titulo: "Cobertura",
        contenido: "<ul><li>Planos clave: PPP de la difunta con corona, PM de imposición y PG de velatorio.</li><li>Cámara lock x2 en planos de comunidad con cambio de vestuario.</li><li>Paneo al artesonado solo en pasada final si lo anterior es correcto.</li></ul>"
      },
      {
        titulo: "Luz y arte",
        contenido: "<ul><li>Luz base prestada del claustro con ventanas abiertas.</li><li>Prioridad al negativo para esculpir caras; fill muy tenue solo si falta nivel.</li><li>Patrimonio intocable: retablo, cuadros y crucifijo.</li></ul>"
      }
    ]
  },

  "sala-de-los-frailes": {
    id: "sala-de-los-frailes",
    nombre: "Sala de los Frailes",
    foto: "img/salas/San_Antonio_el_Real_-_Sala_de_los_Frailes_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Sala_de_los_Frailes_02.webp",
      "img/salas/San_Antonio_el_Real_-_Sala_de_los_Frailes_03.webp"
    ],
    bounds: [[-224, 786], [-304, 897]],
    funcion: "Estancia vinculada a la presencia masculina autorizada, asistencia religiosa o usos conventuales externos.",
    objetos: ["banco de espera", "mesa sobria", "sillas", "crucifijo", "aguamanil", "jarra", "cuenco", "libros devotos", "capa o manteo colgado"],
    descripcion: "",
    rodajeSecciones: [
      {
        titulo: "Bloque de rodaje",
        meta: "Día 2 · 08:45-10:30 · Umbral · P1",
        abierta: true,
        contenido: "<ul><li>Escena: La abadesa escribe con la vicaria.</li><li>Acción: apertura de cajón, inicio de escritura, intento de cotilleo y reprimenda.</li><li>La escena depende de primera luz de mañana.</li></ul>"
      },
      {
        titulo: "Luz y cámara",
        contenido: "<ul><li>Ventana este como key natural; negativo a cámara para separar a la vicaria.</li><li>Ópticas recomendadas: Loxia 35/50 para rostro de abadesa, 24-105 para cobertura rápida.</li><li>Mantener vitrinas fuera de cuadro y apagadas.</li></ul>"
      },
      {
        titulo: "Atrezo crítico",
        contenido: "<ul><li>Papel de carta pendiente de cierre; preparar hojas de práctica y raccord.</li><li>Pluma y tintero confirmados; rosario de VIC en plano.</li><li>Confirmar cajón practicable de la mesa en técnica.</li></ul>"
      }
    ]
  },

  "almacen-de-paso": {
    id: "almacen-de-paso",
    nombre: "Almacén de Paso",
    foto: "img/salas/San_Antonio_el_Real_-_Almacen_de_Paso_01.webp",
    bounds: [[-222, 973], [-308, 913]],
    funcion: "Zona auxiliar de tránsito y depósito temporal de objetos, materiales o provisiones.",
    objetos: ["cestas", "sacos", "cuerdas", "candiles", "escobas", "cubos", "tablas", "herramientas pequeñas", "paños doblados", "cajas de madera"],
    descripcion: ""
  },
/*
  "almacen": {
    id: "almacen",
    nombre: "Almacén",
    foto: "img/salas/San_Antonio_el_Real_-_Almacen_01.webp",
    bounds: [[-242, 1005], [-152, 1160]],
    funcion: "Espacio de guarda de bienes, herramientas, enseres y materiales de uso cotidiano.",
    objetos: ["arcones", "estanterías", "sacos de grano", "tinajas", "velas", "aceite", "jabón", "lino", "lana", "herramientas", "cestos", "llaves"],
    descripcion: ""
  },

  "hornos": {
    id: "hornos",
    nombre: "Hornos",
    foto: "img/salas/San_Antonio_el_Real_-_Hornos_01.webp",
    bounds: [[-308, 1218], [-132, 1435]],
    funcion: "Zona de cocción, panificación y preparación de alimentos mediante fuego.",
    objetos: ["horno de leña", "palas de pan", "artesa", "cedazos", "sacos de harina", "leña", "brasero", "tenazas", "cántaros", "paños de cocina", "bandejas de barro"],
    descripcion: ""
  },
*/
  "patio-de-la-vicaria": {
    id: "patio-de-la-vicaria",
    nombre: "Patio de la Vicaría",
    foto: "img/salas/San_Antonio_el_Real_-_Patio_de_la_Vicaria_01.webp",
    polygon: [[-236, 214], [-246, 406], [-370, 402], [-356, 206]],
    funcion: "Patio asociado a dependencias de gestión, tránsito y relación con ámbitos administrativos o eclesiásticos.",
    objetos: ["banco de piedra", "cántaro", "farol", "macetas", "escoba de palma", "cubo", "llavero", "papeles doblados", "sello", "cordón de clausura"],
    descripcion: ""
  },

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
      "img/salas/San_Antonio_el_Real_-_Claustro_Central_03.webp",
      "img/salas/San_Antonio_el_Real_-_Claustro_Central_04.webp"
    ],
    bounds: [[-354, 634], [-516, 867]],
    funcion: "Centro de circulación interior, recogimiento y ordenamiento cotidiano de la comunidad.",
    objetos: ["fuente", "cubo de agua", "cántaros", "macetas", "escoba", "farol", "rosario", "banco de piedra", "ramas podadas", "llaves"],
    descripcion: "",
    rodajeSecciones: [
      {
        titulo: "Bloque de rodaje",
        meta: "Día 2 · 12:30-13:30 · Estampas · P1",
        abierta: true,
        contenido: "<ul><li>Escena: Limpieza del cristal de la reliquia.</li><li>Personajes: NOV-L y dos monjas opcionales para el susto.</li><li>Trabajo de pasillo: priorizar recorrido limpio y ritmo de acción.</li></ul>"
      },
      {
        titulo: "Notas de escena",
        contenido: "<ul><li>Debe leerse como tramo de tránsito de claustro, no como escena de sala cerrada.</li><li>Planificar la coreografía con espacio para paso y contrapaso.</li><li>Evitar elementos modernos en ejes largos del corredor.</li></ul>"
      }
    ]
  },

  "claustro-del-nogal": {
    id: "claustro-del-nogal",
    nombre: "Claustro del Nogal",
    foto: "img/salas/San_Antonio_el_Real_-_Claustro_del_Nogal_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Claustro_del_Nogal_02.webp"
    ],
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
    descripcion: "",
    rodajeSecciones: [
      {
        titulo: "Bloque de rodaje",
        meta: "Día 1 · 18:00-21:15 · Vida · P1",
        abierta: true,
        contenido: "<ul><li>Escena: Comida en el refectorio con las 10 actrices.</li><li>Bloque clave de atardecer hasta ocaso.</li><li>No existe plano general real de mesa en U: se construye en montaje por setups.</li></ul>"
      },
      {
        titulo: "Estrategia de cobertura",
        contenido: "<ul><li>Mesa pequeña móvil: anclar raccord a la luz, no a la geografía.</li><li>Rodar por ejes y bloques: entrada/armarios, mesa, pan, sopa, bastón y miradas.</li><li>Cámara lock x2 en plano de entrada y paneo final solo si la pasada es buena.</li></ul>"
      },
      {
        titulo: "Luz y arte",
        contenido: "<ul><li>Fuente principal: haz rasante de tarde por ventanas oeste.</li><li>Negativo pesado obligatorio para controlar rebote de nave clara.</li><li>Atrezo crítico: menaje completo, pan, puchero, bastón de ABAD y mantel por cerrar.</li></ul>"
      }
    ]
  },

  "cilla": {
    id: "cilla",
    nombre: "Cilla",
    foto: "img/salas/San_Antonio_el_Real_-_Cilla_01.webp",
    bounds: [[-568, 918], [-640, 1007]],
    funcion: "Despensa o almacén de grano, alimentos y provisiones esenciales de la comunidad.",
    objetos: ["sacos de trigo", "sacos de cebada", "tinajas de aceite", "orzas", "quesos", "legumbres secas", "balanza", "pesas", "libro de cuentas", "llaves", "cucharón", "arca"],
    descripcion: ""
  },
/*
  "noviciado": {
    id: "noviciado",
    nombre: "Noviciado",
    foto: "img/salas/San_Antonio_el_Real_-_Noviciado.jpg",
    bounds: [[-716, 863], [-634, 1040]],
    funcion: "Área de formación, vigilancia y aprendizaje de las normas para las mujeres que ingresan en la comunidad.",
    objetos: ["bancos", "mesas pequeñas", "libro de regla", "catecismo", "rosarios", "velo de novicia", "costurero", "aguja", "hilo", "tablillas de escritura", "vela", "crucifijo"],
    descripcion: ""
  },
*/
  "jardin-de-la-enfermeria": {
    id: "jardin-de-la-enfermeria",
    nombre: "Jardín de la Enfermería",
    foto: "img/salas/San_Antonio_el_Real_-_Jardin_de_la_Enfermeria_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Jardin_de_la_Enfermeria_02.webp",
      "img/salas/San_Antonio_el_Real_-_Jardin_de_la_Enfermeria_03.webp"
    ],
    polygon: [[-852, 666], [-654, 668], [-652, 866], [-790, 860], [-792, 832], [-888, 802]],
    funcion: "Patio asociado al cuidado, la convalecencia y el uso de plantas o remedios.",
    objetos: ["hierbas medicinales", "macetas", "mortero", "cesto", "paños", "jarra de agua", "banco", "tijeras", "vendas", "cuenco", "ramilletes secos"],
    descripcion: "",
    rodajeSecciones: [
      {
        titulo: "Bloques de rodaje",
        meta: "Día 2 · 10:30-12:30",
        abierta: true,
        contenido: "<ul><li>Lavatorio de manos (P1): 9 monjas, NOV-B sirve agua y se lava la última.</li><li>Recogida del higo (P3, si hay tiempo): escena breve de recurso con 2 monjas.</li><li>Planificar continuidad de humedad en manos y utensilios.</li></ul>"
      },
      {
        titulo: "Puesta en escena",
        contenido: "<ul><li>Mantener lectura coral del ritual y jerarquía de turnos.</li><li>Reservar ventana final para plano de NOV-B cerrando el gesto.</li><li>Cuidar fondos para evitar elementos contemporáneos de jardín.</li></ul>"
      }
    ]
  },

  "cocina": {
    id: "cocina",
    nombre: "Cocina",
    foto: "img/salas/San_Antonio_el_Real_-_Cocina_01.webp",
    bounds: [[-708, 872], [-799, 904]],
    funcion: "Lugar de preparación de alimentos, reparto de raciones y trabajo doméstico.",
    objetos: ["fogón", "ollas de barro", "calderos de cobre", "sartenes", "cucharones", "cuchillos", "mortero", "tabla de cortar", "leña", "cántaros", "tinajas", "paños", "delantales"],
    descripcion: ""
  },

  "comedor": {
    id: "comedor",
    nombre: "Comedor",
    foto: "img/salas/San_Antonio_el_Real_-_Comedor_01.webp",
    bounds: [[-692, 919], [-792, 959]],
    funcion: "Estancia auxiliar para comidas, servicio o usos domésticos ligados a la alimentación.",
    objetos: ["mesa auxiliar", "bancos", "jarras", "escudillas", "bandejas", "panera", "paños", "jarro de agua", "cesta", "armario bajo"],
    descripcion: ""
  },
/*
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
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Locutorios_02.webp"
    ],
    polygon: [[-863, 540], [-868, 572], [-1053, 531], [-1045, 497]],
    funcion: "Espacio de comunicación vigilada a través de rejas, destinado a visitas, mensajes y asuntos externos.",
    objetos: ["rejas dobles", "sillas", "bancos", "crucifijo", "mesa estrecha", "cortina", "campanilla", "torno pequeño", "carta", "rosario", "pañuelo", "cesta"],
    descripcion: "",
    rodajeSecciones: [
      {
        titulo: "Bloque de rodaje",
        meta: "Día 1 · 15:15-17:30 · Umbral · P1",
        abierta: true,
        contenido: "<ul><li>Escena: Llegada de la postulante.</li><li>Personajes: POST, ABAD y TORN por confirmar.</li><li>Riesgo mayor de anacronismo por exterior visible a través de reja.</li></ul>"
      },
      {
        titulo: "Cobertura y óptica",
        contenido: "<ul><li>Planos a través de reja con 70-200 para compresión.</li><li>Primeros retratos del giro con 85 mm recomendado por espacio y foco.</li><li>Alternativa: barrotes como sombra proyectada sin reja delante de lente.</li></ul>"
      },
      {
        titulo: "Luz y atrezo",
        contenido: "<ul><li>CX100 como fuente dura para fabricar patrón de barrotes.</li><li>Clave de atrezo: llave de reja y maleta/baúl de la postulante pendientes de cierre.</li><li>Quemar exterior o excluirlo para evitar coches y aparcamiento.</li></ul>"
      }
    ]
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
    descripcion: "",
    rodajeSecciones: [
      {
        titulo: "Bloque de rodaje",
        meta: "Día 1 · 11:05-12:15 · Umbral · P1",
        abierta: true,
        contenido: "<ul><li>Escena: Enfermería e inspección de postulante.</li><li>Personajes: ENF, ENFA, POST y MAEST.</li><li>Escena íntima y física con contraste de trato entre enferma y joven.</li></ul>"
      },
      {
        titulo: "Luz propuesta",
        contenido: "<ul><li>Intención actual: escena más iluminada, con ambiente de hospital.</li><li>Dominante cenital suave con Neewer RGB1200 rebotado en techo blanco (a confirmar en técnica).</li><li>Modelado táctil solo en insertos con fuente lateral baja y negativo cercano.</li></ul>"
      },
      {
        titulo: "Cobertura y pendientes",
        contenido: "<ul><li>Planos de destape y contacto preferiblemente en directo con dos cámaras para no repetir exposición.</li><li>Insertos de puro atrezo (barreño/trapo y trompetilla) pueden ir al final como bodegón.</li><li>Pendiente: condiciones de desnudo/destape y localización de barreño final.</li></ul>"
      }
    ]
  },

  "establo": {
    id: "establo",
    nombre: "Establo",
    foto: "img/salas/San_Antonio_el_Real_-_Establo_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Establo_02.webp",
      "img/salas/San_Antonio_el_Real_-_Establo_03.webp"
    ],
    polygon: [[-971, 627], [-1018, 810], [-1061, 801], [-1014, 617]],
    funcion: "Dependencia de servicio para animales, aperos y trabajos ligados al abastecimiento.",
    objetos: ["pesebre", "paja", "heno", "cubo", "cuerda", "arneses", "silla de montar", "escoba", "horca", "azada", "sacos", "farol"],
    descripcion: "",
    rodajeSecciones: [
      {
        titulo: "Bloque de rodaje",
        meta: "Día 2 · 14:15-15:30 · Estampas · P2",
        abierta: true,
        contenido: "<ul><li>Escena: Cuidado del Niño Jesús.</li><li>Personaje principal: ENF; participación de ANG pendiente de decisión de puesta en escena.</li><li>Escena de transición antes del bloque final de planta alta.</li></ul>"
      },
      {
        titulo: "Notas de dirección",
        contenido: "<ul><li>Hay tres opciones de puesta en escena por cerrar.</li><li>Reservar tiempo de bloqueo para decidir eje de mirada y proximidad al objeto.</li><li>Cuidar textura orgánica del espacio (paja, madera, polvo) en primer término.</li></ul>"
      }
    ]
  },

  // ── Salas sin ubicar en el plano (sin bounds/polygon) ──────────────────────
  // Aparecen automáticamente en el listado "Otras salas" de index.html y son
  // accesibles por su ficha (sala.html?sala=...), pero no se dibujan en el mapa
  // hasta que se les añada bounds o polygon.

  "huerto-de-toxicos": {
    id: "huerto-de-toxicos",
    nombre: "Huerto de Tóxicos",
    foto: "img/salas/San_Antonio_el_Real_-_Huerto_de_Toxicos_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Huerto_de_Toxicos_02.webp"
    ],
    funcion: "Huerto cercado dedicado al cultivo de plantas venenosas o de uso restringido, separado del resto de cultivos por su peligrosidad.",
    objetos: ["plantas de hojas oscuras", "cercado bajo", "cartel o señal de aviso", "guantes", "cesto cerrado", "azada", "regadera", "libro de herboristería"],
    descripcion: ""
  },

    "corredor-de-celdas": {
    id: "corredor-de-celdas",
    nombre: "Corredor de las celdas",
    foto: "img/salas/San_Antonio_el_Real_-_Corredor_de_las_Celdas_01.webp",
    funcion: "Corredor que lleva a las celdas antiguas de las hermanas.",
      descripcion: "Pasillo que conecta las diferentes celdas del convento, utilizado por las monjas para acceder a sus habitaciones. Tiene una única ventana alta al fondo del corredor.",
      rodajeSecciones: [
        {
          titulo: "Bloque de rodaje",
          meta: "Día 2 · 15:30-16:45 · Muerte · P1",
          abierta: true,
          contenido: "<ul><li>Escena: Irse a dormir.</li><li>Personajes: ABAD, ENFA y comunidad.</li><li>Localización en planta alta (no representada en plano de planta baja).</li></ul>"
        },
        {
          titulo: "Continuidad",
          contenido: "<ul><li>Este bloque conecta directamente con Monja enferma en celda (16:45-17:35).</li><li>Mantener raccord de desplazamiento, cansancio y tono final de jornada.</li><li>Asegurar limpieza de fondos al tratarse de pasillo largo con perspectiva.</li></ul>"
        }
      ]
  },

    "ermita-de-santiago": {
    id: "ermita-de-santiago",
    nombre: "Ermita de Santiago",
    foto: "img/salas/San_Antonio_el_Real_-_Ermita_de_Santiago_01.webp",
    fotos: [
      "img/salas/San_Antonio_el_Real_-_Ermita_de_Santiago_02.webp",
      "img/salas/San_Antonio_el_Real_-_Ermita_de_Santiago_03.webp"
    ],
    funcion: "Ermita para rezar junto a las tumbas de las monjas enterradas en el exterior.",
    descripcion: "Pequeña ermita con decoraciones muy coloridas y frescos en las paredes. Se encuentra junto al cementerio de las monjas y tiene un altar con una imagen de Santiago."
  },

  "salon-de-los-libros": {
    id: "salon-de-los-libros",
    nombre: "Salón de los Libros",
    foto: "img/salas/San_Antonio_el_Real_-_Salon_de_los_Libros_01.webp",
    funcion: "Sala de estudio, copia y conservación de libros y manuscritos de la comunidad.",
    objetos: ["estanterías", "libros encuadernados", "atril de lectura", "tintero", "plumas", "papel", "lupa", "vela", "escalera pequeña", "cajas de documentos"],
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