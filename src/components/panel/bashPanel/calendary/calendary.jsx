import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import ItemCalendary from './itemCalendary';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';

export default function Calendary(){

    const dispatch = useDispatch();
    const calendario = useSelector(store => store.calendario);
    const loading = useSelector(store => store.loadingCalendario);

    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        dispatch(actions.AxiosGetCalendario(true))
    }, [])
    return ( 
        <div className='calendaryModal'>
            <div className='containerCalendary'>
                <div className="boxCalendary">
                    <div className="headerCalendary">
                        <div className='title'>
                            <h3>Calendario</h3>
                        </div>
                        <div className="close" onClick={() => {
                            params.delete('w');
                            setParams(params);
                        }}>
                            <button>
                                <MdClose className="icon" />
                            </button>
                        </div>
                    </div>
                    <div className='scrollContainer'>
                        {
                            loading || !calendario ?
                                <h1>Cargando...</h1>
                            :
                            calendario && calendario.length ?
                                calendario.map((item, i) => {
                                    return (
                                        <ItemCalendary item={item} state={'Pendiente'} key={i+1} />
                                    )
                                })
                            : <h1>No hay registro en el calendario</h1>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}