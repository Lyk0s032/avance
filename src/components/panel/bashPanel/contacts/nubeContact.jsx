import React, { useEffect, useState } from 'react';
import * as actions from './../../../store/action/action';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function NubeContacto(props){
    const item = props.item;
    const [call, setCall] = useState('question');
    const dispatch = useDispatch();

    const [time, setTime] = useState({
        dia: null,
        mes: null,
        ano: null
    });
    const [tags, setTags] = useState(['']);
    const [interes, setInteres] = useState({
        asesor: 1,
        dia: null,
        mes: null,
        ano: null,
        nombreEmpresa: null,
        responsable: item.name,
        sector: 'general',
        cargo: null,
    });

    const [cotizacion, setCotizacion] = useState({
        nit: null,
        nroCotizacion:null,
        bruto:null,
        descuento:null,
        iva: 19,
        neto: null,
    })
    // No contesto
    const dontCall = async () => {
        let body = {
            clientId: item.id
        }
        const send = await axios.put('/contacto/put/dontCall', body)
        .then((res) => {
            dispatch(actions.AxiosGetContactos(false))
        })
        .catch(err => {
            console.log(err);
            console.log('error');
        })
        return send
    }

    // Después
    const laterCall = async () => {
        let body = {
            time: `${time.mes}-${time.dia}-${time.ano}`,
            clientId: item.id
        }
        const send = await axios.put('/contacto/put/contestoPeroLlamarLuego', body)
        .then((res) => {
            dispatch(actions.AxiosGetContactos(false))
            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            })
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        return send;
    }

    // No tiene interés
    const notInteres = async (stateNew) => {
        let body = {
            tag: tags,
            clientId: item.id,
            newState: stateNew
        }
        const send = await axios.put('/contacto/put/contestoPeroSinInteres', body)
        .then((res) => {
            dispatch(actions.AxiosGetContactos(false))
            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            })
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        return send;
    }

    // Programar visita
    const programarVisita = async () => {
        let body = {
            time: `${time.mes}-${time.dia}-${time.ano}`,
            clientId: item.id,
            estado: 'visita'
        }
        const send = await axios.put('/contacto/put/contestoYTieneInteresRealContacto', body)
        .then((res) => {
            dispatch(actions.AxiosGetContactos(false))
            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            })
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        return send;
    }
    // COTIZACION
    const registrarCotizacion = async () => {
        let brt = cotizacion.bruto; 
        let descuento = cotizacion.descuento;

        let valorConDescuento = Number(brt) * Number((1 - descuento / 100)); 
        let valorConIva = valorConDescuento * (19 / 100);

        let valorFinal = valorConDescuento + valorConIva;

        let body = {
            time: `${time.mes}-${time.dia}-${time.ano}`,
            clientId: item.id,
            estado: 'cotizacion',
            nit: cotizacion.nit,
            nro: cotizacion.nroCotizacion,
            fecha: `${time.mes}-${time.dia}-${time.ano}`,
            bruto: cotizacion.bruto,
            descuento: cotizacion.descuento,
            iva: cotizacion.iva,
            neto:valorFinal
        }
        const send = await axios.put('/contacto/put/contestoYTieneInteresRealContacto', body)
        .then((res) => {
            dispatch(actions.AxiosGetContactos(false))
            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            })
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        return send;
    }


    return (
            <div className='formCall'>
                {
                    call == 'question' ?
                        <div className='question'>
                            <div className='containerQuestion'>
                                <button className='true' onClick={() => setCall('contesto')}>
                                    <span>Contesto</span>
                                </button><br />
                                <button className='false' onClick={() => dontCall()}>
                                    <span>No contesto</span>
                                </button><br />
                                <button className='false' onClick={() => setCall('later')}>
                                    <span>Contactar después</span>
                                </button>

                            </div>
                        </div>
                    : call == 'contesto' ?
                        <div className='contesto'>
                            <div className='containerContesto'>
                                <div className='title'>
                                    <h1>¡Perfecto! ¿Esta interesado?</h1>
                                </div>
                                <div className='optionsTrue'>
                                    <button className='true' onClick={() => {
                                        setCall('interesado')
                                    }}>
                                        <span>¡Claro!</span>
                                    </button><br />
                                    <button className='false' onClick={() => setCall('nointeresado')}>
                                        <span>No</span>
                                    </button><br />

                                    
                                </div>
                            </div>
                        </div>
                    : call == 'interesado' ?
                        <div className='contesto'>
                            <div className="containerContesto">
                                <div className="title">
                                    <h1>Genial, ¿Quiere una visita o cotización?</h1>
                                </div>
                                
                                <div className='callOrGo'>
                                    <button className='call' onClick={() => setCall('visita')}>
                                        <span>Visita</span>
                                    </button>
                                    <button className='go' onClick={() => setCall('cotizacion')}>
                                        <span>Cotización</span>
                                    </button>
                                </div>
                            </div>                        
                        </div>
                    : call == 'visita' ?
                        <div className='contesto'>
                            <div className="containerContesto">
                                <div className="title">
                                    <h1>Perfecto, agendemos la visita</h1>
                                </div>
                               
                                <div className='time'>
                                    <label htmlFor="">Programar fecha</label>
                                    <div className="three">
                                        <input type="text" placeholder='Año' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                ano: e.target.value
                                            })
                                        }}/>
                                        <input type="text" placeholder='Mes' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                mes: e.target.value
                                            })
                                        }}/>
                                        
                                        <input type="text" placeholder='Día' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                dia: e.target.value
                                            })
                                        }}/>
                                    </div>
                                </div>
                                <div className='callOrGo'>
                                    <button className='go' onClick={() => programarVisita()}>
                                        <span>Agentar</span>
                                    </button>
                                </div>
                            </div>                        
                        </div>
                    : call == 'cotizacion' ?
                        <div className='contesto'>
                            <div className="containerContesto">
                                <div className="title">
                                    <h1>Perfecto, Sigamos la cotización</h1>
                                </div>
                               
                                <div className='time'>
                                    <div className='cotizacion'>
                                        <div className="input">
                                            <label htmlFor="">Nit {cotizacion.nit}</label>
                                            <input type="text" placeholder="Escribe aquí..."  onChange={(e) =>{
                                                setCotizacion({
                                                    ...cotizacion,
                                                    nit: e.target.value
                                                })
                                            }} defaultValue={cotizacion.nit}/>
                                        </div>
                                        <div className="input">
                                            <label htmlFor="">Nro. Cotización {cotizacion.nroCotizacion}</label>
                                            <input type="text" placeholder="Escribe aquí..." onChange={(e) =>{
                                                setCotizacion({
                                                    ...cotizacion,
                                                    nroCotizacion: e.target.value
                                                })
                                            }} defaultValue={cotizacion.nroCotizacion}/>
                                        </div>
                                        <div className="input">
                                            <label htmlFor="">Valor Bruto {cotizacion.bruto}</label>
                                            <input type="text" placeholder="Escribe aquí..." onChange={(e) =>{
                                                setCotizacion({
                                                    ...cotizacion,
                                                    bruto: e.target.value
                                                })
                                            }} defaultValue={cotizacion.bruto}/>
                                        </div>
                                        <div className="input">
                                            <label htmlFor="">Descuento {cotizacion.descuento}</label>
                                            <input type="number" placeholder="Escribe aquí..." onChange={(e) =>{
                                                setCotizacion({
                                                    ...cotizacion,
                                                    descuento: e.target.value
                                                })
                                            }} defaultValue={cotizacion.descuento} />
                                        </div>

                                    </div>
                                    <div className="title">
                                        <label htmlFor="">Programar fecha {time.dia} - {time.mes} - {time.ano}</label>
                                    </div>
                                    <div className="three">
                                        <input type="text" placeholder='Año' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                ano: e.target.value
                                            })
                                        }}/>
                                        <input type="text" placeholder='Mes' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                mes: e.target.value
                                            })
                                        }}/>
                                        
                                        <input type="text" placeholder='Día' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                dia: e.target.value
                                            })
                                        }}/>
                                    </div>
                                </div>
                                <div className='callOrGo'>
                                    <button className='go' onClick={() => registrarCotizacion('')}>
                                        <span>Agentar</span>
                                    </button>
                                </div>
                            </div>                        
                        </div>
                    : call == 'later' ?
                    <div className='contesto'>
                        <div className="containerContesto">
                            <div className="title">
                                <h1>En una próxima</h1>
                            </div>
                            <div className='time'>
                                <label htmlFor="">Programar fecha</label>
                                    <div className="three">
                                        <input type="text" placeholder='Año' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                ano: e.target.value
                                            })
                                        }}/>
                                        <input type="text" placeholder='Mes' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                mes: e.target.value
                                            })
                                        }}/>
                                        
                                        <input type="text" placeholder='Día' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                dia: e.target.value
                                            })
                                        }}/>
                                    </div>
                            </div>
                            
                            <div className='callOrGo'>
                                <button className='call' onClick={() => laterCall()}>
                                    <span>Reservar</span>
                                </button>
                            </div>
                        </div>                        
                    </div>
                    : call == 'nointeresado' ? 
                        <div className='contesto'>
                            <div className="containerContesto">
                                <div className="title">
                                    <h1>Lastima, ¿Sabes la razón?</h1>
                                </div>
                                <div className="tags">
                                    <div className='optionsTags'>
                                        <button onClick={() => {
                                            if(tags.includes('sin interes')){
                                                let newArray = tags.filter(item => item != 'sin interes');
                                                setTags(newArray);
                                            }else{
                                                setTags([...tags, 'sin interes']);
                                                console.log(tags)
                                            }

                                        }} className={tags.includes('sin interes') ? 'tag Active' : 'tag'}>
                                            <span>Sin interes</span>
                                        </button>
                                        <button onClick={() => {
                                            if(tags.includes('equivocado')){
                                                let newArray = tags.filter(item => item != 'equivocado');
                                                setTags(newArray);
                                            }else{
                                                setTags([...tags, 'equivocado']);
                                                console.log(tags)
                                            }

                                        }} className={tags.includes('equivocado') ? 'tag Active' : 'tag'}>
                                            <span>Equivocado</span>
                                        </button>
                                    </div>
                                    <div className='bottom'>
                                        <h3>Enviar a</h3>

                                        <div className="sendTo">
                                            <button onClick={() => notInteres('perdido')}><span>Perdido</span></button>
                                            <button onClick={() => notInteres('dessuscribir')}><span>Desuscribir</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    : null
                }
            </div>
    )
}