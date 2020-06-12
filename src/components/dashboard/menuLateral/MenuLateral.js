import React, { Component } from 'react';

import SinNotificaciones from 'assets/images/sin-notificaciones.svg';
import NotificacionesPendientes from 'assets/images/notificaciones-pendientes.svg';

import 'bulma/css/bulma.min.css';
import menuLateralStyles from '../../../assets/sass/dashboard/menuLateral/MenuLateral.module.css';

class MenuLateral extends Component {

    constructor(props){
        super(props)

        this.state = {
            ultimoClickeado: null
        }
    }

    itemClickeado = async (event) => {

        let elemento = event.target;

        // Solo cambiamos las clases a los divs)
        while(elemento.tagName !== 'DIV'){
            elemento = elemento.parentElement;
        }

        // Cambiamos el fondo del item seleccionado
        if(this.state.ultimoClickeado != null){
            const numeroDeClases = this.state.ultimoClickeado.classList.length;
            const ultimaClase = this.state.ultimoClickeado.classList[numeroDeClases - 1];
            this.state.ultimoClickeado.classList.remove(ultimaClase);
        }

        // Por defecto el primer item seleccionado es "Informes"
        else {
            const temp = document.getElementById('informes');
            const numeroDeClases = temp.classList.length;
            const ultimaClase = temp.classList[numeroDeClases - 1];
            temp.classList.remove(ultimaClase);
        }

        elemento.classList.add(menuLateralStyles['opcion-seleccionada'])

        await this.setState({
            ultimoClickeado: elemento
        })
        
        this.props.onOptionSelected(elemento.id)
    }

