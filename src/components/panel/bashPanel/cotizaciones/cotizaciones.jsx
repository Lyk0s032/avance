import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import ItemCotizaciones from './itemCotizacion';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';

export default function Cotizaciones(props){
    const usuario = props.usuario;
    const dispatch = useDispatch();
    const cotizaciones = useSelector(store => store.cotizaciones);
    const loading = useSelector(store => store.loadingCotizaciones);

    
    useEffect(() => {
    usuario.rango == 'lider' ?
        dispatch(actions.AxiosGetCotizaciones(true))
    :
        dispatch(actions.AxiosGetCotizacionesByAsesor(true, usuario.id))

    },[])
    return (
        <div className='intentos'>
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Cotizaciones pendientes <span> (3)</span></h3>
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Nro Cotización</th>
                                <th>Desc. (%)</th>
                                <th>V. Bruto</th>
                                <th>V. Neto</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading || !cotizaciones ?
                                    <h1>Cargando...</h1>
                                :
                                cotizaciones && cotizaciones.length ?
                                    cotizaciones.map((item, i) => {
                                        return (
                                            <ItemCotizaciones key={i} item={item}  />
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