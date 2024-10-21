import React from 'react';

export default function ItemCalendary(props){
    const item = props.item;
    const state = props.state;

    const unDia = 1000 * 60 * 60 * 24;

    const hoy = new Date();
    const fechaRegistro = new Date(item.fecha);

    const diferenciaMilisegundo = fechaRegistro - hoy;

    const diferenciaEnDias = Math.round(diferenciaMilisegundo / unDia);
    return (
        <div className='itemCalendario'>
            <div className="containerCalendario">
                <div className='Time'>
                    <h3>{new Date(item.fecha).getDate()}</h3>
                    <span>{new Date(item.fecha).toLocaleDateString('es-ES', {month: 'long'})}</span>
                </div>
                <div className={`containerInformation ${diferenciaEnDias > 2 ? 'Pendiente' : diferenciaEnDias > -2 && diferenciaEnDias < 2 ? 'Cerca' : 'Paso'}`}>
                    <h3>{item.client.nombreEmpresa}</h3>
                    <span>
                        {
                            item.type
                        }
                    </span><br />
                    <span>{diferenciaEnDias > 2 ? 'Faltan' : diferenciaEnDias >= 0 && diferenciaEnDias <= 2 ? 'Cerca: ' : 'Hace: '} {diferenciaEnDias} Días</span>
                </div>
            </div>
        </div>
    )
}