    render = () => {

        /* Parte superior */
        let clasesContenedorMenu = ["column", "is-one-quarter-desktop", "is-one-fifth-widescreen", "is-paddingless", "is-marginless", menuLateralStyles['menu-lateral']];
        let clasesContenedorSuperior = [menuLateralStyles['contenedor-parte-superior']];

        let clasesContenedorTituloMenu = [menuLateralStyles['titulo-menu']];

        let clasesContenedorOpcion = [menuLateralStyles['opcion']];
        let clasesTextoOpcion = [menuLateralStyles['texto-opcion']];
        let clasesImagenes = [menuLateralStyles['icono']];
        /* ------------- */

        /* Parte inferior*/
        let clasesContenedorInferior = [menuLateralStyles['contenedor-parte-inferior']];
        let clasesContenedorLogout = [...clasesContenedorOpcion, menuLateralStyles['contenedor-logout']];
        /* ------------- */

        return (
            <div className={clasesContenedorMenu.join(' ')}>
                <div className={clasesContenedorSuperior.join(' ')}>

                    <div className={clasesContenedorTituloMenu.join(' ')}>
                        <p className={clasesTextoOpcion.join(' ')}>Menú</p>
                    </div>

                    <div id="informes" className={[...clasesContenedorOpcion, menuLateralStyles['opcion-seleccionada']].join(' ')} onClick={this.itemClickeado}>
                        <svg className={clasesImagenes.join(' ')} version="1.1" id="Capa_1" x="0px" y="0px"
                            viewBox="0 0 367.6 367.6">
                            <g>
                                <g>
                                    <g>
                                        <path d="M328.6,81.6c-0.4,0-0.4-0.4-0.8-0.8c-0.4-0.4-0.4-0.8-0.8-1.2L258.2,2.4c-0.4-0.4-1.2-0.8-1.6-1.2
                                            c-0.4,0-0.4-0.4-0.8-0.4c-0.8-0.4-2-0.8-3.2-0.8H83.8C59,0,38.6,20.4,38.6,45.2v277.2c0,24.8,20.4,45.2,45.2,45.2h200
                                            c24.8,0,45.2-20.4,45.2-45.2v-238C329,83.6,328.6,82.4,328.6,81.6z M260.2,27.2l44.4,50h-44.4V27.2z M313.8,322
                                            c0,16.8-13.2,30.4-30,30.4h-200c-16.8,0-30-13.6-30-30V44.8c0-16.8,13.6-30,30-30H245v69.6c0,4,3.2,7.6,7.6,7.6h61.2V322z"/>
                                        <path d="M92.6,92h66.8c4,0,7.6-3.2,7.6-7.6s-3.2-7.6-7.6-7.6H92.6c-4,0-7.6,3.2-7.6,7.6S88.6,92,92.6,92z"/>
                                        <path d="M159.4,275.6H92.6c-4,0-7.6,3.2-7.6,7.6c0,4,3.2,7.6,7.6,7.6h66.8c4,0,7.6-3.2,7.6-7.6
                                            C167,279.2,163.4,275.6,159.4,275.6z"/>
                                        <path d="M85,134.8c0,4,3.2,7.6,7.6,7.6H271c4,0,7.6-3.2,7.6-7.6c0-4-3.2-7.6-7.6-7.6H92.6C88.6,127.2,85,130.4,85,134.8z"/>
                                        <path d="M271,164.8H92.6c-4,0-7.6,3.2-7.6,7.6c0,4,3.2,7.6,7.6,7.6H271c4,0,7.6-3.2,7.6-7.6C278.6,168,275.4,164.8,271,164.8z"/>
                                        <path d="M271,202H92.6c-4,0-7.6,3.2-7.6,7.6c0,4,3.2,7.6,7.6,7.6H271c4,0,7.6-3.2,7.6-7.6C278.6,205.2,275.4,202,271,202z"/>
                                        <path d="M271,239.2H92.6c-4,0-7.6,3.2-7.6,7.6c0,4,3.2,7.6,7.6,7.6H271c4,0,7.6-3.2,7.6-7.6C278.6,242.8,275.4,239.2,271,239.2z"
                                            />
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <p className={clasesTextoOpcion.join(' ')}>Informes</p>
                    </div>
                    <div id="grupos" className={clasesContenedorOpcion.join(' ')} onClick={this.itemClickeado}>
                        <svg className={clasesImagenes.join(' ')} id="Capa_1" viewBox="0 0 551.132 551.132"><g><path d="m525.97 357.643c-46.33-26.637-99.039-41.794-153.635-45.853 11.183 5.004 22.433 9.894 33.024 15.982 12.314 7.087 22.187 17.315 29.448 29.181 25.95 7.207 50.903 17.275 74.023 30.56 4.844 2.792 7.855 8.393 7.855 14.633v80.093h-68.891v34.446h86.114c9.52 0 17.223-7.703 17.223-17.223v-97.316c.001-18.551-9.653-35.605-25.161-44.503z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m388.187 357.643c-108.416-62.332-254.608-62.332-363.026 0-15.524 8.931-25.161 25.969-25.161 44.504v97.316c0 9.52 7.703 17.223 17.223 17.223h378.902c9.52 0 17.223-7.703 17.223-17.223v-97.333c0-18.518-9.637-35.556-25.161-44.487zm-9.284 124.597h-344.456v-80.093c0-6.24 3.011-11.841 7.871-14.633 98.022-56.344 230.692-56.344 328.714 0 4.861 2.792 7.871 8.393 7.871 14.616z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m335.881 69.701c2.857-.299 5.687-.809 8.578-.809 47.481 0 86.114 38.634 86.114 86.114s-38.634 86.114-86.114 86.114c-2.889 0-5.719-.513-8.576-.812-7.308 11.035-16.254 20.732-26.065 29.549 11.216 3.454 22.79 5.708 34.641 5.708 66.469 0 120.56-54.09 120.56-120.56s-54.09-120.56-120.56-120.56c-11.853 0-23.427 2.254-34.643 5.708 9.811 8.819 18.757 18.513 26.065 29.548z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m206.676 275.566c66.469 0 120.56-54.09 120.56-120.56s-54.09-120.56-120.56-120.56-120.56 54.09-120.56 120.56 54.091 120.56 120.56 120.56zm0-206.674c47.481 0 86.114 38.634 86.114 86.114s-38.634 86.114-86.114 86.114-86.114-38.634-86.114-86.114 38.634-86.114 86.114-86.114z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/></g> </svg>
                        <p className={clasesTextoOpcion.join(' ')}>Grupo</p>
                    </div>
                    <div id="notificaciones" className={clasesContenedorOpcion.join(' ')} onClick={this.itemClickeado}>
                        <img className={clasesImagenes.join(' ')} src={this.props.hayNotificacionesPendientes ? NotificacionesPendientes : SinNotificaciones}/>
                        <p className={clasesTextoOpcion.join(' ')}>Notificaciones</p>
                    </div>

                </div>
                <div className={clasesContenedorInferior.join(' ')}>

                    <div id="logout" className={clasesContenedorLogout.join(' ')} onClick={this.itemClickeado}>
                        <svg className={clasesImagenes.join(' ')} viewBox="0 0 512.016 512"><g><path d="m496 240.007812h-202.667969c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16 0 8.832032-7.167969 16-16 16zm0 0" data-original="#000000" class="hovered-path active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m416 320.007812c-4.097656 0-8.191406-1.558593-11.308594-4.691406-6.25-6.253906-6.25-16.386718 0-22.636718l68.695313-68.691407-68.695313-68.695312c-6.25-6.25-6.25-16.382813 0-22.632813 6.253906-6.253906 16.386719-6.253906 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.632813l-80 80c-3.136719 3.15625-7.230469 4.714843-11.328125 4.714843zm0 0" data-original="#000000" class="hovered-path active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m170.667969 512.007812c-4.566407 0-8.898438-.640624-13.226563-1.984374l-128.386718-42.773438c-17.46875-6.101562-29.054688-22.378906-29.054688-40.574219v-384c0-23.53125 19.136719-42.6679685 42.667969-42.6679685 4.5625 0 8.894531.6406255 13.226562 1.9843755l128.382813 42.773437c17.472656 6.101563 29.054687 22.378906 29.054687 40.574219v384c0 23.53125-19.132812 42.667968-42.664062 42.667968zm-128-480c-5.867188 0-10.667969 4.800782-10.667969 10.667969v384c0 4.542969 3.050781 8.765625 7.402344 10.28125l127.785156 42.582031c.917969.296876 2.113281.46875 3.480469.46875 5.867187 0 10.664062-4.800781 10.664062-10.667968v-384c0-4.542969-3.050781-8.765625-7.402343-10.28125l-127.785157-42.582032c-.917969-.296874-2.113281-.46875-3.476562-.46875zm0 0" data-original="#000000" class="hovered-path active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m325.332031 170.675781c-8.832031 0-16-7.167969-16-16v-96c0-14.699219-11.964843-26.667969-26.664062-26.667969h-240c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-15.9999995 16-15.9999995h240c32.363281 0 58.664062 26.3046875 58.664062 58.6679685v96c0 8.832031-7.167969 16-16 16zm0 0" data-original="#000000" class="hovered-path active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m282.667969 448.007812h-85.335938c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h85.335938c14.699219 0 26.664062-11.96875 26.664062-26.667968v-96c0-8.832032 7.167969-16 16-16s16 7.167968 16 16v96c0 32.363281-26.300781 58.667968-58.664062 58.667968zm0 0" fill="#FFFFFF"/></g> </svg>
                        <p className={clasesTextoOpcion.join(' ')}>Logout</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default MenuLateral;