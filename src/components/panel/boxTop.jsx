import React from 'react';
import Box from './box';

export default function BoxTop(props){
    const clients = props.clients;
    const user = props.user;
    return (
        <div className='boxTopBox'>
            <div className='containerBox'>
                { user.rango == 'lider' ? <Box type='Intentos' user={user} clients={clients}/> : null }
                <Box type='Contacto' user={user} clients={clients}/>
                <Box type='Visita' user={user} clients={clients}/>
                <Box type='Cotizaciones' user={user} clients={clients}/>

            </div> 
        </div>
    )
}