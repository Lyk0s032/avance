import React from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/action/action';

export default function ItemNoti(props){
    const noti = props.noti;
    const [params, setParams] = useSearchParams();
    const dispatch = useDispatch();
    const sendOpen = async (cliente, see) => {
        dispatch(actions.ActionGetCliente(cliente));
        params.set('w', 'action');
        params.set('y', 'Segundo');

        setParams(params);
    }

    // Diferencia de días
    const currently = dayjs().format('MM/DD/YYYY');
    const fecha = dayjs(noti.fecha, 'MM/DD/YYYY');
    const delta = fecha.diff(currently, 'day');
    return (
        <div className="noti" onClick={() => {
            sendOpen(noti.client)
        }}>
            <div className="containerNoti">
                <div className="calendarImg">
                    <img src={noti && noti.client.user ? noti.client.user.photo : 0} alt="" />
                </div>
                <div className="dataNotification">
                    <h3>{noti.client.user ? noti.client.user.name : 'Sin asesor'}</h3>
                    <span>{noti.type} <strong>{noti.client.nombreEmpresa}</strong></span><br />
                    <strong style={{color: 'green',fontSize:'14px'}}>En {noti.client.state}</strong>
                    <br /><br />
                    {
                        delta == 1 ?
                            <strong className='para'>Para mañana - {fecha.format('D [de] MMMM [de] YYYY')}</strong>
                        : 
                        delta == 2 ?
                            <strong className='para'>Para pasado mañana - {fecha.format('D [de] MMMM [de] YYYY')}</strong>
                        :
                            <strong className='para'>Para el {fecha.format('D [de] MMMM [de] YYYY')}</strong>

                    }
                </div>
            </div>
        </div>
    )
}