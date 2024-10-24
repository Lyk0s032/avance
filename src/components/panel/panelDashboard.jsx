import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './dashboard';
import * as actions from './../store/action/action';
import { Navigate } from 'react-router-dom';

export default function PanelDashboard(){
    const usuario = useSelector(store => store.usuario);
    const loading = useSelector(store => store.loadingUser);
    useEffect(() => {
        !usuario ? <Navigate path="/sign" /> : null        
    }, [usuario])
    return (
        !usuario || loading ?
            <h1>AJustando panel</h1>
        : 
            <Dashboard user={usuario} />
    )
}