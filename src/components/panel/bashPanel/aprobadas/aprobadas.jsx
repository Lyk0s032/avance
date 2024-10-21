import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';
import ItemAprobadas from './itemAprobadas';

export default function Aprobadas(props){
    const clients = props.clients;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.AxiosGetClients(false))
    },[])
    return (
        <div className='intentos'>
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Cotizaciones aprobadas <span> ({clients.aprobadas ? clients.aprobadas.length : 0 })</span></h3>
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Nro Cotización</th>
                                <th>Valor Bruto</th>
                                <th>Valor Neto</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients.aprobadas && clients.aprobadas.length ?
                                    clients.aprobadas.map((item, i) => {
                                        return (
                                            <ItemAprobadas key={i} item={item}  />
                                        )
                                    })
                                :null
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}