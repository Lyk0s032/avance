import axios from "axios";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import * as actions from './../../../../store/action/action';
import { useDispatch } from "react-redux";

export default function Search(){

    const [resultados, setResultados] = useState(null);
    const [mistake, setMistake] = useState(null);
    const [client, setClient] = useState(null);
    const [word, setWord] = useState(null);
    const dispatch = useDispatch();
    const searchFunction = async (query) => {
        if(!query || query == '') return null;

        axios.get(`/clients/get/searchClients`, {
            params:{
                query: query
            }
        })
        .then((res) => {
            console.log(res);
            if(res.status == 404){
                setResultados(404);
            }else{
                setResultados(res.data);
            }
        })
        .catch(err => {
            if(err.status == 404){
                setWord(query)
                setResultados(404)
            }else{
                console.log(err);
                setMistake('Error al buscar');
            }
            
        })
    }

    const selectClient = (cliente) => {
        if(cliente.id == client){
            setClient(null);
            dispatch(actions.GET_CLIENT_NEW_COTIZACION(null));

        }else{
            setClient(cliente.id);
            dispatch(actions.GET_CLIENT_NEW_COTIZACION(cliente));
        }
    }
    return (
        <div className="SearchContainer">
            <div className="containerSearch">
                <div className="headerInput">
                    <div className="Iinput">
                        <input type="text" placeholder="Buscar cliente" onChange={(e) => {
                            setMistake(null)
                            searchFunction(e.target.value)
                        }} />
                    </div>
                    <span>{mistake}</span>
                </div>

                <div className="containerResults">
                    <div className="containerScroll">
                        {   
                            resultados == 404 ?
                                <div className="notFound">
                                    <br /><br />
                                    <h1>No hemos encontrado resultados para <strong>{word}</strong></h1>
                                </div>
                            :resultados && resultados.length ? 
                                resultados.map((res, i) => {
                                    return (
                                        <div className={client == res.id ? 'result Active' : 'result'} onClick={() => {
                                            selectClient(res)
                                        }} key={i+1}>
                                            <div className="containerResult">
                                                <div className="numer">
                                                    <h3>
                                                        #{i+1}
                                                    </h3>
                                                </div>
                                                <div className="dataResult">
                                                    <div className="containerData">
                                                        <h3>{res.nombreEmpresa}</h3>
                                                    </div>
                                                </div>
                                                <button>
                                                    <AiOutlineArrowRight className="icon" />
                                                </button>
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            : <div className="notFound"><br /><br /><h1>Buscar por nombre de empresa</h1></div>
                        }
                        
                
                            
                    </div>
                </div>
            </div>
        </div>
    )
}