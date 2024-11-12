import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import ItemVisitas from './itemVisitas';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';


export default function Visitas(props){
    const usuario = props.usuario;
    const dispatch = useDispatch();
    const visitas = useSelector(store => store.visitas);
    const loading = useSelector(store => store.loadingVisitas);

    
    useEffect(() => {
        usuario.rango == 'lider' ?
            dispatch(actions.AxiosGetVisitas())
        :
            dispatch(actions.AxiosGetVisitasByAsesor(true, usuario.id))

    },[])
    return (
        <div className='intentos'>
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Visitas <span>({visitas && visitas.length ? visitas.length : 0})</span></h3>
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Asesor</th>
                                <th>Fecha visita</th>
                                <th>Estado</th>

                            </tr>
                        </thead>
                            {
                                loading || !visitas ?
                                    <div className="loading">
                                        <h1>Cargando...</h1>
                                    </div>
                                :
                                <tbody>
                                    {
                                        visitas && visitas.length ?
                                            visitas.map((item, i) => {
                                                return (
                                                    <ItemVisitas  key={i+1} item={item} usuario={usuario}/> 
                                                    
                                                )
                                            })
                                        :null
                                    }
                                </tbody>
                            }
                            
                    </table>
                </div>
            </div>
        </div>
    )
}