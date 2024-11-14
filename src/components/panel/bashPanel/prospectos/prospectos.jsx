import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import * as actions from './../../../store/action/action';
import axios from 'axios';


export default function ProspectosComponent(){
    const [params, setParams] = useSearchParams();

    const dispatch = useDispatch();
    const leads = useSelector(store => store.leads);
    const loading = useSelector(store => store.loadingLeads);
    const [page, setPage] = useState(1);
    const [word, setWord] = useState(null);
    const [mistake, setMistake] = useState(null)

    const open = async (cliente, see) => {
        dispatch(actions.ActionGetCliente(cliente));
        params.set('w', 'action');

        if(cliente.state == 'intento 1' || cliente.state == 'intento 2' || cliente.state == 'intento 3'){
            params.set('y', 'Primer');
        }else if(cliente.state == 'contacto 1' || cliente.state == 'contacto 2' || cliente.state == 'contacto 3'){
            params.set('y', 'Segundo');
        }else if(cliente.state == 'visita'){
            params.set('y', 'Visita')
        }else if(cliente.state == 'cotizacion'){
            params.set('y', 'Cotizacion')
        }

        setParams(params);
    }

    const sendPage = async (val) => {
        if(page >= 1){
            setPage(page + val)    
            dispatch(actions.AxiosGetLeads(true, page))
        }else if(page == 0){
            setPage(page + 1)
        }
    }

    // Buscador
    const searchFunction = async (query, asesor) => {
        setPage(0);
        if(!query || query == '') return sendPage(1)

        axios.get(`/clients/get/searchClientsAll`, {
            params:{
                query: query,
                asesor: asesor ? asesor : null
            }
        })
        .then((res) => {
            console.log(res);
            if(res.status == 404){
                dispatch(actions.SearchClientLeads(404));
            }else{
                dispatch(actions.SearchClientLeads(res.data));
            }
        })
        .catch(err => {
            if(err.status == 404){
                setWord(query)
                dispatch(actions.SearchClientLeads(404));

            }else{
                console.log(err);
                setMistake('Error al buscar');
            }
            
        })
    }
    useEffect(() => {
        dispatch(actions.AxiosGetLeads(true, 1))
        
    }, [])    
    return (
        <div className="prospectosGeneral">
            <div className="containerGeneralProspectos">
                <div className="header">
                    <button onClick={() => {
                        params.delete('v');
                        setParams(params);
                    }}>
                        <MdClose className="icon" />
                    </button>
                </div>
                <div className="generalProjects">
                    <div className="search">
                        <input type="text" placeholder='Buscar prospecto' onChange={(e) => {
                            if(!e.target.value || e.target.value == '') sendPage(0)
                            setWord(e.target.value);
                            searchFunction(e.target.value)
                        }} />
                    </div>
                    <div className="listProspectsAll">
                        {
                            !leads || loading ?
                            <div className="loading">
                                <h1>Cargando...</h1>
                            </div>
                            :
                        <div className="containerLists">
                            {
                                leads && leads.length ?
                                    leads.map((lead, i) => {
                                        return (
                                            <div className="prospect" onClick={() => open(lead)} key={i+1}>
                                                <div className="numer">
                                                    <h3>{i+1}</h3>
                                                </div>
                                                <div className="data">
                                                    <h3 className='empresa'>{lead.nombreEmpresa}</h3>
                                                    <span className='persona'>{lead.name}</span><br />
                                                    <span className='persona'>{lead.phone}</span><br />
                                                    <strong className='state'>En {lead.state}</strong>
                                                </div>
                                                <div className="btn">
                                                    <button>
                                                        <AiOutlineArrowRight className="icon" />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                :
                                <div className="notFound">
                                    <h1>No hay resultados</h1>
                                </div>
                            }
                        </div>
                        }

                    </div>
                    {
                        word ? null :
                        <div className="pagination">
                            <div className="containerPagination">
                                <button onClick={() => sendPage(-1)}>
                                    <span>
                                        Anterior
                                    </span>
                                </button>
                                <span>
                                    {page}
                                </span>
                                <button onClick={() => sendPage(1)}>
                                    <span>Siguiente</span>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}