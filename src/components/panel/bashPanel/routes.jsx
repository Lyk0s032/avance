import React from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Prospectos from "./prospecto/prospect";
import NewFuente from "./nuevaFuente";
import Intentos from "./intentos/intentos";
import Contacts from "./contacts/contacts";
import Visitas from "./visitas/visitas";
import Cotizaciones from "./cotizaciones/cotizaciones";
import Calendary from "./calendary/calendary";
import Espera from "./espera/espera";
import Aprobadas from "./aprobadas/aprobadas";
import Perdido from "./espera/perdido";
import ModalRight from "./modalRight";
import Calendario from "./calendary/calendario";

export default function RoutesPanel(props){
    const usuario = props.user;
    const clients = props.clients;
    console.log(usuario)
    const [params, setParams] = useSearchParams();
    return (
        <div className="routes">
            <Routes>
                <Route path="/*" element={usuario.rango == 'lider' ? <Prospectos clients={clients} /> : <WelcomenAsesor usuario={usuario} />} />
                <Route path="/try/*" element={<Intentos clients={clients} />} />
                <Route path="/contacts/*" element={<Contacts usuario={usuario} />} />
                <Route path="/visita/*" element={<Visitas usuario={usuario}/>} />
                <Route path="/cotizaciones/*" element={<Cotizaciones usuario={usuario} />} />
                <Route path="/aprobadas/*" element={<Aprobadas clients={clients} usuario={usuario} />} />
                <Route path="/espera/*" element={<Espera clients={clients} usuario={usuario} />} />
                <Route path="/perdido/*" element={<Perdido clients={clients} usuario={usuario}/>} />
            
            </Routes>

            {
                params.get('w') == 'fuente' ?
                    <NewFuente clients={clients}/>
                : params.get('w') == 'calendario' ?
                    <Calendario usuario={usuario}/>
                :
                params.get('w') == 'action' ?
                    <ModalRight clients={clients} usuario={usuario} />
                :null
            }                    
        </div>
    )
}

function WelcomenAsesor(props){
    const usuario = props.usuario;
    return (
        <div className="welcomenAsesor">
            <div className="hello">
                <h1>
                    Bienvenido/a, {usuario.name}. 
                </h1>
                <h3>Toma el control de todo tu espacio comercial</h3>
            </div>
        </div>
    )
}