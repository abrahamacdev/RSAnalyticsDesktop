import React, { Component } from 'react';
import axios from 'axios';

import Constantes from '../../utils/Constantes';

import 'bulma/css/bulma.min.css';
import estilosRegistro from '../../assets/sass/registro/Registro.module.css';

class Registro extends Component {

    constructor(props){
        super(props);

        this.state = {
            errorNombre: ' ',
            errorPrimerAp: ' ',
            errorSegundoAp: ' ',
            errorGenero: ' ',
            errorTelefono: ' ',
            errorCorreo: ' ',
            errorContrasenia: ' ',
            mostrarAyudaContrasenia: false
        }
    }

    comprobarDatos = () => {

        let datos = null;

        // Comprobamos el nombre
        const nombre = document.getElementById("inputNombre").value.trim();
        if(nombre.length == 0 || !Constantes.REGEX_NOMBRE_PERSONA.test(nombre)){
            this.setState({
                errorNombre: 'Nombre no válido'
            });
            return null;
        }
        else {
            this.setState({
                errorNombre: ' '
            });
            datos = {}
            datos['nombre'] = nombre;
        }

        // Comprobamos el primerApellido
        const primerAp = document.getElementById("inputPrimerAp").value.trim();
        if(primerAp.length == 0 || !Constantes.REGEX_NOMBRE_PERSONA.test(primerAp)){
            this.setState({
                errorPrimerAp: 'Apellido no válido'
            });
            return null;
        }
        else{
            this.setState({
                errorPrimerAp: ' '
            });
            datos['primerApellido'] = primerAp;
        }

        // Comprobamos el segundoApellido
        const segundoAp = document.getElementById("inputSegundoAp").value.trim();
        if(segundoAp.length == 0 || !Constantes.REGEX_NOMBRE_PERSONA.test(segundoAp)){
            this.setState({
                errorSegundoAp: 'Apellido no válido'
            });
            return null;
        }
        else{
            this.setState({
                errorSegundoAp: ' '
            });
            datos['segundoApellido'] = segundoAp;
        }

        // Comprobamos el genero
        let generoFemenino = document.getElementById("generoFemenino").classList.contains(estilosRegistro['genero-seleccionado']);
        let generoMasculino = document.getElementById("generoMasculino").classList.contains(estilosRegistro['genero-seleccionado']);
        if(!generoMasculino && !generoFemenino){
            this.setState({
                errorGenero: 'Seleccione un género'
            });
            return null;
        }
        else {
            this.setState({
                errorGenero: ' '
            }); 
            datos['genero'] = generoMasculino ? 'H' : 'M'
        }

        // Comprobamos el telefono
        const telefono = document.getElementById("inputTelefono").value.trim();
        if(!Constantes.REGEX_TELEFONO.test(telefono)){
            this.setState({
                errorTelefono: 'Telefono no válido'
            });
            return null;
        }
        else{
            this.setState({
                errorTelefono: ' '
            });
            datos['telefono'] = telefono;
        }

        // Comprobamos el correo
        const correo = document.getElementById("inputCorreo").value.trim();
        if(correo.length == 0 || !Constantes.REGEX_MAIL.test(correo)){
            this.setState({
                errorCorreo: 'Correo no válido'
            });
            return null;
        }
        else{
            this.setState({
                errorCorreo: ' '
            });
            datos['correo'] = correo;
        }

        // Comprobamos las contraseñas
        const inputContrasenia = document.getElementById("inputContrasenia");
        const inputRepetirContrasenia = document.getElementById("inputRepetirContrasenia");
        const primeraContrasenia = inputContrasenia.value.trim();
        const segundaContrasenia = inputRepetirContrasenia.value.trim();
        if(primeraContrasenia.length < 8 || !Constantes.REGEX_CONTRASENIA.test(primeraContrasenia)){
            this.setState({
                errorContrasenia: `Contraseña no válida.`,
                mostrarAyudaContrasenia: true
            });
            return null;
        }
        else if(primeraContrasenia !== segundaContrasenia){
            this.setState({
                errorContrasenia: 'Las contraseñas no coinciden.',
                mostrarAyudaContrasenia: false
            });
            inputRepetirContrasenia.value = '';
            return null;
        }
        else{
            this.setState({
                errorContrasenia: ' '
            });
            datos['contrasenia'] = primeraContrasenia;
        }
        
        return datos;
    }

