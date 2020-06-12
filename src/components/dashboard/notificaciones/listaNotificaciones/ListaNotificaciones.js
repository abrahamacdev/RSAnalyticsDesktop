import React, { Component } from 'react';
import axios from 'axios';

import Notificacion from './notificacion/Notificacion';

import 'bulma/css/bulma.min.css';
import estilosListaNotificaciones from 'assets/sass/dashboard/notificaciones/listaNotificaciones/ListaNotificaciones.module.css';

class ListaNotificaciones extends Component {

    onAccion = opciones => {

        opciones['headers'] = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `${this.props.token}`
        };

        axios(opciones)
            .then(async respuesta => {
                const body = await respuesta.data;
                
                this.props.onRecargarNotificaciones();

            })
            .catch(error => {
                console.log('Ocurrio un error al realizar una accion');
            });
    }

    render = () => {

        const notificacionesParseadas = this.props.notificaciones.map((notificacion,indx) => {
            return (<Notificacion key={"notificacion" + indx} index={indx} notificacion={notificacion} onAccion={this.onAccion}/>);
        });

        const clasesContenedorPrincipal = [estilosListaNotificaciones['contenedor-principal']];

        const clasesContenedorNotificaciones = [estilosListaNotificaciones['contenedor-notificaciones']];

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>

                <div className={clasesContenedorNotificaciones.join(' ')}>
                    {notificacionesParseadas}
                </div>

            </div>
        );
    }

}

export default ListaNotificaciones;