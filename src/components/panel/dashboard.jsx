import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import DashboardDefault from './defaultDashboard';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../store/action/action';


export default function Dashboard(props){
    const user = props.user;
    const usuario = useSelector(store => store.usuario);
    const loadingUsuario = useSelector(store => store.loadingUsuario);

    const dispatch = useDispatch();
    const clients = useSelector(store => store.clients);
    const loadingClients = useSelector(store => store.loadingClients);
    const navigate = useNavigate();
 
    useEffect(() => {
        !user ? <Navigate path="sign/" /> : null 
        user.user.rango == 'lider' ? 
            dispatch(actions.AxiosGetClients(true))
        :
            dispatch(actions.AxiosGetClientsByAsesor(true, user.user.id));
    }, [])
    return (
        <div className="dashboard">
            {
            !usuario || loadingUsuario ?
                <h1> Cargando panel...</h1>
            :
                loadingClients || !clients ?
                    <h1>Cargando clientes</h1>
                :
                <Routes>
                    <Route path="/*" element={<DashboardDefault user={usuario.user} clients={clients}/>} />
                </Routes>
            }
        </div>
    )
}