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

        
        if(user.user.rango == 'lider'){
            dispatch(actions.AxiosGetClients(true))
            dispatch(actions.AxiosGetNotifications(true))
        }else{
            dispatch(actions.AxiosGetClientsByAsesor(true, user.user.id));
            dispatch(actions.AxiosGetNotifications(true, user.user.id));

        }
    }, [])
    return (
        <div className="dashboard">
            {
            !usuario || loadingUsuario ?
            <div className="loadingPanel">
                <div className='containerLoading'>
                    <h1>Revisando estado de la cuenta...</h1>
                    <span>Para nosotros es muy importante, que todas las funciones esten a tu alcance.</span>
                </div>
            </div>
            :
                loadingClients || !clients ?
                <div className="loadingPanel">
                    <div className='containerLoading'>
                        <h1>Cargando base de clientes...</h1>
                        <span>Todo esta en orden, solo estamos ordenando tus prospectos y clientes.</span>
                    </div>
                </div>
                :
                <Routes>
                    <Route path="/*" element={<DashboardDefault user={usuario.user} clients={clients}/>} />
                </Routes>
            }
        </div>
    )
}