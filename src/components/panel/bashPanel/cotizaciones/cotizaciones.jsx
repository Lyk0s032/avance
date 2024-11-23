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

    const [query, setQuery] = useState("");
    const [resultados, setResultados] = useState(null);

    const handlerSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setQuery(query);

        const filtered = cotizaciones.filter((registro) => 
            registro.nombreEmpresa.toLowerCase().includes(query) || 
            registro.cotizacions[0].nro.toLowerCase().includes(query)
        )

        setResultados(filtered);
    }
    console.log(cotizaciones)
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
                        <div className="forSearch">
                            <h3>Cotizaciones {cotizaciones && cotizaciones.length ? cotizaciones.length : 0} </h3> 
                            
                            <div className="searchInput">
                                <input type="text" 
                                placeholder='Buscar cotización aquí' 
                                onChange={(e) => handlerSearch(e)}/>
                            </div>
                        </div>                   
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
                                query ?
                                    resultados && resultados.length ?
                                        resultados.map((r, i) => {
                                            return (
                                                <ItemCotizaciones key={i} item={r} usuario={usuario} />
                                            )
                                        })
                                    : <div className="notFound">
                                        <h1>No hemos encontrado resultados para <strong>{query}</strong></h1>
                                    </div>
                                
                                :

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