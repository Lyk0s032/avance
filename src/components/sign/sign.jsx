import React, { useEffect, useState } from 'react';
import { signIn } from '../action';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../store/action/action';

export default function PanelSign(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usuario = useSelector(store => store.usuario);

    const [data, setData] = useState({
        email: null,
        password: null,
    });

    const [mistake, setMistake] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        if(!data.email || !data.password){
            setLoading(false);
            setMistake('No puedes dejar campos vacios');
        
        }else{
            const sign = await signIn(data)
            .then(async (res) => {
                setLoading(false);
                console.log(res)
                if(res && res.status == 200){
                    setMistake(null);
                    console.log(res.data)
                    window.localStorage.setItem("loggedPeople", JSON.stringify(res.data.data))
                    return res.data;
                }else if(res == 404){
                    return setMistake('No hemos contrado este usuario');
                }else if(res == 401){
                    return setMistake('Contraseña incorrecta');
                }else{
                    return setMistake('Ha ocurrido un contra tiempo, intentalo más tarde')
                }

            })
            .catch(err => {
                console.log(err);
                console.log('Aca falla')
                setLoading(false);
                return null;
            });

            if(sign){
                console.log(sign)
                dispatch(actions.AxiosAuthUser(sign.data, true))
            }
                
        }
    }

    useEffect(() => {
        usuario ? navigate('/panel/') : console.log('No ha iniciado sección')
    
    }, [usuario])
    return (
        <div className='sign'>
            <div className='containerSign'>
                <div className='img'>
                    <img src="https://metalicascosta.com.co/assets/img/logo_metalicas_costa.png" alt="" />
                </div>
                <div className="form">
                    <div className="inputDiv">
                        <label htmlFor="">Número de teléfono</label><br />
                        <input type="text" placeholder='Escribe aquí...' 
                        onChange={(e) => {
                            setData({
                                ...data,
                                email: e.target.value
                            })
                        }} defaultValue={data.email}/>
                    </div>
                    <div className="inputDiv">
                        <label htmlFor="">Contraseña</label><br />
                        <input type="password" placeholder='Escribe aquí...'
                        onChange={(e) => {
                            setData({
                                ...data,
                                password: e.target.value
                            })
                        }} defaultValue={data.password} />
                    </div>
                    <div className="inputDiv">
                        <button onClick={() => handleSubmit()}>
                            <span>Acceder</span>
                        </button>
                    </div>
                    {mistake ? <span>{mistake}</span>: null}
                    {loading ? <h1>Cargando...</h1> : null}
                </div>
            </div>
        </div>
    )
}