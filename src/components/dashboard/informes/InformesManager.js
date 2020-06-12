import React, { Component } from 'react';
import axios from 'axios';

import ListaInformes from './listaInformes/ListaInformes';
import SinInformes from './sinInformes/SinInformes';

import estilosInformesManager from 'assets/sass/dashboard/informes/InformesManager.module.css';

import Constantes from "utils/Constantes";

class InformesManager extends Component {

    constructor(props){
        super(props);

        this.state = {
            informes: [],
            mostrarSolicitudInforme: false,
            opcionesMunicipios: [],
            errores: []
        }

        this.timeout = null;
        this.municipioSeleccionado = null;
    }

    onMunicipioChange = (event) => {

        if(this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        let nombre = document.getElementById("inputMunicipio").value.trim();
        if(nombre.length > 0){
            this.timeout = setTimeout(this.buscarMunicipio, 700, nombre);
        }
        else{
            this.setState({
                opcionesMunicipios: []
            })
        }
    }

    onMunicipioClickeado = (event) => {
        this.setState({
            opcionesMunicipios: []
        });

        this.municipioSeleccionado = event.target.innerHTML;
        document.getElementById("inputMunicipio").value = event.target.innerHTML;
        document.getElementById("opcionesMunicipio").classList.add(estilosInformesManager['escondido']);        
    }

    buscarMunicipio = (nombre) => {

        const opciones = {
            method: 'post',
            url: Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_MUNICIPIOS + Constantes.BUSCAR_MUNICIPIO_PARECIDO_ENDPOINT,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
            },
            data: {
                palabraClave: nombre
            }
        };

        axios(opciones)
            .then(async respuesta => {
                const body = await respuesta.data;

                this.setState({
                    opcionesMunicipios: body.municipios
                });

            })
            .catch(error => {
                console.log(error)
                alert(error)
            });

    }

    cerrarDialogoSolicitarInforme = event => {

        if(event == null){
            this.setState({
                mostrarSolicitudInforme: false,
                errores: []
            });
            return;
        }

        const id = event.target.id;

        if(event.stopPropagation){
            event.stopPropagation();
        }

        if(id != null){
            if(id == 'blur'){
                this.setState({
                    mostrarSolicitudInforme: false,
                    errores: []
                });
                return;
            }
        }
    }

    onSolicitarInforme = () => {
        this.setState({
            mostrarSolicitudInforme: true
        });
    }

    onComprobarDatosInforme = () => {

        const errores = [];

        let elementoSelectTipoInmueble = document.getElementById("selectTipoInmueble");
        let idTipoInmueble = elementoSelectTipoInmueble.value;
        if(idTipoInmueble == null || idTipoInmueble == 0){
            errores.push("selectTipoInmueble");
        }
        else {
            elementoSelectTipoInmueble.classList.remove(estilosInformesManager['error']);
        }

        let elementoSelectTipoContrato = document.getElementById("selectTipoContrato");
        let idTipoContrato = elementoSelectTipoContrato.value;
        if(idTipoContrato == null || idTipoContrato == 0){
            errores.push("selectTipoContrato");
        }
        else {
            elementoSelectTipoContrato.classList.remove(estilosInformesManager['error']);
        }

        let elementoInputMunicipio = document.getElementById("inputMunicipio");
        let municipio = elementoInputMunicipio.value;
        if(municipio == null || municipio !== this.municipioSeleccionado){
            errores.push("inputMunicipio");
        }
        else {
            elementoInputMunicipio.classList.remove(estilosInformesManager['error']);
        }

        if(errores.length > 0){
            this.setState({
                errores: errores
            });
        }
        else {
            this.enviarSolicitudInforme(idTipoInmueble, idTipoContrato, municipio)
        }
    }

    cargarListadoInformes = () => {

        const opciones = {
            method: 'get',
            url: Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_INFORMES + Constantes.LISTADO_INFORMES_ENDPOINT,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
            }
        };

