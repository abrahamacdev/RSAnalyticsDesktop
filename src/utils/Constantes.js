
const Constantes = {

    PROTOCOLO_ESTANDAR: 'http',

    HOST_API: '192.168.1.70:34080',

    // Paths
    RUTA_USUARIO: '/usuario',
    RUTA_GRUPO: '/grupo',
    RUTA_NOTIFICACIONES: '/notificaciones',
    RUTA_INVITACION: '/invitacion',
    RUTA_INFORMES: '/informe',
    RUTA_MUNICIPIOS: '/municipios',
    
    // Endpoints
    // Usuario
    LOGIN_ENDPOINT: '/login',
    REGISTRO_USUARIO_ENDPOINT: '/registro',
    NOTIFICACIONES_PENDIENTES_ENDPOINT: '/hayPendientes',
    MARCAR_NOTIFICACIONES_ENDPOINT: '/marcarNotificaciones',

    // Grupo
    REGISTRO_GRUPO_ENDPOINT: '/registro',
    DATOS_GRUPO_ENDPOINT: '/datosGenerales',
    ABANDONAR_GRUPO_ENDPOINT: '/abandonar',
    INVITAR_ENDPOINT: '/invitar',
    ABANDONAR_ENDPOINT: '/abandonar',
    ACEPTAR_INVITACION_ENDPOINT: '/aceptar',
    RECHAZAR_INVITACION_ENDPOINT: '/rechazar',

    // Informes
    LISTADO_INFORMES_ENDPOINT: '/listar',
    DESCARGAR_INFORME_ENDPOINT: '/descargar',
    SOLICITAR_INFORME_ENDPOINT: '/solicitar',

    // Municipios
    BUSCAR_MUNICIPIO_PARECIDO_ENDPOINT: '/buscarParecido',

    // Regexs
    REGEX_MAIL: /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/,
    REGEX_NOMBRE_GRUPO : /[`!@#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/,
    REGEX_NOMBRE_PERSONA: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/,
    REGEX_CONTRASENIA: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
    REGEX_TELEFONO: /^[0-9]{9}$/,

    // Otros
    LONGITUD_MAX_NOMBRE_GRUPO: 50
}

export default Constantes;