import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardDefault from './defaultDashboard';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../store/action/action';
export default function Dashboard(){
    const dispatch = useDispatch();
    const clients = useSelector(store => store.clients);
    const loadingClients = useSelector(store => store.loadingClients);

    useEffect(() => {
        dispatch(actions.AxiosGetClients(true));
    }, [])
    return (
        <div className="dashboard">
            {
                loadingClients || !clients ?
                    <h1>Cargando...</h1>
                :
                <Routes>
                    <Route path="/*" element={<DashboardDefault clients={clients}/>} />
                </Routes>
            }
        </div>
    )
}