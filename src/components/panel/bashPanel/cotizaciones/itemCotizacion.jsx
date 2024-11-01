import axios from 'axios';
import React, { useState } from 'react';
import { BsPlus, BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import * as actions from './../../../store/action/action';
import { useDispatch } from 'react-redux';

export default function ItemCotizaciones(props){
    const item = props.item;

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
            dispatch(actions.AxiosGetCotizaciones(false))
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
            cotizationId: item.cotizations && item.cotizations.length ? item.cotizations[0].id : null,
        }
        let send = await axios.put('/cotizacion/put/aplazarEstado', body)
        .then((res) => {
            dispatch(actions.AxiosGetCotizaciones(false))
            setMove(true);
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
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
                    <h3>
                        {
                            item.cotizacions && item.cotizacions.length ?
                                item.cotizacions[0].nro

                            :null
                        }
                    </h3>
                </div>
            </td>
            <td>
                <div className="val">
                    <h3>
                        {
                            item.cotizacions && item.cotizacions.length ?
                                `${item.cotizacions[0].descuento}%`
                            :null
                        }
                    </h3>
                </div>
            </td>
            <td>
                <div className='val'>
                    <h3>
                        {
                            item.cotizacions && item.cotizacions.length ?
                                new Intl.NumberFormat('es-CO', {style: 'currency', currency:'COP'}).format(item.cotizacions[0].bruto) + ' COP'

                            :null
                        } </h3>
                </div>
            </td>
            <td>
                <div className='val'>
                    <h3>
                        {
                            item.cotizacions && item.cotizacions.length ?
                                new Intl.NumberFormat('es-CO', {style: 'currency', currency:'COP'}).format(item.cotizacions[0].neto) + ' COP'


                            :null
                        } 
                    </h3>
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
                        <div>
                            <button onClick={() => sendCotization('perdida')}> 
                                <span>Perdida</span>
                            </button>
                            <button onClick={() => sendCotization('aprobada')}>
                                <span>Aprobada</span>
                            </button>
                            <button onClick={() => aplazarCotizacion()}>
                                <span>Aplazar</span>
                            </button>
                        </div>
                    }
                    
                </div>
            </td>
        </tr>
    )
}