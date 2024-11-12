import React, { useEffect } from 'react';
import { useSearchParams  } from 'react-router-dom';
import { Calendar, dayjsLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import 'dayjs/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { MdArrowRight, MdClose } from 'react-icons/md';
import { BsArrowBarRight } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';
import InfoTime from './infoTime';
import * as actions from './../../../store/action/action';
import { useDispatch, useSelector } from 'react-redux';
import { FcPrevious } from 'react-icons/fc';

dayjs.locale('es');

export default function Calendario(){
    const [params, setParams] = useSearchParams();

    const localizer = dayjsLocalizer(dayjs);


    const dispatch = useDispatch();


    const calendario = useSelector(store => store.calendario);
    const loading = useSelector(store => store.loadingCalendario);


    useEffect(() => {
        dispatch(actions.AxiosGetCalendario(true))
    }, [])

    const component = {
        event: props => {
            return <div className='itemCalendario' onClick={() => {
                console.log('Clicqueado');
                console.log(props);
                dispatch(actions.GET_CALENDARY(props.event.data))
                document.querySelector("#visualizator").classList.toggle('VisualizatorActive')
            }}>
                <div className="containerItem">
                    <div className="asesor">
                        <div className="img">
                            <img src="https://res.cloudinary.com/dr8pv3hga/image/upload/v1730303001/crm-usuarios/felipe_ixagdn.jpg" alt="" />
                        </div>
                        <div className="data">
                            <h3>Bryan</h3>
                            <span>Asesor</span>
                        </div>

                    </div>
                    <div className="client">
                        <h3>{props.event.data.client.nombreEmpresa ? props.event.data.client.nombreEmpresa.length > 16 ? props.event.data.client.nombreEmpresa.slice(0, 15)+'...' : props.event.data.client.nombreEmpresa : props.event.data.client.nombre}</h3>
                        <span>
                            {props.event.data.type}
                        </span>
                    </div>
                </div>
            </div>
        }
    }

    const messages = {
        today: 'Hoy',
        previous: 'Semana anterior',
        next: 'Semana siguiente'
    }
    return (
        <div className="calendarioModal">
            <div className="calendarioContainer">
                <div className="header">
                    <button onClick={() => {
                        params.delete('w');
                        setParams(params);
                    }}>
                        x
                    </button>
                </div>
                <div className="containerDivideCalendario">

                    <div className="RightDesc">
                        <div className="containerDescRight">
                            {
                                !calendario || loading ?
                                <div className="loading">
                                    <div className="dataLoading">
                                        <h1>Cargando calendario de actividades</h1>
                                        <span>Adaptando entorno...</span>
                                    </div>
                                </div>
                                :
                                <div className="reactBig">
                                    <Calendar 
                                    localizer={localizer}
                                    culture='es'
                                    messages={messages}
                                    events={calendario.map((cal, i) => {
                                        return (
                                            {
                                                start: dayjs(cal.fecha).toDate(),
                                                end: dayjs(cal.fecha).toDate(),
                                                data: cal
                                            }
                                        )
                                    })}
                                    views={['week']}
                                    view='week' 
                                    formats={{
                                        weekdayFormat: date => {
                                            return dayjs(date).format('MM/DD/YYYY')
                                        }
                                    }}
                                    components={component}
                                    />
                                        
                                </div>
                            }

                        </div>

                        
                        <div className="Visualizator" id="visualizator">
                            <div className="header">
                                <button onClick={() => {
                                    document.querySelector("#visualizator").classList.toggle('VisualizatorActive')

                                }}>
                                    <AiOutlineArrowRight className="icon" />
                                </button>
                            </div>
                            <div className="containerType">
                                <InfoTime />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}