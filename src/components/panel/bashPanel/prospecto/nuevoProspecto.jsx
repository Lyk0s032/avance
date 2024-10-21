import axios from 'axios';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import * as actions from './../../../store/action/action';

export default function NewProspect(props){
    const clients = props.clients;
    const [mistake, setMistake] = useState(null);
    const [ok, setOk] = useState(null);
    const [params, setParams] = useSearchParams();
    const dispatch = useDispatch();
    const [prospect, setProspect] = useState({
        nombre: null,
        phone: null,
        email:null,
        arroba: null,
        punto: null,
        fuente: 1

    });

    const sendNewProspect = async () => {
        setMistake(null);
        setOk(null);

        if(prospect.nombre == '' || prospect.phone == '') return setMistake('No puedes dejar campos vacios');

        let body = {
            name: prospect.nombre,
            phone: prospect.phone,
            email: prospect.email && prospect.arroba && prospect.punto ? `${prospect.email}@${prospect.arroba}.${prospect.punto}` : null,
            fuenteId: prospect.fuente
        }

        const send = await axios.post('/client/post/new', body)
        .then((res) => {
            dispatch(actions.AxiosGetClients(false));
            setMistake(null);
            setOk('Cliente creado con éxito');
        }).catch(err => {
            setMistake('No hemos podido crear este cliente');
            setOk(null)
        })
        return send
    }
    return (
        <div className='newFuente '>
            <div className="modalNewContainer Prospecto">
                <div className="form">
                    <div className="title">
                        <h1>Nuevo prospecto</h1>
                        <button onClick={() => {
                            params.delete('w');
                            setParams(params);
                        }}>
                            <MdClose className='icon' />
                        </button>
                    </div>
                    <div className='containerForm'>
                        <div className="inputDiv">
                            <label htmlFor="">Nombre</label><br />
                            <input type="text" placeholder='Nombre del encargado' 
                            onChange={(e) => {
                                setProspect({
                                    ...prospect,
                                    nombre: e.target.value
                                })
                            }} defaultValue={prospect.nombre}/>
                        </div>
                       
                        <div className="inputDiv">
                            <label htmlFor="">Número de teléfono</label><br />
                            <input type="text" placeholder='Escribe aquí...' 
                            onChange={(e) => {
                                setProspect({
                                    ...prospect,
                                    phone: e.target.value
                                })
                            }} defaultValue={prospect.phone}/> 
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="">Correo electrónico * Opcional</label><br />
                            <div className='emailRequired'>
                                <div className='inputEmail'>
                                    <input type="text" placeholder='nombredelemail' onChange={(e) => {
                                        setProspect({
                                            ...prospect,
                                            email: e.target.value
                                        })
                                    }} defaultValue={prospect.email} />
                                </div>
                                <div className='part'>
                                    <h3>@</h3>
                                </div>
                                <div className='inputEmail'>
                                    <input type="text" placeholder='ej. Hotmal' onChange={(e) => {
                                    setProspect({
                                        ...prospect,
                                        arroba: e.target.value
                                    })
                                }} defaultValue={prospect.arroba}/>
                                </div>
                                <div className="part">
                                    <h3>.</h3>
                                </div>
                                <div className='inputEmail'>
                                    <input type="text" placeholder='com' onChange={(e) => {
                                    setProspect({
                                        ...prospect,
                                        punto: e.target.value
                                    })
                                }} defaultValue={prospect.punto}/>
                                </div>
                            </div> 
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="">¿Nos puedes decir la fuente?</label><br />
                                <select name="" id="" className='fuente' onChange={(e) => {
                                    setProspect({
                                        ...prospect,
                                        fuente: e.target.value
                                    })
                                }}>
                                    {
                                        clients.fuente && clients.fuente.length ?
                                            clients.fuente.map((fuent, i) => {
                                                return (
                                                    <option value={fuent.id} key={i+1}>{fuent.name}</option>
                                                )
                                            })
                                        : <span>No disponible</span>
                                    }
                                </select>
                        </div>
                        <div className="inputDiv">
                            {mistake ? <span className='mistake'>{mistake} <br /><br /></span> : null }
                            {ok ? <span className='mistake'>{ok} <br /><br /></span> : null } 

                            <button onClick={() => sendNewProspect()}>
                                <span>Crear fuente</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}