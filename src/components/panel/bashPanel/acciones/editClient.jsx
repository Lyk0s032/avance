import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { MdClose, MdDelete, MdDeleteOutline, MdRemove } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import * as actions from './../../../store/action/action';

export default function EditClient(props){
    const clients = props.clients;
    const usuario = props.usuario;
    const [space, setSpace] = useState('update');
    const [remove, setRemove] = useState(false);
    const [change, setChange] = useState('question');
    const [params, setParams] = useSearchParams();


    const [loading, setLoading] = useState(false);
    const [mistake, setMistake] = useState(null);
    const [sucessfull, setSuccesfull] = useState(null);

    const [asesor, setAsesor] = useState(null);
    const dispatch = useDispatch();
    const item = useSelector(store => store.cliente);

    const [prospecto, setProspecto] = useState({
        nombreEmpresa: item.nombreEmpresa,
        phone: item.phone,
        fijo: item.fijo,
        cargo: item.rangoEncargado,
        nombre: item.name,
        direccion: item.direccion,
        url: item.url,
        email: item.email,

    })

    const refresh = () => {
        setProspecto({
            nombreEmpresa: item.nombreEmpresa,
            phone: item.phone,
            fijo: item.fijo,
            cargo: item.rangoEncargado,
            nombre: item.name,
            direccion: item.direccion,
            url: item.url,
            email: item.email,
        })
    }

    const refreshUsers = async () => {
        if(usuario.rango == 'asesor'){
            dispatch(actions.AxiosGetAllFunctionsForAsesor(false, usuario.id));
            
        }else if(usuario.rango == 'lider'){
            dispatch(actions.AxiosGetAllFunctionForLider(false));
        }
        setTimeout(() => {
            params.delete('watch');
            params.delete('w');
            params.delete('y');

            setParams(params);
        }, 2000)
    }
    const updateClient = async () => {
        if(!prospecto.nombre || !prospecto.phone) return setMistake('No puedes dejar vacio el nombre del encargado ni el número de teléfono.')
        setLoading(true);
        setMistake(null);
        setSuccesfull(null);

        let body = {
            clientId: item.id,
            nombreEmpresa: prospecto.nombreEmpresa,
            phone: prospecto.phone,
            fijo: prospecto.fijo,
            cargo: prospecto.rangoEncargado,
            name: prospecto.nombre,
            direccion: prospecto.direccion,
            url: prospecto.url,
            email: prospecto.email,
        }
        let send = await axios.put('/client/put/update', body)
        .then((res) => {
            setLoading(false);
            setSuccesfull('Actualizado con éxito.');
            return refreshUsers();
        })
        .catch((err) => {
            setLoading(false);
            setMistake('No hemos podido actualizar este cliente, intentalo más tarde.');
        });
        return send;
        
    }

    // Cambiar de asesor
    const changeAsesor = async (val) => {
        if(!asesor) return setMistake('Selecciona un asesor');
        let body = {
            clientId: item.id,
            asesorId: asesor
        }

        const updating = await axios.put('/client/put/changeAsesor', body)
        .then((res) => {
            setLoading(false);
            setSuccesfull('Actualizado con éxito.');
            console.log('Actualiza y cambiar de asesor con exito.');
            return refreshUsers();
        })
        .catch(err => {
            setLoading(false);
            setMistake('No hemos podido actualizar este cliente, intentalo más tarde.');
            console.log(err);
            console.log('Falla al actualizar');
        })
    }
   

    const deleteClient = async () => {
        setLoading(true);

        const del = await axios.delete(`/client/delete/registro/${item.id}`)
        .then((res) => {
            setLoading(false);
            setMistake(null);
            setSuccesfull('Cliente eliminado con éxito');
            dispatch(actions.AxiosGetAllFunctionsForAsesor());

            setTimeout(() => {
                params.delete('watch');
                setParams(params);
            }, 2000)
        })
        .catch(err => {
            setLoading(false)
            setMistake('No hemos podido eliminar este cliente. Intentalo más tarde.')
        });
        return del
    }
    return (
        <div className="editClient">
            {
                mistake || sucessfull ?
                <div className="nubeMessage ">
                    <div className={mistake ? 'containerNube Mistake' : sucessfull ? 'containerNube Sucess' : null}>
                        <span></span>
                        <div className="message">
                            <span>
                                {
                                    mistake ? mistake : sucessfull ? sucessfull : null
                                }
                            </span>
                        </div>
                        <button onClick={() => setSuccesfull(false)}>
                            <MdClose className="icon" />
                        </button>
                    </div>
                </div>
                :null
            }            
            <div className="containerEdit">
                <div className="headerEdit">
                    <nav>
                        <ul>
                            <li className={!space || space == 'update' ? 'Active' : null} onClick={() => setSpace('update')}>
                                <span>
                                    Ficha tecnica
                                </span>
                            </li>
                            {
                                usuario.rango == 'lider' ?
                            <li className={space == 'asesor' ? 'Active' : null} onClick={() => setSpace('asesor')}>
                                <span>
                                    Asesor
                                </span>
                            </li>
                            : null }
                            <li className={space == 'remove' ? 'Active' : null} onClick={() => setSpace('remove')}>
                                <span>
                                    Remover
                                </span>
                            </li>
                        </ul>
                    </nav>
                    <button onClick={() => {
                        params.delete('watch');
                        setParams(params);
                    }}>
                        <MdClose className='icon' />
                    </button>
                </div>
                <div className='containerFicha'>
                    {
                    !space || space == 'update' ?
                    <div className="ficha">
                        <div className="headerFicha">
                            <h2>¡Bienvienido al espacio de actualización!</h2>
                        </div>
                        <div className="form">
                            <div className="horizontal">
                                <div className="inputDiv">
                                    <label htmlFor="">Nombre empresa {prospecto.nombreEmpresa}</label><br />
                                    <input type="text" placeholder='Escribe aquí...' 
                                    onChange={(e) => {
                                        setMistake(null);
                                        setSuccesfull(null);
                                        setProspecto({
                                            ...prospecto,
                                            nombreEmpresa: e.target.value
                                        })
                                    }} value={prospecto.nombreEmpresa} />
                                </div>
                                <div className="inputDiv">
                                    <label htmlFor="">Número de teléfono {prospecto.phone}</label><br />
                                    <input type="text" placeholder='Escribe aquí...' 
                                    onChange={(e) => {
                                        setMistake(null);
                                        setSuccesfull(null);
                                        setProspecto({
                                            ...prospecto,
                                            phone: e.target.value
                                        })
                                    }} value={prospecto.phone}/>
                                </div>
                            </div>
                            <div className="horizontal">
                                <div className="inputDiv">
                                    <label htmlFor="">Nombre del encargado {prospecto.nombre}</label><br />
                                    <input type="text" placeholder='Escribe aquí...' 
                                    onChange={(e) => {
                                        setMistake(null);
                                        setSuccesfull(null);
                                        setProspecto({
                                            ...prospecto,
                                            nombre: e.target.value
                                        })
                                    }} value={prospecto.nombre}/>
                                </div>
                                <div className="inputDiv">
                                    <label htmlFor="">Cargado del encargado</label><br />
                                    <input type="text" placeholder='Escribe aquí...' 
                                    onChange={(e) => {
                                        setMistake(null);
                                        setSuccesfull(null);
                                        setProspecto({
                                            ...prospecto,
                                            cargo: e.target.value
                                        })
                                    }} value={prospecto.cargo}/>
                                </div>
                            </div>
                            <div className="horizontal">
                                <div className="inputDiv">
                                    <label htmlFor="">Dirección</label><br />
                                    <input type="text" placeholder='Escribe aquí...' 
                                    onChange={(e) => {
                                        setMistake(null);
                                        setSuccesfull(null);
                                        setProspecto({
                                            ...prospecto,
                                            direccion: e.target.value
                                        })
                                    }} value={prospecto.direccion}/>
                                </div>
                                <div className="inputDiv">
                                    <label htmlFor="">URL - Sitio web</label><br />
                                    <input type="text" placeholder='Escribe aquí...' 
                                    onChange={(e) => {
                                        setMistake(null);
                                        setSuccesfull(null);
                                        setProspecto({
                                            ...prospecto,
                                            url: e.target.value
                                        })
                                    }} value={prospecto.url}/>
                                </div>
                            </div>
                            <div className="horizontal">
                                <div className='inputDiv'>
                                    <label htmlFor="">Correo eléctronico</label><br />
                                    <input type="text" placeholder='example@modulares.com' 
                                    onChange={(e) => {
                                        setMistake(null);
                                        setSuccesfull(null);
                                        setProspecto({
                                            ...prospecto,
                                            email: e.target.value
                                        })
                                    }} value={prospecto.email}/>
                                </div>
                                <div className='inputDiv'>
                                    <label htmlFor="">Fijo {prospecto.fijo}</label><br />
                                    <input type="text" placeholder='' 
                                    onChange={(e) => {
                                        setMistake(null);
                                        setSuccesfull(null);
                                        setProspecto({
                                            ...prospecto,
                                            fijo: e.target.value
                                        })
                                    }} value={prospecto.fijo}/>
                                </div>
                                
                            </div>
                            <div className="horizontal">
                                <div className="inputDiv">
                                    <button className='refrescar' onClick={() => refresh()}>
                                        <AiOutlineReload className="icon" />
                                        <span>Restaurar valores predeterminados </span>
                                    </button>
                                </div>
                                {
                                    loading ?
                                    <div className="inputDiv">
                                        <button >
                                            <span>Cargando...</span>
                                        </button>
                                    </div>
                                    :
                                    <div className="inputDiv">
                                        <button onClick={() => updateClient()}>
                                            <span>Actualizar</span>
                                        </button>
                                    </div>
                                }
                               
                            </div>
                        </div>
                    </div>
                    : space == 'asesor' ?
                    <div className='asesorChangeOption'>
                        <div className='containerAsesor'>
                            <div className="currently">
                                <h3>Asesor encargado.</h3>
                                <div className="contenedorAsesor">
                                    <div className="wallpaperAsesor">
                                        <img src={item.user.photo} alt="" />
                                    </div>
                                    <div className="dataAsesor">
                                        <h1>{item.user.name}</h1>
                                        <span>Asesor/a</span>
                                    </div>
                                </div>
                            </div>
                            <div className="changeAsesor">
                                <div className="containerChange">
                                    <div className="headerChange">
                                        <h1>¿Te gustaría cambiar de asesor?</h1>
                                    </div>
                                    <div className="listContainer">
                                        {
                                            !change || change == 'question' ?
                                        
                                        <div className="optionsButton">
                                            <button onClick={() => setChange('select')}>
                                                <span>Si</span>
                                            </button>
                                        </div>
                                            : change == 'select' ?
                                        <div className="asesoresChange">
                                            <div className="asesoresDiv">
                                                <select name="" id="" onChange={(e) => {
                                                    setAsesor(e.target.value);
                                                }}>
                                                    <option value={null} defaultValue={null}>Selecciona asesor </option>
                                                    {
                                                        clients.asesores && clients.asesores.length ? 
                                                            clients.asesores.map((ase, i) => {
                                                                return (
                                                                    ase.id != item.user.id ? 
                                                                    <option value={ase.id} key={i+1}>
                                                                        {ase.name}
                                                                    </option>
                                                                    :null
                                                                )
                                                            })
                                                        : 
                                                            <span>No hay asesores disponibles</span>
                                                    }
                                                </select><br />

                                                <button onClick={() => {
                                                    setMistake(null)
                                                    !asesor ? 
                                                        setMistake('Selecciona un asesor, antes de continuar')
                                                    : setChange('confirmation')
                                                    
                                                }}>
                                                    <span>Definir</span>
                                                </button> 
                                                <button className="cancel" onClick={() => {
                                                    setChange('question');
                                                    setAsesor(null)
                                                }}>
                                                    <span>Cancelar</span>
                                                </button>
                                            </div>
                                        </div>
                                        : change == 'confirmation' ?
                                        <div className="confirmationButton">
                                            <div className="containerConfirmation">
                                                <button className='ok' onClick={() => changeAsesor()}>
                                                    <span>Confirmar</span>
                                                </button>
                                                <button className='cancel' onClick={() => {
                                                    setChange('question')
                                                    setAsesor(null)
                                                }}>
                                                    <span>Cancelar</span>
                                                </button>
                                            </div>
                                        </div>
                                        : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : space == 'remove' ?
                    <div className='remove'>
                        <div className='containerRemove'>
                            <div className="headerRemove">
                                <h1>Acción peligrosa {item.id}</h1>
                                <span>Si decides eliminar el cliente <strong>Mercado libre</strong>, no habra marcha atras.</span>
                            </div>
                            <div className='actionsDelete'>
                                { 
                                    !remove ?
                                <button className='button' onClick={() => {
                                    setRemove(true);
                                }}>
                                    <span>Eliminar a {item.nombreEmpresa ? item.nombreEmpresa : item.name}</span>
                                    <MdDeleteOutline className='icon' />
                                </button>
                                :
                                <div className="confirmation">
                                    <h3>¿Esta seguro qué desea eliminar a {item.nombreEmpresa ? item.nombreEmpresa : item.name}?</h3>
                                    {
                                        loading ?
                                        <h3>Cargando...</h3>
                                        :
                                        <div className="btns">
                                            <button className="button" onClick={() => deleteClient()}>
                                                <span>Confirmar</span>
                                            </button>
                                            <button className='cancel' onClick={() => {
                                                setRemove(false);
                                            }}>
                                                <span>Cancelar</span>
                                            </button>
                                        </div> 
                                    }
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                    :null
                    }
                </div>
            </div>
        </div>
    )
}