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
        dispatch(actions.AxiosAuthUser(log, true));
    }
  }, []);
  return (
    <div className="d">
      <Router>
            <Routes>
              <Route path="/" element={<h1>Bienvenido</h1>} />
              <Route path="/sign/*" element={<PanelSign />} />
              <Route path="/panel/*" element={<PanelDashboard /> } />
            </Routes>
      </Router>
    </div>
  )
}

export default App
