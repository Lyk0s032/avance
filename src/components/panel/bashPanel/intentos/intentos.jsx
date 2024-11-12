import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import ItemIntento from './itemIntento';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';

export default function Intentos(props){
    const dispatch = useDispatch();
    const intentos = useSelector(store => store.intentos);
    const loading = useSelector(store => store.loadingIntentos);
    const clients = props.clients;
    const [stateShow, setStateShow] = useState('intento 1');
    useEffect(() => {
        dispatch(actions.AxiosGetIntentos(true));
    }, [])
    return (
        <div className='intentos'>
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Intentos <span>({intentos ? intentos.length : 'Cargando...'})</span></h3>
                    </div>
                    <div className='filters'>
                        <button className={stateShow == 'intento 1' ? 'Active' : null} onClick={() => setStateShow('intento 1')}>
                            <span>Primer intento </span>
                        </button>
                        <button className={stateShow == 'intento 2' ? 'Active' : null} onClick={() => setStateShow('intento 2')}>
                            <span>Segundo intento</span>
                        </button>
                        <button className={stateShow == 'intento 3' ? 'Active' : null} onClick={() => setStateShow('intento 3')}>
                            <span>Tercer intento </span>
                        </button>
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Primero Intento</th>
                                <th>Segundo Intento</th>
                                <th>Tercer Intento</th>

                            </tr>
                        </thead>
                        {
                            loading || !intentos ?
                                <div className="loading">
                                    <h1>Cargando...</h1>
                                </div>
                            :
                            <tbody>
                                {
                                    intentos && intentos.length ?
                                        intentos.map((item, i) => {
                                            return (
                                                item.state == stateShow ?
                                                    <ItemIntento key={i+1} item={item} clients={clients}/>
                                                :
                                                null
                                            )
                                        })
                                    :null
                                }
                            </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}