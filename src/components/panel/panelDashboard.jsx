import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './dashboard';
import * as actions from './../store/action/action';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PanelDashboard(){
    const usuario = useSelector(store => store.usuario);
    const loading = useSelector(store => store.loadingUser);
    const navigate = useNavigate();
    useEffect(() => {
        if(!usuario && !loading){
            console.log('redirecciona');
            navigate('/sign');

        }
    }, [usuario])
    return ( 
        !usuario && loading ?
            <div className="loadingPanel">
                <div className='containerLoading'>
                    <h1>Accediendo...</h1>
                    <span>Estamos ordenando tu espacio de trabajo, esto puede tomar unos segundos.</span>
                </div>
            </div>
        : 
            <Dashboard user={usuario} />
    )
}