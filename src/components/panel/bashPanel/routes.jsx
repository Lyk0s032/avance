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

export default function RoutesPanel(props){
    const usuario = props.user;
    const clients = props.clients;
    const [params, setParams] = useSearchParams();
    return (
        <div className="routes">
            <Routes>
                <Route path="/*" element={<Prospectos clients={clients} />} />
                <Route path="/try/*" element={<Intentos clients={clients} />} />
                <Route path="/contacts/*" element={<Contacts usuario={usuario} />} />
                <Route path="/visita/*" element={<Visitas usuario={usuario}/>} />
                <Route path="/cotizaciones/*" element={<Cotizaciones usuario={usuario} />} />
                <Route path="/aprobadas/*" element={<Aprobadas clients={clients} usuario={usuario} />} />
                <Route path="/espera/*" element={<Espera clients={clients} />} />
                <Route path="/perdido/*" element={<Perdido clients={clients} />} />
            
            </Routes>

            {
                params.get('w') == 'fuente' ?
                    <NewFuente clients={clients}/>
                : params.get('w') == 'calendario' ?
                    <Calendary />
                :null
            }
        </div>
    )
}