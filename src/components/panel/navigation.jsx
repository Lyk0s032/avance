import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function NavTop(props){
    const user = props.user;
    const [params, setParams] = useSearchParams();

    return (
        <div className='navTop'>
            <div className='container'>
                <div className='logo'>
                    <img src="https://metalicascosta.com.co/assets/img/logo_metalicas_costa.png" alt="" />
                </div>
                <div className='visualizar'>
                    {
                        user.rango == 'lider' ?
                    
                    <div className="asesores">
                        <button onClick={() => {
                            params.set('watch', 'asesores');
                            setParams(params);
                        }}>
                            <span>Visualizar asesores</span>
                        </button>
                    </div>
                        :null
                    }
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
        </div>
    )
}