        axios(opciones)
            .then(async respuesta => {
                const body = await respuesta.data;
                
                this.setState({
                    informes: body.informes
                });

            })
            .catch(error => {
                console.log(error)
                console.log('Ocurrio un error al recuperar el listado de informes');
            });

    }

    enviarSolicitudInforme = (idTipoInmueble, idTipoContrato, municipio) => {

        const opciones = {
            method: 'post',
            url: Constantes.PROTOCOLO_ESTANDAR + "://" + Constantes.HOST_API + Constantes.RUTA_INFORMES + Constantes.SOLICITAR_INFORME_ENDPOINT,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${this.props.token}`
            },
            data: {
                idTipoContrato: parseInt(idTipoContrato),
                idTipoInmueble: parseInt(idTipoInmueble),
                municipio: municipio
            }
        };

        axios(opciones)
            .then(async respuesta => {
                const body = await respuesta.data;
                
                this.cerrarDialogoSolicitarInforme();
                this.cargarListadoInformes();

            })
            .catch(error => {
                console.log(error)
                console.log('Ocurrio un error al solicitar un informe');
            });

    }

    mostrarVentanaSolicitudInforme = () => {

        const clasesContenedorPrincipal = [estilosInformesManager['contenedor-principal']];

        const clasesTarjetaDialogo = [estilosInformesManager['tarjeta'], estilosInformesManager['contenedor-tarjeta']];
        const clasesContenedorOpcion = [estilosInformesManager['contenedor-opcion']];
        const clasesLabelSelectTipoInmueble = [estilosInformesManager['label-select-dialogo']];
        const clasesSelects = [estilosInformesManager['select-dialogo']];
        const clasesInputMunicipio = [estilosInformesManager['input-municipio']];
        const clasesContenedorOpcionesMunicipio = [estilosInformesManager['opciones-municipio'], estilosInformesManager['escondido']];
        const clasesBotonSolicitar = [estilosInformesManager['solicitar']];

        // En caso de haber tenido un error en algun campo lo marcaremos de rojo
        for(let i=0; i<this.state.errores.length; i++){
            let elemento = document.getElementById(this.state.errores[i])
            elemento.classList.add(estilosInformesManager['error'])
        }

        console.log(this.state.opcionesMunicipios)

        // Creamos los párrafos con los nombres de los municipios más parecidos al nombre escrito
        const opciones = [];
        for (let i=0; i<3; i++){
            let nombre = this.state.opcionesMunicipios[i];
            if(nombre != null){
                opciones.push(<p onClick={this.onMunicipioClickeado}>{nombre}</p>)
            }
        }

        // Mostramos los párrafos con los posibles municipios
        let elemOpcionesMunicipio = document.getElementById("opcionesMunicipio");
        if(elemOpcionesMunicipio != null && this.state.opcionesMunicipios.length > 0){
            elemOpcionesMunicipio.classList.remove(estilosInformesManager['escondido']);
        }

        return (
            <div id="blur" className={clasesContenedorPrincipal.join(' ')} onClick={this.cerrarDialogoSolicitarInforme}>
                <div className={clasesTarjetaDialogo.join(' ')}>

                    <div className={clasesContenedorOpcion.join(' ')}>
                        <p className={clasesLabelSelectTipoInmueble.join(' ')}>Selecciona el tipo de inmueble</p>
                        <select id="selectTipoInmueble" className={clasesSelects.join(' ')}>
                            <option value="0" selected>-Elija una opción-</option>
                            <option value="1">Vivienda</option>
                        </select>
                    </div>
                    
                    <div className={clasesContenedorOpcion.join(' ')}>
                        <p className={clasesLabelSelectTipoInmueble.join(' ')}>Selecciona el tipo de contrato</p>
                        <select id="selectTipoContrato" className={clasesSelects.join(' ')}>
                            <option value="0" selected>-Elija una opción-</option>
                            <option value="1">Compra</option>
                            <option value="2">Alquiler</option>
                        </select>
                    </div>

                    <div className={clasesContenedorOpcion.join(' ')}>
                        <p className={clasesLabelSelectTipoInmueble.join(' ')}>Introduzca el nombre del municipio</p>
                        <input id="inputMunicipio" className={clasesInputMunicipio.join(' ')} type="text" autoComplete="off" onChange={this.onMunicipioChange}/>
                        <p></p>
                        <div id="opcionesMunicipio" className={clasesContenedorOpcionesMunicipio.join(' ')}>
                            {opciones}
                        </div>
                    </div>            
                    
                    <button className={clasesBotonSolicitar.join(' ')} onClick={this.onComprobarDatosInforme}>Enviar solicitud</button>

                </div>
            </div>            
        );
    } 

    componentDidMount = () => {
        this.cargarListadoInformes();
    }

    render = () => {

        let fragmento = null;

        if(this.state.mostrarSolicitudInforme){
            fragmento = this.mostrarVentanaSolicitudInforme();
        }

        if(this.state.informes.length > 0){
            fragmento = <ListaInformes informes={this.state.informes} onSolicitarInforme={this.onSolicitarInforme} token={this.props.token}>{fragmento}</ListaInformes>
        }

        else {
            fragmento = <SinInformes onSolicitarInforme={this.onSolicitarInforme}>{fragmento}</SinInformes>
        }

        return fragmento;
    }
}

export default InformesManager;