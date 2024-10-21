import React from 'react';
import Box from './box';

export default function BoxTop(props){
    const clients = props.clients;
    return (
        <div className='boxTopBox'>
            <div className='containerBox'>
                <Box type='Intentos' clients={clients}/>
                <Box type='Contacto' clients={clients}/>
                <Box type='Visita' clients={clients}/>
                <Box type='Cotizaciones' clients={clients}/>

            </div>
        </div>
    )
}