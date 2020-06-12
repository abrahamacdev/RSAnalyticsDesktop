import React, { Component } from 'react';
import Lottie from 'react-lottie';

import estilosSinNotificaciones from '../../../../assets/sass/dashboard/notificaciones/sinNotificaciones/SinNotificaciones.module.css';

import AnimacionSinNotificaciones from '../../../../assets/animations/animacion_sin_notificaciones.json';

class SinNotificaciones extends Component {

    render = () => {

        const clasesContenedorPrincipal = [estilosSinNotificaciones['contenedor-principal']];

        const clasesContenedorAnimacion = [estilosSinNotificaciones['contenedor-animacion']];
        const opcionesAnimacion = {
            loop: true,
            autoplay: true, 
            animationData: AnimacionSinNotificaciones,
            rendererSettings: {
                preserveAspectRatio: 'slice',
                id:'animacion'
            }
        };

        const clasesContenedorTexto = [estilosSinNotificaciones['contenedor-texto']];

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>
                
                <div className={clasesContenedorAnimacion.join(' ')}>
                    <Lottie options={opcionesAnimacion} />
                </div>

                <div className={clasesContenedorTexto.join(' ')}>
                    <p>¡Vaya! Parece que aún no tienes ninguna notificación</p>
                    <button onClick={this.props.onRecargar}>Recargar</button>
                </div>

            </div>
        );
    }
}

export default SinNotificaciones;