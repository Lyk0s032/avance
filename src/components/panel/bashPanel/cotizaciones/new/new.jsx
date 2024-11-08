import React, { useEffect, useState }  from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import Search from "./search";
import FormNewCotization from "./newCotizastion";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from './../../../../store/action/action';

export default function NewCotizacion(props){
    const usuario = props.usuario;
    const [params, setParams] = useSearchParams();
    const [parte, setParte] = useState('search');

    const dispatch = useDispatch();
    const cl = useSelector(store => store.newCotizacion);


    useEffect(() => {
        dispatch(actions.GET_CLIENT_NEW_COTIZACION(null))
    }, [])
    return (
        <div className="modalNewCotizacion">
            <div className="containerCotizacion">
                <div className="header">
                    <div className="title">
                        <h3>Nueva cotización</h3>
                    </div>
                    <button onClick={() => {
                        params.delete('w');
                        setParams(params);
                    }}>
                        <MdClose className="icon" />
                    </button>
                </div>
                <div className="containerNewCotization">
                    <div className="containerBox">
                        <div className="leftInfo">
                            {
                                !cl ?
                                <div className="containerLeftInfo">
                                    <div className="chooseAClient">
                                        <h1>Selecciona un cliente</h1>
                                    </div>
                                </div>
                                :
                            
                            <div className="containerLeftInfo">
                                <div className="top">
                                    <div className="circle">
                                        <h1>{cl.nombreEmpresa.split('')[0]}</h1>
                                        <h3>{cl.nombreEmpresa}</h3>
                                        <h4>{cl.phone}</h4>
                                    </div>
                                </div>
                                <div className="fichaTecnica">
                                    <div className="containerFicha">
                                        <div className="item">
                                            <h3>Encargado</h3>
                                            <span>{cl.name}</span>
                                        </div>
                                        <div className="item">
                                            <h3>Dirección</h3>
                                            <span>{cl.direccion}</span>
                                        </div>
                                        <div className="item">
                                            <h3>Fijo</h3>
                                            <span>{cl.fijo}</span>
                                        </div>
                                    </div>
                                </div>                            
                            </div> 
                            }
                        </div>
                        <div className="rightDiv">
                            <div className="containerRightDiv" >
                                <div className="Pantallax" id="one">
                                    <Search />
                                </div>
                                <div className="Pantallax" id="two">
                                    <FormNewCotization usuario={usuario} />
                                </div>
                            </div>
                            <div className="bottomAvance">
                                <div className="btn">
                                    {
                                        !parte || parte == 'search' ?
                                            <div className="choose">
                                                {
                                                    !cl ?
                                                        <button className="avance Inactive">
                                                            <span>Avanzar</span>
                                                            <AiOutlineArrowRight className="icon" />
                                                        </button>
                                                    :
                                                        <button className="avance Active" onClick={() =>{
                                                            setParte('create')
                                                            document.querySelector("#two").scrollIntoView({
                                                                behavior:'smooth'
                                                            })
                                                        }}>
                                                            <span>Avanzar</span>
                                                            <AiOutlineArrowRight className="icon" />
                                                        </button>
                                                }
                                                
                                            </div>
                                        : parte == 'create' ?
                                            <div className="choose">
                                                <button className="back" onClick={() =>{
                                                    setParte('search')
                                                    document.querySelector("#one").scrollIntoView({
                                                        behavior:'smooth'
                                                        })
                                                    }}>
                                                    <span>Regresar</span>
                                                </button>
                                            </div>
                                        :null

                                    }
    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}