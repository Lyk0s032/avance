import React from 'react';

export default function NavTop(props){
    const user = props.user;
    return (
        <div className='navTop'>
            <div className='container'>
                <div className='logo'>
                    <img src="https://metalicascosta.com.co/assets/img/logo_metalicas_costa.png" alt="" />
                </div>
                <div className="logged">
                    <div className='containerLogged'>
                        <img src={user.photo} alt="" />
                        <div className='infoLogged'>
                            <h3>{user.name}</h3>
                            <span>{user.rango == 'lider' ? 'Lider de área' : 'Asesor/a'}</span>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}