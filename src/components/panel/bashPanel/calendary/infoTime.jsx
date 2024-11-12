import React from 'react';
import { useSelector } from 'react-redux';

export default function InfoTime(){


    const item = useSelector(store => store.calendary);
    
    
    const unDia = 1000 * 60 * 60 * 24;

    const hoy = new Date();
    const fechaRegistro = new Date(item ? item.fecha : null);

    const diferenciaMilisegundo = fechaRegistro - hoy;

    const diferenciaEnDias = Math.round(diferenciaMilisegundo / unDia);

    return (
        <div className="infoTime">
            {
                item ?
            <div className="containerInfoTime">
                <div className="asesorBy">
                    <span>Encargado:</span>
                    <div className="asesorRes">
                        <img src="https://res.cloudinary.com/dr8pv3hga/image/upload/v1730303001/crm-usuarios/felipe_ixagdn.jpg" alt="" />
                        <div className="resultadoAsesor">
                            <h3>Brayan Ortega</h3>
                            <span>Asesor</span> 
                        </div>
                    </div>
                </div>
                <div className="titleInfoTime">
                    <span>Cliente: </span>
                    <div className="cl">
                        <h1>{item.client.nombreEmpresa}</h1>
                        <h3>{item.client.name}</h3>
                        <span>{item.client.phone}</span>
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
            </div>
                : <div className="containerInfoTime">
                    <h1>Selecciona un registro</h1>
                </div>
            }
        </div>
    )
} 