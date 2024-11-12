import axios from 'axios';
import React, { useState } from 'react';
import { BsPlus, BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import * as actions from './../../../store/action/action';
import { useDispatch } from 'react-redux';
import { MdCheckCircleOutline, MdMoreTime, MdOutlineCancel } from 'react-icons/md';

export default function ItemCotizaciones(props){
    const item = props.item;
    const usuario = props.usuario;
    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();
    const [move, setMove] = useState(false);

    // Aprobar o perder cotacion
    const sendCotization = async(enter) => {
        let body = {
            clientId: item.id,
            cotizacionId: item.cotizacions && item.cotizacions.length ? item.cotizacions[0].id : null,
            stateEnter: enter
        }
        let send = await axios.put('/cotizacion/put/cambiarEstado', body)
        .then((res) => {
            usuario.range == 'lider' ? dispatch(actions.AxiosGetCotizaciones(false)) : dispatch(actions.AxiosGetCotizacionesByAsesor(false, usuario.id))
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetClients(false)) :  dispatch(actions.AxiosGetClientsByAsesor(false, usuario.id));
            
            setMove(true);
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        return send;
    }
    // Aplazar contización
    const aplazarCotizacion = async() => {
        let body = {
            clientId: item.id,
            cotizacionId: item.cotizacions && item.cotizacions.length ? item.cotizacions[0].id : null,
        }
        let send = await axios.put('/cotizacion/put/aplazarEstado', body)
        .then((res) => {
            usuario.range == 'lider' ? dispatch(actions.AxiosGetCotizaciones(false)) : dispatch(actions.AxiosGetCotizacionesByAsesor(false, usuario.id))
            setMove(true);
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        console.log(body)
        return send;
    }

    return (
        <tr>
            <td>
                <div className='prospectProfile'>
                    <h3>{item.nombreEmpresa}</h3>
                    <span>{item.phone}</span>
                </div>
            </td>
            <td>
                <div className='val'>
                    <div className="part">
                        <span>Nro: </span>
                        <h3 className="nro">
                            { item.cotizacions && item.cotizacions.length ? item.cotizacions[0].nro : null}
                        </h3>
                    </div>
                    <div className="part">
                        <span>Fecha: </span>
                        <h3 className="nro">
                            { item.cotizacions && item.cotizacions.length ? item.cotizacions[0].fecha : null}
                        </h3>
                    </div>
                    <div className="part">
                        <span>Descuento: </span>
                        <h3 className="nro">
                           {item.cotizacions && item.cotizacions.length ?`${new Intl.NumberFormat('es-CO', {currency:'COP'}).format(item.cotizacions[0].descuento)} COP` : null}
                        </h3>
                    </div>
                    <div className="part">
                        <span>V. Bruto: </span>
                        <h3 className="bruto">
                           {item.cotizacions && item.cotizacions.length ? new Intl.NumberFormat('es-CO', {currency:'COP'}).format(item.cotizacions[0].bruto) + ' COP' : null}
                        </h3>
                    </div>

                    <div className="part">
                        <span>V. Neto: </span>
                        <h3 className="neto">
                           {item.cotizacions && item.cotizacions.length ?  new Intl.NumberFormat('es-CO', { currency:'COP'}).format(item.cotizacions[0].neto) + ' COP' : null}
                        </h3>
                    </div>
                </div>
            </td>

            <td>
                <div className="val">
                    <div className="partCoti">
                        <h1>Pendiente</h1>
                    </div>
                    {
                        item.cotizacions && item.cotizacions.length ?
                            item.cotizacions[0].state == 'aplazada' ?
                            <div className='partCoti'>
                                <h4>
                                    Aplazada
                                </h4>
                                <span>
                                    Próximo: 
                                    
                                    {
                                        item.calendarios && item.calendarios.length ?
                                            item.calendarios.find(calendario => calendario.type == 'Cotizacion aplazada') ?
                                                ` ${item.calendarios.find(calendario => calendario.type == 'Cotizacion aplazada').fecha}`
                                            : 'Sin definir'
                                        :null
                                    }
                                </span>

                            </div>
                        :null
                        :
                        null
                    }
                    

                </div>                
            </td>
            <td>
                <div className='options'>
                    {
                        !move ?
                        <div className='action' onClick={() => setMove(!move)}>
                            <button className='see'>
                                <BsPlus className='icon' />
                            </button>
                        </div>
                        :
                        <div className='cotiOptions'>
                            <button onClick={() => sendCotization('perdida')}> 
                                <MdOutlineCancel className='icon Cancel' /><br />
                                <span className='Cancel'>Perdida</span>
                            </button>
                            <button onClick={() => sendCotization('aprobada')}>
                                <MdCheckCircleOutline className="icon Check" /><br />
                                <span className='Check'>Aprobar</span> 
                            </button>
                            <button onClick={() => aplazarCotizacion()}>
                                <MdMoreTime className="icon Time" /><br />
                                <span >Aplazar</span>
                            </button>
                        </div>
                    }
                    
                </div>
            </td>
        </tr>
    )
}