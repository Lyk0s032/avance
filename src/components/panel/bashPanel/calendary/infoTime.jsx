import React from 'react';
import { useSelector } from 'react-redux';

export default function InfoTime(){


    const item = useSelector(store => store.calendary);
    
    
    const unDia = 1000 * 60 * 60 * 24;

    const hoy = new Date();
    const fechaRegistro = new Date(item ? item.fecha : null);

    const diferenciaMilisegundo = fechaRegistro - hoy;

    const diferenciaEnDias = Math.round(diferenciaMilisegundo / unDia);
    console.log(item)
    return (
        <div className="infoTime">
            {
                item ?
            <div className="containerInfoTime">
                <div className="asesorBy">
                    <span>Encargado:</span>
                    <div className="asesorRes">
                        <img src={item.client.user.photo} alt="" />
                        <div className="resultadoAsesor">
                            <h3>{item.client.user.name}</h3>
                            <span>Asesor</span> 
                        </div>
                    </div>
                </div>
                <div className="titleInfoTime">
                    <span>Cliente: </span>
                    <div className="cl">
                        <h1>{item.client.nombreEmpresa}</h1>
                        <h3>{item.client.name}</h3>
                        <span>{item.client.phone}</span><br />
                        <span>{item.client.email}</span><br />
                        <span>{item.client.direccion}</span><br />
                        <span>{item.client.fijo}</span><br />
                        <span>{item.client.url}</span><br />
                    </div>
                    <div className="tagsCal">
                        <button>
                            <span>Mobiliario</span>
                        </button>
                        <button>
                            <span>Diseño de oficina</span>
                        </button>
                    </div>
                </div>
                <div className="calendaryInfo">
                    <div className="time">
                        <div className="boxTime">
                            <h1>{new Date(item.fecha).getDate()}</h1>
                            <span>{new Date(item.fecha).toLocaleDateString('es-ES', {month: 'long'})}</span>
                        </div>
                    </div>
                    <div className="title">
                        <span>Acción:</span>
                        <h1>{item.type}</h1><br />
                        <span>Estado actual en el embudo:</span>
                        <h3>En <strong>{item.client.state}</strong></h3><br />
                        <span>Tiempo: </span>
                        <h4>{diferenciaEnDias > 2 ? 'Faltan' : diferenciaEnDias >= 0 && diferenciaEnDias <= 2 ? 'Cerca: ' : 'Hace: '} {Math.abs(diferenciaEnDias) + ' Días '}</h4>
                    </div>
                </div>
                <div className="registerDiv">
                    <div className="headerRegisters">
                        <h3>Registro de acciones</h3>
                    </div>
                    <div className="registros">
                        {
                            item.client.registers && item.client.registers.length ?
                                item.client.registers.map((reg, i) => {
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
                            : <span>No hay registro de acciones</span>
                        }
                    </div>
                </div>
            </div>
                : <div className="containerInfoTime">
                    <h1>Selecciona un registro</h1>
                </div>
            }
        </div>
    )
} 