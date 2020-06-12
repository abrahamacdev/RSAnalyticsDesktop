import React, { Component } from 'react';
import axios from 'axios';

import Constantes from '../../../utils/Constantes';
import Utils from '../../../utils/Utils';
import Invitacion from './Invitacion';

import ImagenMujer from '../../../assets/images/avatar_mujer.svg';
import ImagenHombre from '../../../assets/images/avatar_hombre.svg';
import ImagenInvitar from '../../../assets/images/invitar.svg';

import 'bulma/css/bulma.min.css';
import estilosGrupos from '../../../assets/sass/dashboard/grupos/Grupos.module.css';

class Grupo extends Component {

    constructor(props){
        super(props)
        this.state = {
            nombreGrupo: '',
            participantes: [],
            mostrarDialogoInvitar: false
        }
    }

    componentDidMount = () => {

        this.obtenerDatosGrupo()
    }

    obtenerDatosGrupo = () => {

        const url = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_GRUPO + Constantes.DATOS_GRUPO_ENDPOINT;
    
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
            }
        };

        axios.get(url, config)
            .then(async respuesta => {
                const body = await respuesta.data;

                if(body.grupo.miembros.length == 0){
                    this.props.onSinGrupo();
                    return;
                };

                this.setState({
                    nombreGrupo: body.grupo.nombre,
                    participantes: body.grupo.miembros
                });

            })
            .catch(error => {

                // status != 2xx
                if(error.response){

                    // El usurio no tiene grupos
                    if(error.response.status == 400){
                        this.props.onSinGrupo();
                    }
                }

                // Error desconocido
                else {
                    // TODO Rellenar
                }
            });
    }

    abandonarGrupo = () => {

        // TODO Comproobar que en el diálogo que se muestre antes de abandonar, el usuario halla escrito el nombre del grupo
        const url = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_GRUPO + Constantes.ABANDONAR_GRUPO_ENDPOINT;
    
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
            }
        };

        axios.post(url, null, config)
            .then(async respuesta => {
                
                this.props.onSinGrupo();
            })
            .catch(error => {
                
                // TODO Rellenar
                console.log(error)
            });

    }

    determinarImagenSegunGenero = genero => {

        if(genero === 'H'){
            return ImagenHombre;
        }

        return ImagenMujer;
    }

    render = () => {

        const clasesContenedorPrincipal = [estilosGrupos['contenedor-principal']];

        const clasesContenedorNombreGrupo = [estilosGrupos['contenedor-nombre-grupo']];
        const clasesParrafoNombreGrupo = [estilosGrupos['texto-nombre-grupo']];
        const clasesBotonAbandonar = [estilosGrupos['boton-abandonar-grupo']];
        
        const clasesBotonInvitar = [estilosGrupos['boton-invitar']];

        // Tarjeta, Imagen, Nombre miembro, Fecha adhesión
        const clasesContenedorParticipantes = ['columns', 'is-vcentered', estilosGrupos['contenedor-participantes']];
        const clasesContenedorParticipante = ['column', 'is-half-desktop', 'is-half-widescreen', 'is-one-third-fullhd', estilosGrupos['contenedor-participante-unico']];
        
        const clasesTarjeta = ['card', estilosGrupos['tarjeta-participante']];
        const clasesTextoNombreMiembro = [estilosGrupos['nombre-miembro']];
        const clasesTextoMiembroDesde = [estilosGrupos['fecha-adhesion']];

        const imagen = {
            backgroundImage: 'url(' + this.determinarImagenSegunGenero('H') + ')'
        };
        const clasesImagenTarjeta = [estilosGrupos['imagen-tarjeta-participante']];

        // Parseamos los datos de cada participante a un 
        let participantes = [];

        for (let i = 0; i < this.state.participantes.length; i++) {
        
            const datos = this.state.participantes[i];

            const fechaIngreso = new Date(datos.miembroDesde);
            const mesEnTexto = Utils.convertirMes2Texto(fechaIngreso.getMonth());

            const fechaCompletaEnTexto = `Miembro desde ${fechaIngreso.getDate()} de ${mesEnTexto} de ${fechaIngreso.getFullYear()}`

            const imagen = {
                backgroundImage: 'url(' + this.determinarImagenSegunGenero(datos.genero) + ')'
            }

            const element = (
                <div className={clasesContenedorParticipante.join(' ')} key={i}>
                    <div className={clasesTarjeta.join(' ')}>
                        <div className={clasesImagenTarjeta.join(' ')} style={imagen}></div>
                        <p className={clasesTextoNombreMiembro.join(' ')}>{datos.nombre}</p>
                        <p className={clasesTextoMiembroDesde}>{fechaCompletaEnTexto}</p>
                    </div>
                </div>
            );

            participantes.push(element);
        }

        // Contenedor con miembros dcel grupo
        /* 
            <div className={clasesContenedorParticipantes.join(' ')}>
                <div className={clasesContenedorParticipante.join(' ')}>
                        <div className={clasesTarjeta.join(' ')}>
                            <div className={clasesImagenTarjeta.join(' ')} style={imagen}></div>
                            <p className={clasesTextoNombreMiembro.join(' ')}>Juan Cruz Garcia</p>
                            <p className={clasesTextoMiembroDesde}>Miembro desde 32 de Septiembre de 2002</p>
                        </div>
                    </div>
            </div>
        */

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>
                
                <div className={clasesContenedorNombreGrupo.join(' ')}>
                    <p className={clasesParrafoNombreGrupo.join(' ')}>{this.state.nombreGrupo}</p>
                    <button className={clasesBotonAbandonar.join(' ')} onClick={this.abandonarGrupo}>Abandonar</button>
                </div>

                <div className={clasesContenedorParticipantes.join(' ')}>
                    {participantes}
                </div>

                <div className={clasesBotonInvitar.join(' ')}  onClick={() => this.setState({mostrarDialogoInvitar: true})}>
                    <img src={ImagenInvitar}/>
                </div>

                {this.state.mostrarDialogoInvitar ? <Invitacion onClose={() => this.setState({mostrarDialogoInvitar: false})} token={this.props.token}/> : null}

            </div>
        )
    }
}

export default Grupo;