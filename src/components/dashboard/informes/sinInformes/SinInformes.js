import React, { Component } from 'react';
import Lottie from 'react-lottie';

import estilosSinInformes from 'assets/sass/dashboard/informes/sinInformes/SinInformes.module.css'

import AnimacionCreacionInforme from 'assets/animations/animacion_creacion_informe.json';

class SinInformes extends Component {

    render = () => {

        const clasesContenedorPrincipal = [estilosSinInformes['contenedor-principal']];

        const clasesContenedorAnimacion = [estilosSinInformes['contenedor-animacion']];
        const opcionesAnimacion = {
            loop: false,
            autoplay: true, 
            animationData: AnimacionCreacionInforme,
            rendererSettings: {
                preserveAspectRatio: 'slice',
                className: 'animacion',
                id:'animacion'
            }
        };

        const clasesContenedorTexto = [estilosSinInformes['contenedor-texto']];

        return (
            <div className={clasesContenedorPrincipal}>

                <div className={clasesContenedorAnimacion.join(' ')}>
                    <Lottie options={opcionesAnimacion} isClickToPauseDisabled={true}/>
                </div>

                <div className={clasesContenedorTexto.join(' ')}>
                    <p>¡Comienza generando tu primer informe! ¿A qué esperas?</p>
                    <button onClick={this.props.onSolicitarInforme}>Solicitar informe</button>
                </div>
                
                {this.props.children}
            </div>
        )
    }

}

export default SinInformes;