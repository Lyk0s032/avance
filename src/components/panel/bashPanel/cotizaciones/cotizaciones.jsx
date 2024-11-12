import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import ItemCotizaciones from './itemCotizacion';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';
import { useSearchParams } from 'react-router-dom';
import NewCotizacion from './new/new';

export default function Cotizaciones(props){
    const usuario = props.usuario;
    const dispatch = useDispatch();
    const cotizaciones = useSelector(store => store.cotizaciones);
    const loading = useSelector(store => store.loadingCotizaciones);

    const [params, setParams] = useSearchParams();


    useEffect(() => {
    usuario.rango == 'lider' ?
        dispatch(actions.AxiosGetCotizaciones(true))
    :
        dispatch(actions.AxiosGetCotizacionesByAsesor(true, usuario.id))

    },[])
    return (
        <div className='intentos'>
            {
                params.get('w') && params.get('w') == 'newCotizacion' && usuario.rango == 'asesor' ? <NewCotizacion usuario={usuario} /> : null
            }
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Cotizaciones pendientes </h3>                    
                    </div>
                    <div className="btn">
                        {
                            usuario.rango == 'asesor' ?
                            <button className="nuevaCotizacion" onClick={() => {
                                params.set('w', 'newCotizacion');
                                setParams(params);
                            }}>
                                <span>Nueva cotización + </span>
                            </button>
                            :null
                        }
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Detalles Cotización</th>
                                <th>Estado</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading || !cotizaciones ?
                                    <div className="loading">
                                        <h1>Cargando...</h1>
                                    </div>
                                :
                                cotizaciones && cotizaciones.length ?
                                    cotizaciones.map((item, i) => {
                                        return (
                                            <ItemCotizaciones key={i} item={item} usuario={usuario} />
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