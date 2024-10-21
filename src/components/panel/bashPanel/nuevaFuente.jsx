import axios from 'axios';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

export default function NewFuente(){
    const [params, setParams] = useSearchParams();
    const [form, setForm] = useState({
        name: null,
        description:null,
    });
    const [mistake, setMistake] = useState(null);
    const [ok, setOk] = useState(null);
    
    
    const send = async () => {
        let body = {
            name: form.name,
            description: form.description
        }

        const send = await axios.post('/fuente/post/new', body)
        .then((res) => {
            setMistake(null);
            setOk('Fuente registrada con éxito.');
        })
        .catch(err => {
            console.log(err);
            setOk(null);
            setMistake('No hemos podido crear esta fuente.');
        })
        return send;
    }
    return (
        <div className='newFuente'>
            <div className='modalNewContainer'>
                <div className='form'>
                    <div className='title'>
                        <h1>Nueva fuente</h1>
                        <button onClick={() => {
                            params.delete('w');
                            setParams(params);
                        }}>
                            <MdClose className="icon" />
                        </button>
                    </div>
                    <div className='containerForm'>
                        <div className="inputDiv">
                            <label htmlFor="">Nombre de la fuente</label><br />
                            <input type="text" placeholder='Ej. Feria en Cali' onChange={(e) => {
                                setMistake(null);
                                setForm({
                                    ...form,
                                    name:e.target.value
                                })
                            }} defaultValue={form.name}/>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="">Pequeña descripción de la fuente</label><br />
                            <input type="text" placeholder='Escribe aquí...' onChange={(e) => {
                                setMistake(null);
                                setForm({
                                    ...form,
                                    description:e.target.value
                                })
                            }} defaultValue={form.description} /> 
                        </div>
                        <div className="inputDiv">
                            {mistake ? <span className='mistake'>{mistake}<br /><br /></span> : null }
                            {ok ? <span className='mistake'>{ok}<br /><br /></span> : null } 

                            <button onClick={() => {send()}}>
                                <span>Crear fuente</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}