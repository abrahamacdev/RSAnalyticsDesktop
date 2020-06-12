import React, { Component } from 'react';

import Constantes from 'utils/Constantes';

import Equipo from 'assets/images/equipo.svg';
import InformeDisponible from 'assets/images/informe_disponible.svg';

import 'bulma/css/bulma.min.css';
import estilosNotificacion from 'assets/sass/dashboard/notificaciones/listaNotificaciones/notificacion/Notificacion.module.css';

class Notificacion extends Component {

    crearTextoNotificacionInforme = () => {
        const clasesTextoInvitación = [estilosNotificacion['texto-informe-disponible']];

        return (
            <p id={"textoNotificacion" + this.props.index} className={clasesTextoInvitación.join(' ')}>
                {this.props.notificacion.mensaje}
            </p>
        )
    }

    crearTextoNotificacionGrupo = () => {
        const clasesTextoInvitación = [estilosNotificacion['texto-invitacion-grupo']];

        return (
            <p id={"textoNotificacion" + this.props.index} className={clasesTextoInvitación.join(' ')}>
                ¡Hola! Soy <strong>{this.props.notificacion.emisor}</strong>, responsable del grupo <strong>{this.props.notificacion.accion.nombreGrupo}</strong> y nos gustaría mucho
                que te unieras a nosotros. ¿Qué opinas?
            </p>
        )
    }

    crearAccionNotificacion = () => {

        // Comprobamos que la notificación no halla sido leída aún
        if(!this.props.notificacion.accion.completada){

            const clasesContenedorAcciones = [estilosNotificacion['contenedor-acciones']];

            const clasesBotonAceptar = [estilosNotificacion['accion'], estilosNotificacion['aceptar']];
            const clasesBotonRechazar = [estilosNotificacion['accion'], estilosNotificacion['rechazar']];

            const opcionesPeticion = {
                method: 'post',
                data: {
                    idNotificacion: this.props.notificacion.id
                }
            };

            return (
                <div className={clasesContenedorAcciones.join(' ')}>
                    <button className={clasesBotonAceptar.join(' ')} onClick={() => {
                        opcionesPeticion['url'] = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_GRUPO + Constantes.RUTA_INVITACION + Constantes.ACEPTAR_INVITACION_ENDPOINT;
                        this.props.onAccion(opcionesPeticion);
                    }}>¡Claro!</button>

                    <button className={clasesBotonRechazar.join(' ')} onClick={() => {
                        opcionesPeticion['url'] = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_GRUPO + Constantes.RUTA_INVITACION + Constantes.RECHAZAR_INVITACION_ENDPOINT;
                        this.props.onAccion(opcionesPeticion);
                    }}>No, gracias</button>
                </div>
            );
        }
    }

    obtenerCamposParaMostrar = () => {
        
        const clasesContenedorImagen = [estilosNotificacion['contenedor-imagen']];
        const clasesContenedorTextos = [estilosNotificacion['contenedor-textos']];

        // Es una invitación a grupo
        if(this.props.notificacion.accion != null){
            
            const clasesImagen = [estilosNotificacion['imagen-resumen-notificacion-invitacion']];

            return [
                <div className={clasesContenedorImagen.join(' ')}>
                    <img src={Equipo} className={clasesImagen.join(' ')}/>
                </div>,
                <div className={clasesContenedorTextos.join(' ')}>
                    <p className={estilosNotificacion['titulo-notificacion']}>Invitación de adhesión a grupo</p>
                    {this.crearTextoNotificacionGrupo()}
                    {this.crearAccionNotificacion()}
                </div>
            ]
        }

        else {

            const clasesImagen = [estilosNotificacion['imagen-resumen-notificacion-informe']];

            return [
                <div className={clasesContenedorImagen.join(' ')}>
                    <img src={InformeDisponible} className={clasesImagen.join(' ')}/>
                </div>,
                <div className={clasesContenedorTextos.join(' ')}>
                    <p className={estilosNotificacion['titulo-notificacion']}>Informe disponible</p>
                    {this.crearTextoNotificacionInforme()}
                </div>
            ]
            
        }

    }

    render = () => {

        const clasesContenedorPrincipal = [estilosNotificacion['contenedor-principal'], 'card'];

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>
                {this.obtenerCamposParaMostrar()}
            </div>
        );
    }

}

export default Notificacion;