    registrar = () => {

        const datos = this.comprobarDatos();

        if(datos != null){
            const url = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_USUARIO + Constantes.REGISTRO_USUARIO_ENDPOINT;

            const data = JSON.stringify(datos);

            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };

            axios.post(url, data, config)
                .then(res => {
                    
                    // Se ha registrado correctamente
                    if(res.status == 201){
                        this.props.onRegistrado();
                    }
                })
                .catch(error => {

                    // status != 2xx
                    if(error.response){

                        // Combinacion erronea
                        if(error.response.status == 400){
                            this.setState({
                                errorCorreo: 'Ya existe un usuario con ese correo, introduzca otro'
                            });
                        }
                    }
                    
                    else {
                        alert('Algo salió mal, vuelva a intentarlo')
                    }
                })
        }
    }

    cambioGeneroSeleccionado = event => {

        const seleccionado = event.target;

        if (event.target.id === 'generoFemenino') {
            document.getElementById('generoMasculino').classList.remove(estilosRegistro['genero-seleccionado']);
        }
        
        else {
            document.getElementById('generoFemenino').classList.remove(estilosRegistro['genero-seleccionado']);
        }

        seleccionado.classList.add(estilosRegistro['genero-seleccionado']);    
    }

    render = () => {
        
        const clasesContenedorPrincipal = [estilosRegistro['contenedor-principal']];

        const clasesTarjeta = [estilosRegistro['tarjeta'], 'card'];

        const clasesImagenFlecha = [estilosRegistro['imagen-flecha']];
        const clasesContenedorOpcion = [estilosRegistro['contenedor-opcion']];
        const clasesContenedorGenero = [...clasesContenedorOpcion, estilosRegistro['contenedor-genero']];
        const clasesImagenGenero = [estilosRegistro['imagen-genero']];
        const clasesTextoError = [estilosRegistro['texto-error']];
        const clasesBotonRegistrar = [estilosRegistro['boton-registrar']];

        const clasesImagenFemenina = [...clasesImagenGenero, estilosRegistro['imagen-femenina']];
        const clasesImagenMasculina = [...clasesImagenGenero, estilosRegistro['imagen-masculina']];
        const clasesLabelGenero = [estilosRegistro['label-genero']];
        const clasesErrorGenero = [...clasesTextoError, estilosRegistro['error-genero']];

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>
                
                <div className={clasesTarjeta.join(' ')}>

                    <div className={clasesImagenFlecha.join(' ')} onClick={this.props.onRegistrado}></div>

                    <div className={clasesContenedorOpcion.join(' ')}>
                        <label htmlFor="inputNombre">Nombre</label>
                        <input id="inputNombre" type="text"/>
                        <p id="errorNombre" className={clasesTextoError.join(' ')}>{this.state.errorNombre}</p>
                    </div>

                    <div className={clasesContenedorOpcion.join(' ')}>
                        <label htmlFor="inputPrimerAp">Primer Apellido</label>
                        <input id="inputPrimerAp" type="text"/>
                        <p id="errorPrimerAp" className={clasesTextoError.join(' ')}>{this.state.errorPrimerAp}</p>
                    </div>

                    <div className={clasesContenedorOpcion.join(' ')}>
                        <label htmlFor="inputSegundoAp">Segundo Apellido</label>
                        <input id="inputSegundoAp" type="text"/>
                        <p id="errorSegundoAp" className={clasesTextoError.join(' ')}>{this.state.errorSegundoAp}</p>
                    </div>

                    <div className={clasesContenedorGenero.join(' ')}>
                        <p id="labelGenero" className={clasesLabelGenero.join(' ')}>Género</p>
                        <div id="generoFemenino" className={clasesImagenFemenina.join(' ')} onClick={this.cambioGeneroSeleccionado}></div>
                        <div id="generoMasculino" className={clasesImagenMasculina.join(' ')} onClick={this.cambioGeneroSeleccionado}></div>
                        <p className={clasesErrorGenero.join(' ')}>{this.state.errorGenero}</p>
                    </div>

                    <div className={clasesContenedorOpcion.join(' ')}>
                        <label htmlFor="inputTelefono">Nº de teléfono</label>
                        <input id="inputTelefono" type="tel"/>
                        <p id="errorTelefono" className={clasesTextoError.join(' ')}>{this.state.errorTelefono}</p>
                    </div>

                    <div className={clasesContenedorOpcion.join(' ')}>
                        <label htmlFor="inputCorreo">Correo electrónico</label>
                        <input id="inputCorreo" type="email"/>
                        <p id="errorCorreo" className={clasesTextoError.join(' ')}>{this.state.errorCorreo}</p>
                    </div>

                    <div className={clasesContenedorOpcion.join(' ')}>
                        <label htmlFor="inputContrasenia">Contraseña</label>
                        <input id="inputContrasenia" type="password"/>
                        <p id="errorContrasenia" className={clasesTextoError.join(' ')}>{this.state.errorContrasenia}</p>
                        <p>{this.state.mostrarAyudaContrasenia ? `Debe de tener: al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial (!@#$%^&*)` : null}</p>
                    </div>

                    <div className={clasesContenedorOpcion.join(' ')}>
                        <label htmlFor="inputRepetirContrasenia">Repetir contraseña</label>
                        <input id="inputRepetirContrasenia" type="password"/>
                    </div>

                    <button className={clasesBotonRegistrar.join(' ')} onClick={this.registrar}>Registrar</button>

                </div>

            </div>
        );
    }
}

export default Registro;