import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/action/action';
import ItemNoti from './itemNoti';

export default function Notification(){
    const dispatch = useDispatch();
    const notifications = useSelector(store => store.notifications);
    const loading = useSelector(store => store.loadingNotifications);
    const [params, setParams] = useSearchParams();

    console.log(notifications)

    
    return (
        <div className="notifications" id="notification" >
            <div className="dark" onClick={() => {
                document.querySelector('#notification').classList.toggle('notificationActive')
            }}></div>
            <div className="containerNotification">
                <div className="headerNotification">
                    <h3>
                        Centro de notificaciones
                    </h3>
                </div>
                {
                !notifications || loading ?
                <div className="scrollContainer">
                    <h1>Cargando...</h1>
                </div>
                :
                !notifications || notifications == 404 ?
                <div className="NotFound">
                    <h1>No found</h1>
                </div>
                :
                <div className="scrollContainer">
                    {
                        notifications && notifications.length ?
                        notifications.map((noti,i) => {
                            return (
                                <ItemNoti noti={noti} key={i+1} />
                            )
                        })
                        :
                        <h1>Sin notificaciones</h1>
                    }


                </div>
                }
            </div>
        </div>
    )
}