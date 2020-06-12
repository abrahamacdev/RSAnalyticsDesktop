import React, { Component } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';

import Constantes from 'utils/Constantes';

import Linea from 'assets/images/linea.svg';
import Cruz from 'assets/images/cruz-roja.svg';
import Tick from 'assets/images/tick.svg';

import AnimacionCarga from 'assets/animations/animacion_cargando.json';
import AnimacionInvEnviada from 'assets/animations/animacion_operacion_exitosa.json';
import AnimacionInvFallida from 'assets/animations/animacion_operacion_fallida.json';

import 'bulma/css/bulma.min.css';
import estilosInvitacion from 'assets/sass/dashboard/grupos/Invitacion.module.css';

class Invitacion extends Component {

    arrobaEscrito = false;
    formatoValido = false;

    constructor(props){
        super(props);
        this.state = {
            imagen: Linea,
            enviandoInvitacion: false,
            huboError: false,
            mensajeError: '',
            invitacionEnviada: false    
        };
    }

    cerrarVentana = event => {

        const id = event.target.id;

        if(event.stopPropagation){
            event.stopPropagation();
        }

        if(id != null){
            if(id == 'blur'){
                this.props.onClose();
                return;
            }
        }
    }

    comprobarCorreoEscrito = event => {

        const correo = event.target.value;

        if(correo.length == 0){
            this.setState({
                imagen: Linea
            });
        }

        else {

            this.setState({
                imagen: Cruz
            });
    
            if(correo.includes('@')){
                this.arrobaEscrito = true;
            }
            else {
                this.arrobaEscrito = false;
            }
    
            // Comprobamos que el correo tenga el formato válido
            if(this.arrobaEscrito && Constantes.REGEX_MAIL.test(correo)){
                this.formatoValido = true;
            }
            else{
                this.formatoValido = false;
            }
    
            if(this.formatoValido){
                this.setState({
                    imagen: Tick
                });
            }
        }

    }

    enviarInvitacion = event => {
        
        // Comprobamos que el correo al que le enviaremos una invitacion sea valido
        if(this.formatoValido){
            
            const emailInvitado = document.getElementById("correoUsuario").value;
            
            const url = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_GRUPO + Constantes.INVITAR_ENDPOINT;
    
            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `${this.props.token}`
                }
            };

            const data = {
                invitado: emailInvitado
            };

            // Mostramos la animacion de carga
            this.setState({
                enviandoInvitacion: true
            }, () => {
                axios.post(url, data, config)
                    .then(async respuesta => {
                        const body = await respuesta.data;

                        this.setState({
                            invitacionEnviada: true
                        });

                    })
                    .catch(error => {
                        
                        this.setState({
                            huboError: true,
                            mensajeError: error.response.data.msg
                        });
                    });
                }
            );
        }
    }

    render = () => {

        const clasesContenedorPrincipal = [estilosInvitacion['contenedor-principal']];
        const clasesContenedorBlur = [...clasesContenedorPrincipal, estilosInvitacion['blur']];

        const clasesTarjeta = ['card', estilosInvitacion['tarjeta']];
        
        let haRenderizar = null;

        // Mostramos los elementos para enviar la invitacion
        if(!this.state.enviandoInvitacion){

            const clasesTarjetaInvitacion = [...clasesTarjeta, estilosInvitacion['tarjeta-invitacion']];
            const clasesContenedorInputUsuario = [estilosInvitacion['contenedor-input-usuario']];
            const clasesBotonInvitar = [estilosInvitacion['boton-invitar']];

            haRenderizar = (
                <div id="tarjetaInvitacion" className={clasesTarjetaInvitacion.join(' ')}>
                    <div className={clasesContenedorInputUsuario.join(' ')}>
                        <label htmlFor="correoUsuario">Buscar</label>
                        <input id="correoUsuario" placeholder="Introduzca el correo del usuario" type="email" onKeyUp={this.comprobarCorreoEscrito}></input>
                        <img src={this.state.imagen}></img>
                    </div>
                    <button className={clasesBotonInvitar.join(' ')} onClick={this.enviarInvitacion}>Enviar invitación</button>   
                </div>
            );
        }

        // Estamos enviando la información
        else {

            const clasesTextoResInv = [estilosInvitacion['texto-resultado-invitacion']];

            let opcionesAnimacion = {
                loop: true,
                autoplay: true,
                rendererSettings: {
                    preserveAspectRatio: 'slice'                        
                } 
            };

            // Algo salio mal al realizar la invitacion
            if(this.state.huboError){

                const clasesContenedorResInvAnim = [estilosInvitacion['contenedor-animacion-fallida']];

                opcionesAnimacion = {
                    animationData: AnimacionInvFallida
                }

                haRenderizar = (
                    <div className={clasesTarjeta.join(' ')}>
                        <div className={clasesContenedorResInvAnim.join(' ')}>
                            <Lottie options={opcionesAnimacion} isClickToPauseDisabled={true}/>
                        </div>
                        <p className={clasesTextoResInv}>{this.state.mensajeError}</p>
                    </div>
                );

            }

            // La invitacion se envió correctamente
            else if(this.state.invitacionEnviada){

                const clasesContenedorResInvAnim = [estilosInvitacion['contenedor-animacion-exitosa']];

                opcionesAnimacion = {
                    loop: false,
                    animationData: AnimacionInvEnviada
                }

                haRenderizar = (
                    <div className={clasesTarjeta.join(' ')}>
                        <div className={clasesContenedorResInvAnim.join(' ')}>
                            <Lottie options={opcionesAnimacion} isClickToPauseDisabled={true}/>
                        </div>
                        <p className={clasesTextoResInv}>Se ha enviado la invitación exitósamente</p>
                    </div>
                );
            }

            // Enviando...
            else {

                const clasesContenedorCarga = [estilosInvitacion['contenedor-animacion-carga']];

                opcionesAnimacion = {
                    animationData: AnimacionCarga
                }

                haRenderizar = (
                    <div className={clasesTarjeta.join(' ')}>
                        <div className={clasesContenedorCarga.join(' ')}>
                            <Lottie options={opcionesAnimacion} isClickToPauseDisabled={true}/>
                        </div>
                    </div>
                );
            }

        }

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>
                
                <div id="blur" className={clasesContenedorBlur.join(' ')} onClick={this.cerrarVentana}></div>
                {haRenderizar}
                

            </div>
        );
    } 
}

export default Invitacion;