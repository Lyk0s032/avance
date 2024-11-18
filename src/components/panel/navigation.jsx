import React from 'react';
import { MdOutlineNotifications, MdOutlineNotificationsActive } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export default function NavTop(props){
    const user = props.user;
    const [params, setParams] = useSearchParams();

    const notifications = useSelector(store => store.notifications);
    return (
        <div className='navTop'>
            <div className='container'>
                <div className='logo'>
                    <img src="https://metalicascosta.com.co/assets/img/logo_metalicas_costa.png" alt="" />
                </div>
                
                <div className='visualizar'>
                    <div className="search">
                        <input type="text" className="searchInput" placeholder='Buscar' onClick={() => {
                            params.set('v', 'prospects');
                            setParams(params); 
                        }}/>
                    </div>
                    {
                        user.rango == 'lider' ?
                    
                    <div className="asesores">
                        <button onClick={() => {
                            params.set('view', 'asesores');
                            setParams(params); 
                        }}>
                            <span>Visualizar asesores</span>
                        </button>
                    </div>
                        :null
                    }
                    {
                        <div className="notification"> 
                            <button className='icon' onClick={() => {
                                document.querySelector('#notification').classList.toggle('notificationActive')
                            }}>
                                {
                                    notifications && notifications.length ? 
                                        <MdOutlineNotificationsActive className='icon ActiveNoti' />
                                    :
                                        <MdOutlineNotifications className='icon' />

                                }
                                <span className={notifications && notifications.length ? 'ActiveNoti' : null}>{notifications.length}</span>
                            </button>
                        </div>
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