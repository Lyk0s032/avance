import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './../../../store/action/action';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function PrimerIntento(props){
    const perdidosTags = ['precio', 'tiempo de entrega del producto', 'no disponibilidad de producto',
        'demora en la entrega de cotizacion', 'área de cobertura', 'era solo consulta', 'no volvio a contestar'
    ]

    const clients = props.clients;
    const item = props.item;
    const [call, setCall] = useState('question');
    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();
    const [mistake, setMistake] = useState(null);
    const [loadingButton, setLoadingButton] = useState(false);

    const [interes, setInteres] = useState({ 
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

    const [time, setTime] = useState({
        dia: null,
        mes: null,
        ano: null
    });

    const [tags, setTags] = useState([]);
    
    const [note, setNote] = useState(null);


    const closeDiv = () => {
        params.delete('w');
        params.delete('y');
        setParams(params);
    }
    // No contesto
    const dontCall = async () => {
        const date = new Date();
        setLoadingButton(true);
        let tiempo = `${date.getMonth() + 1}-${date.getDate() + 3}-${date.getFullYear()}`
        let body = {
            clientId: item.id,
            tiempo:tiempo
        }
        const send = await axios.put('/intentos/put/dontCall', body)
        .then((res) => {
            dispatch(actions.AxiosGetIntentos(false))
            dispatch(actions.AxiosGetClients(false));

            closeDiv()

        })
        .catch(err => {
            console.log(err);
            console.log('error');
        })
        setLoadingButton(false);

        return send

    }
    // Avanzar   
    const avanceProspect = async (type) => {
        if(!tags.length) return setMistake('No has seleccionado ningún tag.')
        if(!interes.mes || !interes.dia || !interes.ano) return setMistake('Fecha es obligatoría.');
        setLoadingButton(true);

        let body = {
            clientId: item.id,
            estado: type,
            asesorId: interes.asesor,
            time: `${interes.mes}-${interes.dia}-${interes.ano}`,
            fijo: interes.fijo,
            url: interes.url,
            direccion: interes.direccion,
            nombreEmpresa: interes.nombreEmpresa,
            responsable: item.name,
            sector: interes.sector,
            cargo: interes.cargo,
            tags:tags,
            note: `Avanzó desde ${item.state} a ${type}`
        }
        const send = await axios.put('/intentos/put/contestoYTieneInteresReal', body)
        .then((res) => {
            dispatch(actions.AxiosGetIntentos(false))
            dispatch(actions.AxiosGetClients(false));

            setCall('question');
            setTime({
                dia:null,
                mes:null,
                ano: null
            })
            closeDiv()

        })
        .catch(err => {

            console.log(err) 
            console.log(body)
            return null
        })
        setLoadingButton(false);

        return send
    }
    // no interes
    const notInteres = async (stateNew) => {
        if(!tags.length) return setMistake('No has seleccionado ningún tag.')
            setLoadingButton(true);
       
        let body = {
            tag: tags,
            clientId: item.id,
            newState: stateNew,
            note
        }
        const send = await axios.put('/intentos/put/contestoSinInteres', body)
        .then((res) => {
            dispatch(actions.AxiosGetIntentos(false))
            closeDiv()

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
        });
        setLoadingButton(false);

        return send;
    }
    // Después
    const laterCall = async () => {
        if(!time.mes || !time.dia || !time.ano) return setMistake('Fecha es obligatoría.')
            setLoadingButton(true);
  
        let body = {
            time: `${time.mes}-${time.dia}-${time.ano}`,
            clientId: item.id,
            note: note,
            tags: tags.length ? tags : null
        }
        const send = await axios.put('/intentos/put/contestoPeroLlamarLuego', body)
        .then((res) => {
            dispatch(actions.AxiosGetIntentos(false))
            dispatch(actions.AxiosGetClients(false));

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
        setLoadingButton(false);

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
                                <h1>¿Contestó?</h1>
                            </div>
                            <div className='optionsButton'>
                                <button className='si' onClick={() => setCall('contesto')} disabled={loadingButton}>
                                    <span>¡Si!</span>
                                </button>
                                <button className='no'  onClick={() => dontCall()} disabled={loadingButton}>
                                    <span>No</span>
                                </button>

                            </div>
                        </div>
                    :  call == 'contesto' ?
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
                                <button className='true' onClick={() => {
                                    setCall('later')
                                }}>
                                    <span>¡Llamar después!</span>
                                </button><br />
                            </div>
                        </div>
                    </div>
                    :call == 'interesado' ?
                    <div className='contesto'>
                        <form className="containerContesto" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
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
                                        if(tags.includes('estanteria supercarga')){
                                            let newArray = tags.filter(item => item != 'estanteria supercarga');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'estanteria supercarga']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('estanteria supercarga') ? 'Active' : null}> 
                                        <span>Estanteria Supercarga</span>
                                    </button>

                                    <button onClick={() => {
                                        if(tags.includes('estanteria liviana')){
                                            let newArray = tags.filter(item => item != 'estanteria liviana');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'estanteria liviana']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('estanteria liviana') ? 'Active' : null}> 
                                        <span>Estanteria Liviana</span>
                                    </button>


                                    <button onClick={() => {
                                        if(tags.includes('mantenimiento estanteria')){
                                            let newArray = tags.filter(item => item != 'mantenimiento estanteria');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'mantenimiento estanteria']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('mantenimiento estanteria') ? 'Active' : null}> 
                                        <span>Mantenimiento estanteria</span>
                                    </button>

                                    <button onClick={() => {
                                        if(tags.includes('mantenimiento sillas')){
                                            let newArray = tags.filter(item => item != 'mantenimiento sillas');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'mantenimiento sillas']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('mantenimiento sillas') ? 'Active' : null}> 
                                        <span>Mantenimiento sillas</span>
                                    </button>

                                    <button onClick={() => {
                                        if(tags.includes('cerramiento en malla')){
                                            let newArray = tags.filter(item => item != 'cerramiento en malla');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'cerramiento en malla']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('cerramiento en malla') ? 'Active' : null}> 
                                        <span>Cerramiento en malla</span>
                                    </button>

                                    <button onClick={() => {
                                        if(tags.includes('otros')){
                                            let newArray = tags.filter(item => item != 'otros');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'otros']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('otros') ? 'Active' : null}> 
                                        <span>Otros</span>
                                    </button>

                                    <button onClick={() => {
                                        if(tags.includes('sillas')){
                                            let newArray = tags.filter(item => item != 'sillas');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'sillas']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('sillas') ? 'Active' : null}> 
                                        <span>Sillas</span>
                                    </button>
                                    
                                    <button onClick={() => {
                                        if(tags.includes('casilleros')){
                                            let newArray = tags.filter(item => item != 'casilleros');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'casilleros']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('casilleros') ? 'Active' : null}> 
                                        <span>Casilleros</span>
                                    </button>

                                    <button onClick={() => {
                                        if(tags.includes('proyectos')){
                                            let newArray = tags.filter(item => item != 'proyectos');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'proyectos']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('proyectos') ? 'Active' : null}> 
                                        <span>Proyectos</span>
                                    </button>


                                    <button onClick={() => {
                                        if(tags.includes('lockers')){
                                            let newArray = tags.filter(item => item != 'lockers');
                                            setTags(newArray);
                                        }else{
                                            setTags([...tags, 'lockers']);
                                            console.log(tags)
                                        }
                                    }} className={tags.includes('lockers') ? 'Active' : null}> 
                                        <span>Lockers</span>
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
                                }} defaultValue={interes.nombreEmpresa}/>
                            </div>
                            <div className="time">
                                <label htmlFor="">Cargo</label>
                                <input type="text" className='text' onChange={(e) => {
                                    setInteres({
                                        ...interes,
                                        cargo: e.target.value
                                    })
                                }} defaultValue={interes.cargo}/>
                            </div>
                            <div className="time">
                                <label htmlFor="">Dirección</label>
                                <input type="text" className='text' onChange={(e) => {
                                    setInteres({
                                        ...interes,
                                        direccion: e.target.value
                                    })
                                }} defaultValue={interes.direccion}/>
                            </div><div className="time">
                                <label htmlFor="">Sitio web</label>
                                <input type="text" className='text' onChange={(e) => {
                                    setInteres({
                                        ...interes,
                                        url: e.target.value
                                    })
                                }} defaultValue={interes.url}/>
                            </div><div className="time">
                                <label htmlFor="">Teléfono Fijo {interes.fijo}</label>
                                <input type="text" className='text' onChange={(e) => {
                                    setInteres({
                                        ...interes,
                                        fijo: e.target.value
                                    })
                                }} defaultValue={interes.fijo}/>
                            </div>
                            
                            <div className="time">
                                <label htmlFor="">Selecciona una fecha {interes.fecha}</label>
                                <input type="date" className='text' onChange={(e) => {
                                    setInteres({
                                        ...interes,
                                        dia: e.target.value.split('-')[2],
                                        mes: e.target.value.split('-')[1],
                                        ano: e.target.value.split('-')[0],
                                    }); 

                                }}/>
                            </div>
                            
                            <div className="asesor">
                                <div className='choose'>
                                <label htmlFor="">Selecciona Asesor {time.dia}</label><br />

                                {
                                    clients.asesores && clients.asesores.length ?
                                        clients.asesores.map((asesor, i) => {
                                            return (
                                                <button className={interes.asesor == asesor.id ? 'Active' : null} onClick={()=> {
                                                    setInteres({
                                                        ...interes,
                                                        asesor: asesor.id
                                                    })
                                                }}>
                                                    <span>{asesor.name}</span>
                                                </button>
                                            )
                                        })
                                    : <span>No hemos encontrado asesores</span>
                                }
                                    </div>

                                    
                                    
                            </div>



                            <div className='callOrGo'>
                                <button className='call' onClick={() => avanceProspect('llamada')} disabled={loadingButton}>
                                    <span>Llamada</span>
                                </button>
                                <button className='go' onClick={() => avanceProspect('visita')} disabled={loadingButton}>
                                    <span>Visita</span>
                                </button>
                                <span className='mistake'>{mistake}</span>
                            </div>
                        </form>        
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

                            
                                    <div className="tags">
                                        <label htmlFor="">Tags</label><br /><br />
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
                                    </div>

                                    <div className="note">
                                        <label htmlFor="Nota">Nota {note} </label><br />
                                        <textarea name="" id="" placeholder='Nota' value={note}
                                        onChange={(e) => {
                                            setNote(e.target.value)
                                        }}></textarea>
                                    </div>
                            </div>
                            
                            <div className='callOrGo'>
                                <button className='call' onClick={() => laterCall()} disabled={loadingButton}>
                                    <span>Reservar</span>
                                </button><br />
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
                                            {
                                                perdidosTags.map((tg, i) => {
                                                    return (
                                                        <button key={i+1} onClick={() => {
                                                            if(tags.includes(tg)){
                                                                let newArray = tags.filter(item => item != tg);
                                                                setTags(newArray);
                                                            }else{
                                                                setTags([...tags, tg]);
                                                                console.log(tags)
                                                            }
            
                                                        }} className={tags.includes(tg) ? 'tag Active' : 'tag'}>
                                                            <span>{tg}</span>
                                                        </button> 
                                                    )
                                                })
                                            }

                                    </div>
                                    <div className="note" style={{width:'100%', textAlign:'left'}}>
                                        <label htmlFor="Nota" style={{fontSize:'12px', color: '#ccc'}}>Nota  </label><br />
                                        <textarea name="" id="" placeholder='Nota' value={note}
                                        onChange={(e) => {
                                            setNote(e.target.value)
                                        }} style={{width:'100%',resize:'none',marginTop:'10px', padding:'10px'}}></textarea>
                                    </div>
                                <div className='bottom'>
                                    <h3>Enviar a</h3>

                                    <div className="sendTo">
                                        <button className="lost" onClick={() => notInteres('perdido')} disabled={loadingButton}><span>Perdido</span></button>
                                        <button className='desus' onClick={() => notInteres('desuscribir')} disabled={loadingButton}><span>Desuscribir</span></button><br /><br />
                                        <span className='mistake'>{mistake}</span>

                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                    : null
                }
                <span style={{fontSize:'12px', color:'blue'}}>{loadingButton ? 'Un momento...' : null}</span>
            </div>
        </div>
    )
}