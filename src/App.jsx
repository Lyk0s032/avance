import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/panel/dashboard'

function App() {

  return (
    <div className="d">
      <Router>
          <Routes>
            <Route path="/" element={<h1>Bienvenido</h1>} />
            <Route path="/panel/*" element={<Dashboard />} />
          </Routes>
      </Router>
    </div>
  )
}

export default App
