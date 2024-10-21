import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './../../../store/action/action';

export default function Nube(props){
    const item = props.item;
    const [call, setCall] = useState('question');
    const dispatch = useDispatch();

    const [time, setTime] = useState({
        dia: null,
        mes: null,
        ano: null
    });

    const [tags, setTags] = useState(['default']);
    const [interes, setInteres] = useState({
        asesor: 21,
        dia: null,
        mes: null,
        ano: null,
        nombreEmpresa: null,
        responsable: item.name,
        sector: 'general',
        cargo: null,
    })

    const dontCall = async () => {
        let body = {
            clientId: item.id
        }
        const send = await axios.put('/intentos/put/dontCall', body)
        .then((res) => {
            dispatch(actions.AxiosGetIntentos(false))
        })
        .catch(err => {
            console.log(err);
            console.log('error');
        })
        return send
    }

    const laterCall = async () => {
        let body = {
            time: `${time.mes}-${time.dia}-${time.ano}`,
            clientId: item.id
        }
        const send = await axios.put('/intentos/put/contestoPeroLlamarLuego', body)
        .then((res) => {
            dispatch(actions.AxiosGetIntentos(false))
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

    const notInteres = async (stateNew) => {
        let body = {
            tag: tags,
            clientId: item.id,
            newState: stateNew
        }
        const send = await axios.put('/intentos/put/contestoSinInteres', body)
        .then((res) => {
            dispatch(actions.AxiosGetIntentos(false))
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

    const avanceProspect = async (type) => {
        let body = {
            clientId: item.id,
            estado: type,
            asesorId: interes.asesor,
            time: `${interes.mes}-${interes.dia}-${interes.ano}`,
            nombreEmpresa: interes.nombreEmpresa,
            responsable: item.name,
            sector: interes.sector,
            cargo: interes.cargo,
            tags:tags,
        }
        const send = await axios.put('/intentos/put/contestoYTieneInteresReal', body)
        .then((res) => {
            dispatch(actions.AxiosGetIntentos(false))
            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            })
            setInteres(null)
        })
        .catch(err => {console.log(err) 
            return null})

        return send
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
                                    </button>
                                    <button className='true' onClick={() => {
                                        setCall('later')
                                    }}>
                                        <span>¡Llamar después!</span>
                                    </button><br />
                                </div>
                            </div>
                        </div>
                    : call == 'interesado' ?
                        <div className='contesto'>
                            <div className="containerContesto">
                                <div className="title">
                                    <h1>Genial, ¿Llamada o visita?</h1>
                                </div>
                                <div className='interesting'>
                                    <label htmlFor="">Interesado en...</label>
                                    <div className='tagsInteresting'>
                                        <button onClick={() => {
                                            if(tags.includes('mobiliario')){
                                                let newArray = tags.filter(item => item != 'mobiliario');
                                                setTags(newArray);
                                            }else{
                                                setTags([...tags, 'mobiliario']);
                                                console.log(tags)
                                            }

                                        }} className={tags.includes('mobiliario') ? 'Active' : null}>
                                            <span>Mobiliario</span>
                                        </button>
                                        <button onClick={() => {
                                            if(tags.includes('estanteria')){
                                                let newArray = tags.filter(item => item != 'estanteria');
                                                setTags(newArray);
                                            }else{
                                                setTags([...tags, 'estanteria']);
                                                console.log(tags)
                                            }
                                        }} className={tags.includes('estanteria') ? 'Active' : null}> 
                                            <span>Estanteria</span>
                                        </button>
                                        
                                    </div>
                                </div>
                                <div className="time">
                                    <label htmlFor="">Nombre empresa</label>
                                    <input type="text" className='text' onChange={(e) => {
                                        setInteres({
                                            ...interes,
                                            nombreEmpresa: e.target.value
                                        })
                                    }}/>
                                </div>
                                <div className="time">
                                    <label htmlFor="">Cargo responsable</label>
                                    <input type="text"  className='text' onChange={(e) => {
                                        setInteres({
                                            ...interes,
                                            cargo: e.target.value
                                        })
                                    }}/>
                                </div>
                                <div className="asesor">
                                    <label htmlFor="">Asesor</label>
                                    <div className='choose'>
                                        <button className={interes.asesor == 1 ? 'Active' : null} onClick={()=> {
                                            setInteres({
                                                ...interes,
                                                asesor: 2
                                            })
                                        }}>
                                            <span>Diana</span>
                                        </button>
                                        <button className={interes.asesor == 2 ? 'Active' : null} onClick={()=> {
                                            setInteres({
                                                ...interes,
                                                asesor: 3
                                            })
                                        }}>
                                            <span>Bryan</span>
                                        </button>

                                    </div>
                                </div>

                                <div className='time'>
                                    <label htmlFor="">Programar fecha</label>
                                    <div className="three">
                                        <input type="text" placeholder='Día' onChange={(e) => {
                                            setInteres({
                                                ...interes,
                                                dia: e.target.value
                                            })
                                        }}/>
                                        <input type="text" placeholder='Mes' onChange={(e) => {
                                            setInteres({
                                                ...interes,
                                                mes: e.target.value
                                            })
                                        }}/>
                                        <input type="text" placeholder='Año' onChange={(e) => {
                                            setInteres({
                                                ...interes,
                                                ano: e.target.value
                                            })
                                        }}/>
                                    </div>

                                </div>
                                <div className='callOrGo'>
                                    <button className='call' onClick={() => avanceProspect('llamada')}>
                                        <span>Llamada</span>
                                    </button>
                                    <button className='go' onClick={() => avanceProspect('visita')}>
                                        <span>Visita</span>
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
                                    <div className='three'>
                                        <input type="text" placeholder='Día' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                dia: e.target.value
                                            })
                                        }} />
                                        <input type="text" placeholder='Mes' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                mes: e.target.value
                                            })
                                        }} />
                                        <input type="text" placeholder='Año' onChange={(e) => {
                                            setTime({
                                                ...time,
                                                ano: e.target.value
                                            })
                                        }} />
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
                                            <button onClick={() => notInteres('desuscribir')}><span>Desuscribir</span></button>
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