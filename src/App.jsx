import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/index.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './components/panel/dashboard'
import PanelSign from './components/sign/sign'
import * as actions from './components/store/action/action';
import { useDispatch, useSelector } from 'react-redux'
import PanelDashboard from './components/panel/panelDashboard'

function App() {
  const user = useSelector(store => store.usuario);
  const loadingUser = useSelector(store => store.loadingUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const log = JSON.parse(window.localStorage.getItem("loggedPeople"));
    if(log && !user){
        console.log('si hay token');
        console.log(log);
        dispatch(actions.AxiosAuthUser(log, true));
    }else{
      console.log('No hay token');
    }
  }, []);
  return (
    <div className="d">
      <Router>
            <Routes>
              <Route path="/" element={user ? <Navigate to="/panel" /> : <Navigate to="/sign" />} />
              <Route path="/sign/*" element={user ? <Navigate to="/panel" /> : <PanelSign />} />
              <Route path="/panel/*" element={!user ? <Navigate to="/sign" /> :<PanelDashboard /> } />
            </Routes>
      </Router>
    </div>
  )
}

export default App
