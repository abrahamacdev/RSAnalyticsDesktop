import React, { Component } from 'react';
import axios from 'axios';

import 'assets/sass/Main.module.css';

import MenuLateral from './menuLateral/MenuLateral';
import Grupo from './grupos/Grupo';
import SinGrupo from './grupos/SinGrupo';
import InformesManager from './informes/InformesManager';
import ListaNotificaciones from './notificaciones/listaNotificaciones/ListaNotificaciones';
import SinNotificaciones from './notificaciones/sinNotificaciones/SinNotificaciones';
import Constantes from 'utils/Constantes';

class Dashboard extends Component {

    constructor(props){
        super(props)

        this.state = {
            fragment: <InformesManager token={this.props.token}/>,
            notificaciones: [],
            hayNotificacionesPendientes: false
        }
    }



    // ----- Notificaciones -----
    comprobarNotificacionesPendientes = (cb) => {

        // Obtendremos todas las notificaciones del usuario
        const url = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_USUARIO + Constantes.RUTA_NOTIFICACIONES + Constantes.NOTIFICACIONES_PENDIENTES_ENDPOINT;
    
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
            }
        };

        axios.get(url, config)
            .then(async respuesta => {
                const body = await respuesta.data;
                
                if(cb && typeof cb === 'function'){
                    cb(body.existenNotificacionesPendientes);
                }
            })
            .catch(error => {
                
                if(cb && typeof cb === 'function'){
                    cb(false);
                }
                
            });        
    }

    cargarNotificaciones = (cb) => {

        // Obtendremos todas las notificaciones del usuario
        const url = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_USUARIO + Constantes.RUTA_NOTIFICACIONES;
    
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
            }
        };

        axios.get(url, config)
            .then(async respuesta => {
                const body = await respuesta.data;
            
                console.log(body)

                if(cb && typeof cb === 'function'){
                    cb(body.notificaciones);
                }
                
            })
            .catch(error => {

                console.log('Ocurrio un error al cargar las notificaciones');
                
                if(cb && typeof cb === 'function'){
                    cb([]);
                }
            });
    }

    onRecargarNotificaciones = () => {

        // Cargamos todas las notificaciones
        this.cargarNotificaciones((notificacionesNuevas) => {

            const cambios =  {
                notificaciones: notificacionesNuevas,
                fragment: this.state.fragment,
                hayNotificacionesPendientes: false
            };

            // Mostramos el listado de notificaciones y las marcamos como leidas
            if(notificacionesNuevas.length > 0){
                this.marcarNotificacionesLeidas(notificacionesNuevas);
                cambios['fragment'] = <ListaNotificaciones notificaciones={notificacionesNuevas} token={this.props.token} onRecargarNotificaciones={this.onRecargarNotificaciones}/>;
            }

            // Mostramos la pantalla 'No hay notificaciones'
            else {
                cambios['fragment'] = <SinNotificaciones onRecargar={this.onRecargarNotificaciones} token={this.props.token}/>
            }

            // Guardamos los cambios
            this.setState({
                ...cambios
            });    
        });
    }

    marcarNotificacionesLeidas = (notificacionesNuevas) => {

        // Obtendremos todas las notificaciones del usuario
        const url = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_USUARIO + Constantes.RUTA_NOTIFICACIONES + Constantes.MARCAR_NOTIFICACIONES_ENDPOINT;
    
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
            }
        };

        const ids = {
            idsNotificaciones: []
        };

        const notificacionesNoLeidas = notificacionesNuevas.filter(notificacion => notificacion.leida == false)
            .map(notificacion => {
                return notificacion.id;
            });

        ids['idsNotificaciones'] = notificacionesNoLeidas;

        axios.post(url, ids, config)
            .then(async respuesta => {
                const body = await respuesta.data;
                
                console.log('Hemos marcado las notificaciones');
            })
            .catch(error => {

                console.log('Ocurrio un error al marcar las notificaciones');
            });
    }
    // --------------------------



    // ----- Grupos -----
    onSinGrupo = () => {
        this.setState({
            fragment: <SinGrupo token={this.props.token} onRecargarGrupo={this.onRecargarGrupo}/>
        })
    }

    onRecargarGrupo = () => {
        this.setState({
            fragment: <Grupo token={this.props.token} onSinGrupo={this.onSinGrupo}/>
        })
    }
    // ------------------



    cambiarFragmento = nuevaOpcion => {

        switch(nuevaOpcion){
            case 'informes':
                this.setState({
                    nombreFragment: 'informes',
                    fragment: <InformesManager token={this.props.token}/>
                });
            break;

            case 'notificaciones':
                this.onRecargarNotificaciones();
            break;

            case 'grupos':
                this.setState({
                    nombreFragment: 'grupos',
                    fragment: <Grupo token={this.props.token} onSinGrupo={this.onSinGrupo}/>
                });
            break;

            case 'logout':
                this.props.onLogout();
            break;
        }
    }

    componentDidMount = () => {

        // Comprobamos si hay notificaciones pendientes
        this.comprobarNotificacionesPendientes((hayNotificacionesPendientes) => {
            if(hayNotificacionesPendientes){
                this.setState({
                    hayNotificacionesPendientes: true
                })
            }
        });
    }

    render = () => {

        let clasesContenedorPrincipal = ["columns", "is-tablet", "is-paddingless", "is-marginless", "is-flex-desktop"];

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>
                <MenuLateral onOptionSelected={this.cambiarFragmento} hayNotificacionesPendientes={this.state.hayNotificacionesPendientes}/>
                {this.state.fragment}
            </div>
        );
    }

}

export default Dashboard;