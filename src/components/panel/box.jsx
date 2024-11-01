import React from 'react';
import { MdCheckCircleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Box(props){
    const type = props.type;
    const usuario = props.user;
    const clients = props.clients;
    const navigate = useNavigate();

    let sumas = {
        IntentoUno: usuario.rango == 'asesor' ? 0 : clients.intentoOne.length ? clients.intentoOne.length : 0,
        IntentoDos: usuario.rango == 'asesor' ? 0 : clients.intentoTwo.length ? clients.intentoTwo.length : 0,
        IntentoTres: usuario.rango == 'asesor' ? 0 : clients.intentoThree.length ? clients.intentoThree.length : 0,
        contactoUno: clients.contactOne.length ? clients.contactOne.length : 0,
        contactoDos: clients.contactTwo.length ? clients.contactTwo.length : 0,
        contactoTres: clients.contactThree.length ? clients.contactThree.length : 0,
        visitas: clients.visitas.length ? clients.visitas.length : 0,
        cotizaciones: clients.cotizacion.length ? clients.cotizacion.length : 0,
        
    }
    return (
        <div className={usuario.rango == 'asesor' ? 'box Asesor' : 'box'} onClick={() => {
            type == 'Intentos' ?
                navigate('try')
            : type == 'Contacto' ?
                navigate('contacts')
            :type == 'Visita' ?
                navigate('visita')
            : type == 'Cotizaciones' ?
                navigate('Cotizaciones')
            : null
        }}>
            <div className='top'>
                <div className='info'>
                    <span>{type}</span>
                    <h3>
                        {
                            type == 'Intentos' ?
                                sumas.IntentoUno + sumas.IntentoDos + sumas.IntentoTres
                            : type == 'Contacto' ?
                                sumas.contactoUno + sumas.contactoDos + sumas.contactoTres
                            : type == 'Visita' ?
                                sumas.visitas
                            : sumas.cotizaciones
                        }
                    </h3>
                </div>

            </div>
            <div className="bottom">
                {
                    type == 'Intentos' || type == 'Contacto' ?
                    <nav>
                        <ul>
                            <li>
                                <div>
                                    <h3>
                                        {
                                            type == 'Intentos' ?
                                                sumas.IntentoUno
                                            : type == 'Contacto' ?
                                                sumas.contactoUno
                                            : 0
                                        }
                                    </h3>
                                    <span>Primero</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>
                                        {
                                            type == 'Intentos' ?
                                                sumas.IntentoDos
                                            : type == 'Contacto' ?
                                                sumas.contactoDos
                                            : 0
                                        }
                                    </h3>
                                    <span>Segundo</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>
                                        {
                                            type == 'Intentos' ?
                                                sumas.IntentoTres
                                            : type == 'Contacto' ?
                                                sumas.contactoTres
                                            : 0
                                        }
                                    </h3> 
                                    <span>Tercero</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                : null
                }
            </div>
        </div> 
    )
}