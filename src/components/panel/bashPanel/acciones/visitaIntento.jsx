import React, { useEffect, useState } from 'react';
import * as actions from './../../../store/action/action';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function VisitaIntento(props){
    const usuario = props.usuario;
    const item = props.item;
    const clients = props.clients;

    const [tags, setTags] = useState(['']);
    const [call, setCall] = useState('question');
    const [note, setNote] = useState('');
    const [mistake, setMistake] = useState(null);
    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();


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
    const [conDescuento, setConDescuento] = useState(0)

    const calcularNeto = () => {
        
        console.log(x)
        setConDescuento(x)
    }
    
    // FUNCIONES
    const closeDiv = () => {
        params.delete('w');
        params.delete('y');
        setParams(params);
    }

    // Después
    const laterCall = async () => {
        if(!time.mes || !time.dia || !time.ano) return setMistake('Selecciona una fecha valida.');
        let body = {
            time: `${time.mes}-${time.dia}-${time.ano}`,
            clientId: item.id
        }
        const send = await axios.put('/visita/put/llamarDespues', body)
        .then((res) => {
            dispatch(actions.AxiosGetVisitas(false))
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
    // No tiene interés
    const notInteres = async (stateNew) => {
        if(!tags.length || tags.length == 1) return setMistake('No has seleccionado ningún tag.');
        let body = {
            tag: tags,
            clientId: item.id,
            newState: stateNew
        }
        const send = await axios.put('/visita/put/contestoPeroSinInteres', body)
        .then((res) => {
            dispatch(actions.AxiosGetVisitas(false))
            usuario.rango == 'lider' ? dispatch(actions.AxiosGetClients(false)) :  dispatch(actions.AxiosGetClientsByAsesor(false, user.user.id));

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
    // OTRO SERVICIO
    const otherServices = async () => {
        if(!note) return setMistake('Describe el otro servicio.');

        let body = {
            clientId: item.id,
            note:note
        }

        const send = await axios.put('/visita/put/otroServicio', body)
        .then((res) => {
            dispatch(actions.AxiosGetVisitas(false))
            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            });
            closeDiv()
            setNote(null);

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
            closeDiv()
        })
        .catch(err =>{
            console.log(err);
            console.log('error');
        })
        return send;
    }

    // Actualizar por cada cambio.
    const update = () => {

        setCall('question')
    
    }
    useEffect(() => {
        update()
    }, [item])
    return (
        <div className='primerIntentoModal'>
             <div className='containerM'>
                {
                    call == 'question' ?
                        <div className='question'>
                            <div className="questionDiv">
                                <div className='bigMessage'>
                                    <h1>Y bueno... ¿Qué tal?</h1>
                                </div>
                                <div className='optionsButton'>
                                    <button className='si' onClick={() => setCall('cotizacion')}>
                                        <span>Solicita cotización</span>
                                    </button><br />
                                    <button className='no' onClick={() => setCall('other')}>
                                        <span>Solicita otro servicio</span>
                                    </button><br />
                                    <button className='no' onClick={() => setCall('nointeresado')}>
                                        <span>No esta interesado</span>
                                    </button>
                                    <button className='no' onClick={() => setCall('later')}>
                                        <span>Contactar después</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    : call == 'other' ?
                        <div className='contesto'>
                            <div className="containerContesto">
                                <div className="title">
                                    <h1>Genial, ¿Otro servicio solicita?</h1>
                                </div>
                                <div>
                                    <textarea name="" id="" onChange={(e) => {
                                        setNote(e.target.value);
                                    }}></textarea>
                                </div>
                                <div className='callOrGo'>
                                    <button className='call' onClick={() => otherServices()}>
                                        <span>Enviar</span>
                                    </button><br /><br />
                                    <span className="mistake">{mistake}</span>
                                </div>
                            </div>                        
                        </div>
                    : call == 'cotizacion' ?
                        <div className='contesto'>
                            <div className="containerContesto">
                                <div className="title">
                                    <h1>Ingresemos la Cotización</h1>
                                </div>
                            
                                <div className='time'>
                                    <label htmlFor="">Programar fecha</label>
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
                                                <input type="text" placeholder="Escribe aquí..." onChange={async (e) =>{
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
                                        <label htmlFor="">Selecciona fecha de visita</label>
                                        <input type="date" className='text' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                dia: e.target.value.split('-')[2],
                                                mes: e.target.value.split('-')[1],
                                                ano: e.target.value.split('-')[0],
                                            });
                                        }}/>
                                    </div>
                                </div>
                                <div className='callOrGo'>
                                    <button className='go' onClick={() => registrarCotizacion('')}>
                                        <span>Agendar</span>
                                    </button><br />
                                    <spa className="mistake">{mistake}</spa>
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
                                    </button><br />
                                    <span className="mistake">{mistake}</span>
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
                                            <button onClick={() => notInteres('desuscribir')}><span>Desuscribir</span></button>
                                            <br /><br />
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