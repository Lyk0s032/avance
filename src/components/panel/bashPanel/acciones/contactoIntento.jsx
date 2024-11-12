import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './../../../store/action/action';
import { useSearchParams } from 'react-router-dom';

export default function ContactoIntento(props){
    const usuario = props.usuario;
    const clients = props.clients;
    const item = props.item;    const [call, setCall] = useState('question');
    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();
    const [mistake, setMistake] = useState(null);
    const [iva, setIva] = useState(true);
    
    
    const change = () => {
        setIva(!iva);
        console.log('entra');
    }
    
    const [time, setTime] = useState({
        dia: null,
        mes: null,
        ano: null
    });
    const [tags, setTags] = useState([]);
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

    // FUNCIONES
    const closeDiv = () => {
        params.delete('w');
        params.delete('y');
        setParams(params);
    }
    // No contesto
    const dontCall = async () => {
        let body = {
            clientId: item.id
        }
        const send = await axios.put('/contacto/put/dontCall', body)
        .then((res) => {
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetContactos(false)) : dispatch(actions.AxiosGetContactos(false, usuario.id));
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetClients(false)) :  dispatch(actions.AxiosGetClientsByAsesor(false, usuario.id));
            closeDiv()
        })
        .catch(err => {
            console.log(err);
            console.log('error');
        })
        return send
    }
    // Later
    const laterCall = async () => {
        if(!time.mes || !time.dia || !time.ano) return setMistake('Asigna una fecha valida, por favor.');
        let body = {
            time: `${time.mes}-${time.dia}-${time.ano}`,
            clientId: item.id
        }
        const send = await axios.put('/contacto/put/contestoPeroLlamarLuego', body)
        .then((res) => {
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetContactos(false)) : dispatch(actions.AxiosGetContactos(false, usuario.id));
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetClients(false)) :  dispatch(actions.AxiosGetClientsByAsesor(false, usuario.id));
        
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
        if(!time.mes || !time.dia || !time.ano) return setMistake('Es necesario asignar una fecha valida.');
        console.log(usuario)
        usuario.rango == 'lider' ? dispatch(actions.AxiosGetClients(false)) :  dispatch(actions.AxiosGetClientsByAsesor(false, usuario.id));
     
        let body = {
            time: `${time.mes}-${time.dia}-${time.ano}`,
            clientId: item.id,
            estado: 'visita'
        }
        const send = await axios.put('/contacto/put/contestoYTieneInteresRealContacto', body)
        .then((res) => {
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetContactos(false)) : dispatch(actions.AxiosGetContactos(false, usuario.id));
            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            });
            closeDiv();
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        return send;
    }

    // COTIZACION
    const registrarCotizacion = async () => {
        if(!cotizacion.nit || !cotizacion.nroCotizacion || !cotizacion.bruto) return setMistake('No puedes dejar campos vacios.');
        if(!time.dia || !time.mes || !time.ano) return setMistake('Selecciona una fecha valida.');
        
        let brt = cotizacion.bruto; 
        let descuento = cotizacion.descuento;
    
        let valorConDescuento = Number(brt) - Number(descuento); 
        let valorConIva = valorConDescuento * (19 / 100);
    
        let valorFinal = iva ? valorConDescuento + valorConIva : valorConDescuento;
    
        let body = {
            time: `${time.mes}-${time.dia}-${time.ano}`,
            clientId: item.id,
            estado: 'cotizacion',
            nit: cotizacion.nit,
            nro: cotizacion.nroCotizacion,
            fecha: `${time.mes}-${time.dia}-${time.ano}`,
            bruto: cotizacion.bruto,
            descuento: cotizacion.descuento,
            iva: iva ? cotizacion.iva : 0,
            neto:valorFinal
        }
        const send = await axios.put('/contacto/put/contestoYTieneInteresRealContacto', body)
        .then((res) => {
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetContactos(false)) : dispatch(actions.AxiosGetContactos(false, usuario.id));
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetClients(false)) :  dispatch(actions.AxiosGetClientsByAsesor(false, usuario.id));

            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            })
            closeDiv()
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        return send;
    }
    // No tiene interés
    const notInteres = async (stateNew) => {
        if(!tags.length) return setMistake('No has seleccionado ningún tag.');
        let body = {
            tag: tags,
            clientId: item.id,
            newState: stateNew
        }
        const send = await axios.put('/contacto/put/contestoPeroSinInteres', body)
        .then((res) => {
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetContactos(false)) : dispatch(actions.AxiosGetContactos(false, usuario.id));
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetClients(false)) :  dispatch(actions.AxiosGetClientsByAsesor(false, usuario.id));

            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            })
            closeDiv();
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        return send;
    }
    // Actualizar por cada cambio.
    const update = () => {
        setInteres({
            asesor: 2,
            dia: null,
            mes: null,
            ano: null,
            nombreEmpresa: item.nombreEmpresa,
            cargo: item.rangoEncargado,
            direccion: item.direccion,
            url: item.url,
            fijo: null,
            responsable: item.name,
            fecha: null,
            sector: 'general',
        })
        setCall('question')

    }
    useEffect(() => {
        update()
    }, [item])

    return (
        <div className='primerIntentoModal'>
            <div className='containerM'>
                {/* QUESTION */}
                {
                    call == 'question' ? 
                        <div className="questionDiv">
                            <div className='bigMessage'>
                                <h1>Y bueno... ¿Qué tal?</h1>
                            </div>
                            <div className='optionsButton'>
                                <button className='si' onClick={() => setCall('contesto')}>
                                    <span>¡Contesto!</span>
                                </button>
                                <button className="no"  onClick={() => dontCall()}>
                                    <span>No contesto</span>
                                </button>
                                <button className="no"  onClick={() => setCall('later')}>
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
                                <h1>¿Quiere una visita o cotización?</h1>
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
                                    <input type="date" className='text' onChange={(e) => {
                                        setTime({
                                            ...time,
                                            dia: e.target.value.split('-')[2],
                                            mes: e.target.value.split('-')[1],
                                            ano: e.target.value.split('-')[0],
                                        });
                                    }}/>

                                </div>

                                <div className='callOrGo'>
                                    <button className='go' onClick={() => programarVisita()}>
                                        <span>Agendar</span>
                                    </button><br /><br /> 
 
                                    <span className='mistake'>{mistake}</span>
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
                                            <label htmlFor="">Valor Bruto {cotizacion.bruto ? `${new Intl.NumberFormat('es-CO', { currency:'COP'}).format(cotizacion.bruto)} COP` : null }</label>
                                            <input type="text" placeholder="Escribe aquí..." onChange={(e) =>{
                                                setCotizacion({
                                                    ...cotizacion,
                                                    bruto: e.target.value.replace(/[^0-9]/g, '')
                                                })
                                            }} value={cotizacion.bruto}/>
                                        </div>
                                        <div className="input">
                                            <label htmlFor="">Descuento {cotizacion.descuento ? `${new Intl.NumberFormat('es-CO', { currency:'COP'}).format(cotizacion.descuento)} COP` : null}</label>
                                            <input type="text" placeholder="Escribe aquí..." onChange={(e) =>{
                                                    setCotizacion({
                                                        ...cotizacion,
                                                        descuento: e.target.value.replace(/[^0-9]/g, '')
                                                    })
                                            }} value={cotizacion.descuento} />
                                        </div>
                                        <div className="inputDiv Check" onClick={() => change()}>
                                            <input type="checkbox" checked={iva}/>
                                            <label htmlFor="">Iva incluido</label>
                                        </div>

                                    </div> 
                                    <label htmlFor="">Selecciona fecha de seguimiento</label>
                                    <input type="date" className='text' onChange={(e) => {
                                        setTime({
                                            ...time,
                                            dia: e.target.value.split('-')[2],
                                            mes: e.target.value.split('-')[1],
                                            ano: e.target.value.split('-')[0],
                                        });
                                    }}/>

                                </div>
                                <div className='callOrGo'>
                                    <button className='go' onClick={() => registrarCotizacion('')}>
                                        <span>Agentar</span>
                                    </button><br />
                                    <span className='mistake'>{mistake}</span>
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
                                    <input type="date" className='text' onChange={(e) => {
                                        setTime({
                                            ...time,
                                            dia: e.target.value.split('-')[2],
                                            mes: e.target.value.split('-')[1],
                                            ano: e.target.value.split('-')[0],
                                        });
                                    }}/>

                                </div>
                                
                                <div className='callOrGo'>
                                    <button className='call' onClick={() => laterCall()}>
                                        <span>Reservar</span>
                                    </button><br /><br />
                                    <span className='mistake'>{mistake}</span>
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
                                            <button onClick={() => notInteres('dessuscribir')}><span>Desuscribir</span></button><br /><br />
                                            <span className='mistake'>{mistake}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    : null
                    
            }
            </div>
        </div>
    )
}