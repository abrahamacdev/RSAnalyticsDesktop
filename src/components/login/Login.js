import React, { Component } from 'react';
import axios from 'axios';

import 'bulma/css/bulma.min.css';
import mainStyles from '../../assets/sass/Main.module.css';
import loginStyles from '../../assets/sass/login/Login.module.css';

import Constantes from '../../utils/Constantes';

class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            correo: '',
            contrasenia: '',
            correoNoValido: false,
            contraseniaVacia: false,
            correoVacio: false,
            mensajeError: '',
            realizandoPeticion: false
        };
    }

    comprobarCorreoValido = (correo) => {
        if(correo.match(Constantes.REGEX_MAIL) == null){
            this.setState({
                correoNoValido: true
            });
            return false;
        }
        return true;
    }

    guardarValorInput = (event) => {

        const esContrasenia = event.target.id === 'inputContrasenia';

        if(esContrasenia){
            this.setState({correo: this.state.correo, contrasenia: event.target.value.trim()});
            return;
        }
        
        this.setState({correo: event.target.value.trim(), contrasenia: this.state.contrasenia});
    }

    hacerLogin = (event) => {

        const url = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_USUARIO + Constantes.LOGIN_ENDPOINT;
        const data = JSON.stringify({
            correo: this.state.correo,
            contrasenia: this.state.contrasenia
          });
    
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };
        
        this.setState({
            mensajeError: ''
        });

        // Comprobamos que el correo no esté vacio
        if(this.state.correo === '' || this.state.correo.length == 0){
            this.setState({
                correoVacio: true
            });
            return;
        }
        this.setState({
            correoVacio: false
        });

        // Comprobamos que la contrasenia nno este vacia
        if(this.state.contrasenia === '' || this.state.contrasenia.length == 0){
            this.setState({
                contraseniaVacia: true
            });
            return;
        }
        this.setState({
            contraseniaVacia: false
        });

        // Comprobamos si el correo es valido
        if(!this.comprobarCorreoValido(this.state.correo)){
            return;
        }
        this.setState({
            correoNoValido: false
        });

        axios.post(url, data, config)
            .then(async respuesta => {
                const body = await respuesta;
            
                this.props.onLogged(body.data.token);

            })
            .catch(error => {
                
                // status != 2xx
                if(error.response){

                    // Combinacion erronea
                    if(error.response.status == 401){
                        this.setState({
                            mensajeError: 'El correo o la contraseña no son validos'
                        });
                    }
                }

                else {
                    console.log(error);

                    this.setState({
                        mensajeError: 'Ocurrio un error'
                    });
                }
            });
    }

    render(){
        
        // General
        let clasesContenedorPrincipal = [loginStyles['contenedor-principal-login'], mainStyles['full-screen'], 'is-gapless', 'is-mobile', 'columns'];

        // Contenedor boton registro
        let clasesContenedorRegistro = [loginStyles['contenedor-registro'], 'is-hidden-touch'];
        let clasesTextoRegistro = [loginStyles['texto-registro']];
        let clasesBotonRegistro = [loginStyles['boton-registro']];
        let claseBotonResgitroTouch = [loginStyles['boton-registro-touch'], 'is-hidden-desktop'];

        // Contenedor derecha
        let clasesContenedorDerecha = ['is-hidden-mobile', 'is-three-fifths-fullhd', 'is-three-fifths-desktop' , 'is-two-fifths-tablet', 'column'];

        // Contenedor izquierda
        let clasesContenedorIzquierda = ['is-mobile', 'columns', 'is-two-fifths-fullhd', 'is-two-fifths-desktop', 'is-three-fifths-tablet', 'is-full-mobile' ,'column', loginStyles['contenedor-datos-login']];
        // Primer contenedor formulario (contiene el padding)
        let clasesPrimerContenedorFormulario = [loginStyles['primerContenedorFormulario'], 'is-full', 'column'];
        // Segundo contenedor formulario (carta)
        let clasesSegundoContenedorFormulario = [loginStyles['segundoContenedorFormulario'], 'card'];

        // Titulo
        let clasesTituloBienvenida = ['title', loginStyles['titulo-bienvenida']];

        // Correo
        let clasesDivCorreo = [loginStyles['contenedor-correo']];

        // Contrasenia
        let clasesDivContrasenia = [loginStyles['contenedor-contrasenia']];
        let clasesIContrasenia = ""; // "fas fa-eye"

        // Mensaje de error (correo y contrasenia)
        let clasesParrafoError = [loginStyles['mensaje-error']];

        // Contenedor Boton Login
        let clasesDivLogin = [loginStyles['contenedor-boton-login']];
        let clasesTextoLogin = [loginStyles['texto-login']];
        let clasesIconoLogin = [loginStyles['icono-login']];

        // Mensaje de error (error en la combinacion)
        let clasesParrafoErrorCombinacion = [loginStyles['mensaje-combinacion-invalida'], loginStyles['mensaje-error']];


        // Mensaje de error para el campo del correo
        let mensajeErrorCorreo = null
        if(this.state.correoVacio){
            mensajeErrorCorreo = "Por favor, introduza un correo ";
        }
        else if (this.state.correoNoValido){
            mensajeErrorCorreo = "Por favor, introduzca un correo valido";
        }


        // Mensaje de error para el campo de la contrasenia
        let mensajeErrorContrasenia = null;
        if(this.state.contraseniaVacia){
            mensajeErrorContrasenia = "Por favor, escriba una contraseña";
        }

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>

                <div className={clasesContenedorRegistro.join(' ')}>
                    <p className={clasesTextoRegistro.join(' ')}>¿Aún no te has registrado?</p>
                    <button className={clasesBotonRegistro.join(' ')} onClick={this.props.onRegistrar}>Registrarme</button>
                </div>

                <div className={clasesContenedorIzquierda.join(' ')}>
                    
                    <div className={clasesPrimerContenedorFormulario.join(' ')}>
                        <div className={clasesSegundoContenedorFormulario.join(' ')}>

                            <p className={clasesTituloBienvenida.join(' ')}>Bienvenido</p>

                            <div className={clasesDivCorreo.join(' ')}>
                                <label htmlFor="inputCorreo">Correo</label>
                                <input id="inputCorreo" name="inputCorreo" type="mail" onChange={this.guardarValorInput}></input>
                                <p className={clasesParrafoError.join(' ')}>{mensajeErrorCorreo}</p>
                            </div>

                            <div className={clasesDivContrasenia.join(' ')}>
                                <label htmlFor="inputContrasenia">Contraseña</label>
                                <input id="inputContrasenia" name="inputContrasenia" type="password" onChange={this.guardarValorInput}></input>
                                <p className={clasesParrafoError.join(' ')}>{mensajeErrorContrasenia}</p>
                                <i className={clasesIContrasenia}></i>
                            </div>

                            <div className={clasesDivLogin.join(' ')} onClick={this.hacerLogin}>
                                <p className={clasesTextoLogin.join(' ')}>Log In</p>
                                <div className={clasesIconoLogin.join(' ')}></div>    
                            </div>

                            <button className={claseBotonResgitroTouch.join(' ')} onClick={this.props.onRegistrar}>Registrarme</button>

                            <p className={clasesParrafoErrorCombinacion.join(' ')}>{this.state.mensajeError}</p>

                        </div>
                    </div>

                </div>
                <div className={clasesContenedorDerecha.join(' ')}></div>        
            </div>
        )
    }
}

export default Login;