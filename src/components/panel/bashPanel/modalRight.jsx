import React from 'react';
import { MdClose, MdOutlineSettings } from 'react-icons/md';
import { useSelector } from 'react-redux';
import PrimerIntento from './acciones/primerIntento';
import { useSearchParams } from 'react-router-dom';
import ContactoIntento from './acciones/contactoIntento';
import VisitaIntento from './acciones/visitaIntento';
import EditClient from './acciones/editClient';

export default function ModalRight(props){
    const usuario = props.usuario;
    const clients = props.clients;
    const item = useSelector(store => store.cliente);
    const [params, setParams] = useSearchParams();
    console.log(item)
    return (
        <div className="rightNube">
            {params.get('watch') == 'edit' ? <EditClient clients={clients} usuario={usuario} /> : null}

                <div className='header'>
                    <button onClick={() => {
                        params.delete('w');
                        params.delete('y');
                        setParams(params);
                    }}>
                        <MdClose className="icon" />
                    </button>
                </div>

            <div className='nubeA'>
                <div className='infoR'>
                    <div className='ficha'>
                        <div className="headerFicha">
                            <h3>
                                Ficha Tecnica
                            </h3>
                            <button onClick={() => {
                                params.set('watch', 'edit');
                                setParams(params);
                            }}>
                                <MdOutlineSettings className="icon" />
                            </button>
                        </div>
                        <div className='propiedades'>
                            <div className="clientInformation">
                                <div className="parte">
                                    <span>Empresa:</span>
                                    <h3>{item.nombreEmpresa}</h3>
                                    <h3 className='usuario'>{item.name}</h3>
                                    <h3 className='phone'>{item.phone}</h3>
                                    <h3 className='phone'>{item.direccion}</h3>
                                    <h3 className='url'>{item.url}</h3>
                                    <h3 className='phone'>{item.fijo}</h3><br /><br />

                                    <h1 style={{fontSize:'14px', fontWeight:'100'}}>Actualmente en {item.state}</h1>

                                </div>
                            </div>
                            <div className="registroActividades">
                                <div className="headerActivity">
                                    <h3>Registro de acciones</h3>
                                </div>
                                <div className="registros">

                                {
                                    item.registers && item.registers.length ?
                                        item.registers.map((reg, i) => {
                                            return (
                                                    <div className="registro">
                                                        <div className="headerRegistro">
                                                            <span>{reg.createdAt.split('T')[0]} - <strong>En {reg.type}</strong></span>
                                                        </div>
                                                        <div className="note">
                                                            <span>{reg.note ? reg.note : 'No hay nota disponible'}</span><br />
                                                        </div>
                                                        <div className="tagsRegistro">
                                                            {
                                                                reg.tags && reg.tags.length ?
                                                                    reg.tags.map((tag, i) => {
                                                                        return (
                                                                            <button key={i+1}>
                                                                                <span>{tag}</span>
                                                                            </button>
                                                                        )
                                                                    })
                                                                : null
                                                            }
                                                        </div>
                                                    </div>
                                            )
                                        })
                                    :
                                    <div className="notFound">
                                        <h1>No encontrado</h1>
                                    </div>                                        
                                }
                                </div>

                            </div>
                        </div>
                       
                    </div>
                </div>
                {
                        params.get('y') ?
                
                <div className="acciones" style={item.state == 'cotizacion' || item.state == 'espera' || item.state == 'perdido' ? {display:'none'} : null}>
                    {

                        !item ?
                            <div>
                                <h1>Selecciona un item</h1>
                            </div>
                        : params.get('y') == 'Primer' ?
                            <PrimerIntento item={item} clients={clients} />
                        : params.get('y') == 'Segundo' ?
                            <ContactoIntento usuario={usuario} item={item} clients={clients} /> 
                        : params.get('y') == 'Visita' ?
                            <VisitaIntento usuario={usuario} item={item} clients={clients} />    
                        :null
                    }
                </div>
                        :null

                }
            </div>
            
        </div>
    )
}