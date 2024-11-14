import React from 'react';
import NavTop from './navigation';
import BoxTop from './boxTop';
import { BsCalendar } from 'react-icons/bs';
import RoutesPanel from './bashPanel/routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Graph from './graph';
import ByAsesorPanel from './bashPanel/visualizar/byAsesor';

export default function DashboardDefault(props){
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const clients = props.clients;
    const user = props.user;

    return (
        <div className='dashb'>
            <NavTop user={user}/>
            {
                params.get('view') == 'asesores' ?
                    <ByAsesorPanel asesores={clients.asesores ? clients.asesores : null}  /> 

                :
                    null
            }
            <div className='dashPanel'>
                <div className='center'>
                    <div className='boxTop'>
                        <BoxTop clients={clients} user={user} />
                    </div>
                    <div className='map'>
                        <RoutesPanel clients={clients} user={user} />
                    </div>
                </div>
                <div className='right'>
                    <div className="topRight">
                        <div className="containerRight">
                            {
                                user.rango == 'lider' ?
                                    <div className='box Prospect' onClick={() => {
                                        navigate('/panel');
                                    }}>
                                        <div className='title'>
                                             <span>Prospectos</span>
                                        </div>
                                    </div>
                                : null
                            }
                            

                            <div className={user.rango == 'lider' ? 'box Coti' : 'box Coti Asesor'} onClick={() => navigate('/panel/aprobadas')}>
                                <div className='title'>
                                    <span>Cotizaciones exitosas</span>
                                </div>
                                <h1>
                                    {clients.aprobadas && clients.aprobadas.length ? clients.aprobadas.length : 0}
                                </h1>
                            </div>
                        </div>
                        <div className="graph">
                            <Graph clientes={clients.aprobadas ? clients.aprobadas : 0} asesor={clients.asesor} />
                        </div>
                        <div className="calendary" onClick={() => {
                            params.set('w', 'calendario');
                            setParams(params);
                        }}>
                            <div className='containerCal'>
                                <div className='left'>
                                    <h1 style={{fontSize:'18px'}}>Calendario de actividades</h1><br />
                                </div>
                                <div className="icono">
                                    <BsCalendar className='icon' />
                                </div>
                            </div>
                        </div>

                        <div className='bottonOptions'>
                            <button className='new' onClick={() => {
                                params.set('w', 'fuente');
                                setParams(params);
                            }}>
                                <span>Nueva fuente</span>
                            </button>
                            <button className="info" onClick={() => navigate('/panel/espera')}>
                                <span>Espera ({clients.espera ? clients.espera.length : 0})</span>
                            </button>
                            <button className="info" onClick={() => navigate('/panel/perdido')}>
                                <span>Perdido ({clients.perdido ? clients.perdido.length : 0})</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}