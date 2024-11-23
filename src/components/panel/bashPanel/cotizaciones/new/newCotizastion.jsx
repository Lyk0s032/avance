import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineArrowRight, AiOutlineLoading, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../../store/action/action';


export default function FormNewCotization(props){
    const usuario = props.usuario;
    const [iva, setIva] = useState(true)
    const [mistake, setMistake] = useState(null);
    const [sucessfull, setSuccesfull] = useState(false);
    const [loading, setLoading] = useState(false);
    const cl = useSelector(store => store.newCotizacion);
    const dispatch = useDispatch();

    const change = () => {
        setIva(!iva);
        console.log('entra');
    }

    const [time, setTime] = useState({
        dia: null,
        mes: null,
        ano: null
    });

    const [cotizacion, setCotizacion] = useState({
        nit: null,
        nroCotizacion:null,
        bruto:0,
        descuento:0,
        iva: 19,
        conDescuento: 0,
        neto: null,
    });

    // COTIZACION
    const registrarCotizacion = async () => {
        if(!cotizacion.nit || !cotizacion.nroCotizacion || !cotizacion.bruto) return setMistake('No puedes dejar campos vacios.');
        if(!time.dia || !time.mes || !time.ano) return setMistake('Selecciona una fecha valida.');
        setLoading(true);
        setMistake(null);

        const formulario = document.querySelector("#formulario");


        let brt = cotizacion.bruto; 
        let descuento = cotizacion.descuento;

        let valorConDescuento = Number(brt) - Number(descuento); 
        let valorConIva = valorConDescuento * (19 / 100); 
        let valorFinal = iva ? valorConDescuento + valorConIva : valorConDescuento;

        let body = {
            // CLIENTE
            nombreEmpresa: cl.nombreEmpresa,
            url: cl.url,
            fijo: cl.fijo,
            direccion: cl.direccion,
            cargo:cl.rangoEncargado,
            name: cl.name,
            phone: cl.phone,
            email: cl.email,
            fuenteId:1,
            userId: usuario.id,

            // COTIZACIÓN
            nit: cotizacion.nit,
            nro: cotizacion.nroCotizacion,
            fecha: `${time.mes}-${time.dia}-${time.ano}`,
            bruto: cotizacion.bruto,
            descuento: cotizacion.descuento,
            iva: iva ? cotizacion.iva : 0,
            neto:valorFinal
        }
        const send = await axios.post('/client/post/newAndCotizacion', body)
        .then((res) => {
            setLoading(false);
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetClients(false)) :  dispatch(actions.AxiosGetClientsByAsesor(false, usuario.id));
            usuario.range == 'lider' ? dispatch(actions.AxiosGetCotizaciones(false)) : dispatch(actions.AxiosGetCotizacionesByAsesor(false, usuario.id))
            setCotizacion({
                nit: null,
                nroCotizacion:null,
                bruto:0,
                descuento:0,
                iva: 19,
                conDescuento: 0,
                neto: null,
            })
            setTime({
                dia:null,
                mes:null,
                ano: null
            })
            setSuccesfull(true);
            const inputs = formulario.querySelectorAll("input");
            inputs.forEach(inpt => inpt.value = "");
        })
        .catch(err =>{
            setLoading(false);
            setMistake('Ha ocurrido un error');
            console.log(err);
            console.log('error');
        })
        return send;
    }
    return ( 
        <div className="form">
            {
                sucessfull ?
                    <div className="nubeMessage">
                        <div className="containerNube">
                            <div className="message">
                                <span>
                                    Cotización creada con éxito
                                </span>
                            </div>
                            <button onClick={() => setSuccesfull(false)}>
                                <MdClose className="icon" />
                            </button>
                        </div>
                    </div>
                : mistake ?
                    <div className="nubeMessage">
                        <div className="containerNube Mistake">
                            <div className="message">
                                <span>
                                    {mistake}
                                </span>
                            </div>
                            <button onClick={() => setMistake(null)}>
                                <MdClose className="icon" />
                            </button>
                        </div>
                    </div>
                : null
            }
            
            <div className="containerForm">
                <div className="titleHeader">
                    <h1>¡Perfecto, completemos la cotización!</h1>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                }} className='formData' id="formulario">
                    <div className="horizontal">
                        <div className="inputDiv">
                            <label htmlFor="">Nit</label><br />
                            <input type="text" placeholder='Escribe aquí...' onChange={(e) =>{
                                setCotizacion({
                                    ...cotizacion,
                                    nit: e.target.value
                                })
                            }} defaultValue={cotizacion.nit}
                            />
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="">Nro. Cotización {cotizacion.nroCotizacion}</label><br />
                            <input type="text" placeholder='Escribe aquí...' maxLength={5} onChange={(e) =>{
                                setCotizacion({
                                       ...cotizacion,
                                       nroCotizacion: e.target.value
                                   })
                               }
                            } value={cotizacion.nroCotizacion}/>
                        </div>
                    </div>
                    <div className="horizontal">
                        <div className="inputDiv">
                            <label htmlFor="">Valor Bruto {cotizacion.bruto ? `${new Intl.NumberFormat('es-CO', { currency:'COP'}).format(cotizacion.bruto)} COP` : null }</label><br />
                            <input type="text" placeholder='Escribe aquí...' onChange={async (e) =>{
                                setCotizacion({
                                    ...cotizacion,
                                    bruto: e.target.value.replace(/[^0-9]/g, '')
                                })
                            }} value={cotizacion.bruto}/>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="">Descuento {cotizacion.descuento ? `${new Intl.NumberFormat('es-CO', { currency:'COP'}).format(cotizacion.descuento)} COP` : null}</label><br />
                            <input type="text" placeholder='Escribe aquí...' onChange={(e) => {
                                setCotizacion({
                                    ...cotizacion,
                                    descuento: e.target.value.replace(/[^0-9]/g, '')
                                })
                            }} value={cotizacion.descuento}/>
                        </div>
                    </div>
                    <div className="inputDiv Check" onClick={() => change()}>
                        <input type="checkbox" checked={iva}/>
                        <label htmlFor="">Iva incluido</label>
                    </div>
                    <div className="inputDiv">
                        <label htmlFor="">Selecciona fecha de seguimiento</label><br />
                        <input type="date" placeholder='Escribe aquí...' onChange={(e) => {
                            setTime({
                                ...time,
                                dia: e.target.value.split('-')[2],
                                mes: e.target.value.split('-')[1],
                                ano: e.target.value.split('-')[0],
                            });
                        }}/>
                    </div>
                    <div className="inputDiv">
                        {
                            loading ?
                            <button className='loading'>
                                <span>Creando...</span>
                            </button>
                            :
                            <button className='create' onClick={() => {
                                registrarCotizacion();
                            }}>
                                <span>Crear cotización</span>
                                <AiOutlineArrowRight className='icon' />
                            </button>
                        }

                    </div>
                </form>
            </div>
        </div>
    )
}