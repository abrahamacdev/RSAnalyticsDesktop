import React, { Component } from 'react';
import Lottie from 'react-lottie';
import axios from 'axios';

import Constantes from '../../../utils/Constantes';

import 'bulma/css/bulma.min.css';
import estilosSinGrupo from '../../../assets/sass/dashboard/grupos/SinGrupo.module.css';

import AnimacionBusqueda from '../../../assets/animations/animacion_busqueda_vacia.json';

class SinGrupo extends Component {

    constructor(props){
        super(props)

        this.state = {
            crearGrupo: false,
            existeNombre: false,
            error: null
        }
    }

    comprobarNombreGrupoValido = (nombre) => {

        if(nombre.length == 0){
            this.setState({
                error: 'El nombre no es válido, pruebe otro'
            });
            return false;
        }

        // Comprobamos que no sobrepase un numero máximo de caracteres
        if(nombre.length > Constantes.LONGITUD_MAX_NOMBRE_GRUPO){
            this.setState({
                error: `El nombre es demasiado largo (${Constantes.LONGITUD_MAX_NOMBRE_GRUPO} carácteres máx)`
            });
            return false;
        }

        if(Constantes.REGEX_NOMBRE_GRUPO.test(nombre)){
            this.setState({
                error: 'Los carácteres especiales no están permitidos'
            });
            return false
        }


        this.setState({
            error: null
        });

        return true;
    }

    registrarNuevoGrupo = () => {
        const nombreGrupo = document.getElementById("inputNombreGrupo").value.trim();

        // El nombre del grupo no es válido
        if(!this.comprobarNombreGrupoValido(nombreGrupo)) return;

        // TODO Comprobar que el nombre no exista y crear el grupo
        const url = Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_GRUPO + Constantes.REGISTRO_GRUPO_ENDPOINT;
        const data = {
            nombreGrupo: nombreGrupo
        }
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
            }
        };
        
        axios.post(url, data, config)
            .then(async respuesta => {
                const body = await respuesta;
                this.props.onRecargarGrupo();
            })
            .catch(error => {

                const status = error.response.status;
                
                let msgError = null;

                // Ya existe el grupo
                if(status == 409){
                    msgError = 'El grupo ya existe';
                }

                // Error desconocido
                else {
                    msgError = 'Ocurrió un error desconocido';
                }

                // Actualizamos el mensaje de error
                this.setState({
                    error: msgError
                });
            });
    }

    render = () => {

        const clasesContenedorPrincipal = [estilosSinGrupo['contenedor-principal']];

        // ANimacion con opción para crear un nuevo grupo
        const clasesContenedorError = [estilosSinGrupo['contenedor-error']];
        const clasesContenedorAnimacion = [estilosSinGrupo['contenedor-animacion']];
        const clasesTextoUps = [estilosSinGrupo['texto-ups']];
        const clasesBotonMostrarDialogo = [estilosSinGrupo['boton-crear']];

        const opcionesAnimacion = {
            loop: false,
            autoplay: true, 
            animationData: AnimacionBusqueda,
            rendererSettings: {
                preserveAspectRatio: 'slice',
                className: 'animacion',
                id:'animacion'
            }
        };

        let dialogoCreacionGrupo = null;

        if(this.state.crearGrupo){
            
            // Añadimos el efecto blur al contenedor de la animación
            clasesContenedorError.push(estilosSinGrupo['blur'])

            const clasesContenedorDialogo = [estilosSinGrupo['contenedor-dialogo']];
            const clasesContenedorDatosDialogo = [estilosSinGrupo['contenedor-datos-dialogo'], 'card'];

            const clasesImagenCruz = [estilosSinGrupo['imagen-cruz-dialogo']];

            const clasesContenedorNombreDialogo = [estilosSinGrupo['contenedor-nombre-grupo']];
            const clasesLabelNombreDialogo = [estilosSinGrupo['label-nombre-grupo']];
            const clasesInputNombreDialogo = [estilosSinGrupo['input-nombre-grupo']];
            const clasesParrafoErrorNombre = [estilosSinGrupo['error-nombre-grupo']];
            const clasesBotonCrearGrupo = [estilosSinGrupo['solicitar-creacion-grupo']];

            dialogoCreacionGrupo = (
                <div className={clasesContenedorDialogo.join(' ')}>
                    <div className={clasesContenedorDatosDialogo.join(' ')}>

                        <div className={clasesImagenCruz.join(' ')} onClick={() => this.setState({crearGrupo:false})}/>

                        <div className={clasesContenedorNombreDialogo.join(' ')}>
                            <input id="inputNombreGrupo" className={clasesInputNombreDialogo.join(' ')} type="text"/>
                            <label className={clasesLabelNombreDialogo.join(' ')}>Nombre del grupo</label>
                            <p className={clasesParrafoErrorNombre.join(' ')}>{this.state.error}</p>
                        </div>

                        <button className={clasesBotonCrearGrupo.join(' ')} onClick={() => this.registrarNuevoGrupo()}>¡Adelante!</button>

                    </div>
                </div>
            );
        }

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>

                <div className={clasesContenedorError.join(' ')}>
                    <div className={clasesContenedorAnimacion.join(' ')}>
                        <Lottie options={opcionesAnimacion} />
                    </div>
                    <p className={clasesTextoUps.join(' ')}>¡Ups! Parece que no estás en ningún grupo</p>
                    <button className={clasesBotonMostrarDialogo.join(' ')} onClick={() => this.setState({crearGrupo: true})}>Crear Grupo</button>
                </div>

                {dialogoCreacionGrupo}
            </div>    
        );
    }
}

export default SinGrupo;