import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';
import ItemAprobadas from './itemAprobadas';

export default function Aprobadas(props){
    const dispatch = useDispatch();


    const usuario = props.usuario;
    const clients = props.clients;

    const aprobadas = useSelector(store => store.aprobadas);
    const loading = useSelector(store => store.loadingAprobadas);

    useEffect(() => {
        usuario.rango == 'lider' ?
            dispatch(actions.AxiosGetAprobadas(false))
        :
            dispatch(actions.AxiosGetAprobadasByAsesor(false, usuario.id))

    },[])
    return (
        <div className='intentos'>
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Cotizaciones aprobadas <span> ({aprobadas ? aprobadas.length : 0 })</span></h3>
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Detalles cotización</th>
                                <th>Estado</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                !aprobadas || loading ?
                                    <div className="loading">
                                        <h1>Cargando</h1>
                                    </div>
                                :
                                aprobadas && aprobadas.length ?
                                    aprobadas.map((item, i) => {
                                        return (
                                            <ItemAprobadas key={i} usuario={usuario} item={item}  />
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