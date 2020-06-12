import React, { Component } from 'react';
import axios from 'axios';

import Informe from "./informe/Informe";

import Constantes from "utils/Constantes";

import estiloListaInformes from 'assets/sass/dashboard/informes/listaInformes/ListaInformes.module.css';

import mas from 'assets/images/mas.svg';

class ListaInformes extends Component {

    obtenerListadoInformes = () => {

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
                
                this.setState = {
                    informes: body.informes
                }

            })
            .catch(error => {
                console.log('Ocurrio un error al obtener el listdo de informes');
            });
    }

    componentDidMount = () => {
        
        // TODO Descomentar
        //this.obtenerListadoInformes();
    }

    render = () => {

        const informesParseados = this.props.informes.map((informe,indx) => {
            return (<Informe key={"informe" + indx} index={indx} informe={informe} token={this.props.token}/>);
        });

        const clasesContenedorPrincipal = [estiloListaInformes['contenedor-principal']];

        const clasesContenedorInformes = [estiloListaInformes['contenedor-informes']];

        const clasesBotonsSolicitarInforme = [estiloListaInformes['solicitar-informe']];

        return (
            <div className={clasesContenedorPrincipal.join(' ')}>

                <div className={clasesContenedorInformes.join(' ')}>
                    {informesParseados}
                </div>
                
                <div className={clasesBotonsSolicitarInforme.join(' ')} onClick={this.props.onSolicitarInforme}>
                    <img src={mas}/>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default ListaInformes;