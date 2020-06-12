import React, { Component } from 'react';
import axios from 'axios';

import estilosInforme from 'assets/sass/dashboard/informes/listaInformes/informe/Informe.module.css';

import Constantes from 'utils/Constantes';

import importe from 'assets/images/informe.svg';
import descarga from 'assets/images/descarga.svg';
import cargando from 'assets/images/cargando.svg';


class Informes extends Component {

    descargarInforme = () => {

        const opciones = {
            method: 'get',
            url: Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_INFORMES + Constantes.DESCARGAR_INFORME_ENDPOINT + "?id=" + this.props.informe.id,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
                //'Accept': 'application/pdf'
            },
            responseType: 'blob'
        };

        axios(opciones)
            .then(async respuesta => {
                const body = await respuesta.data;

                // Creamos un elemento "a" oculto
                const url = window.URL.createObjectURL(new Blob([body]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.props.informe.nombreArchivo);
                document.body.appendChild(link);
                link.click();
                link.remove();

            })
            .catch(error => {
                console.log(error)
                console.log(`Ocurrio un error al descargar el informe con id ${this.props.informe.id}`);
            });
        
    }

    render = () => {

        const clasesContenedorPrincipal = [estilosInforme['contenedor-principal'], 'card'];

        const clasesContenedorImagen = [estilosInforme['contenedor-imagen']];
        const clasesImagenInforme = [estilosInforme['imagen-resumen-informe']];

        const clasesContenedorTextos = [estilosInforme['contenedor-textos']];
        const clasesTituloInforme = [estilosInforme['titulo-informe']];
        const clasesFechaRealizacion = [estilosInforme['fecha-informe']];
        const clasesImagenEstado = [estilosInforme['imagen-estado']];
        

        let imagenEstado = descarga;
        let imagenOnClick = this.descargarInforme;
        if(this.props.informe.pendiente){
            imagenEstado = cargando;
            imagenOnClick = null;
        }

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>
                
                <div className={clasesContenedorImagen.join(' ')}>
                    <img src={importe} className={clasesImagenInforme.join(' ')}/>
                </div>

                <div className={clasesContenedorTextos.join(' ')}>
                    <p className={clasesTituloInforme} >Informe del municipio '<b>{this.props.informe.municipio}</b>'</p>
                    <p className={clasesFechaRealizacion}>Solicitado el día {this.props.informe.fechaSolicitud}</p>
                    <img src={imagenEstado} className={clasesImagenEstado.join(' ')} onClick={imagenOnClick}/>
                </div>

            </div>
        );
    }
}

export default Informes;