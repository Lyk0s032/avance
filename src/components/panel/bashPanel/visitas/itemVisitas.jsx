import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import NubeVisita from './nubevisitas';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';

export default function ItemVisitas(props){
    const item = props.item;



    const [params, setParams] = useSearchParams();
    const [clic, setClick] = useState(false);

    const [call, setCall] = useState('one');
    const dispatch = useDispatch();


    const open = async (cliente) => {
        dispatch(actions.ActionGetCliente(cliente));
        params.set('w', 'action');
        params.set('y', 'Visita');
        setParams(params);
    }


    return (
        <tr>
            <td>
                <div className='prospectProfile'>
                    <div className='cl'>    
                        <h2 className="business">{item.nombreEmpresa ? item.nombreEmpresa : item.name}</h2>
                        <h3 className="businessPersona">{item.name}</h3>

                        <span className="phone">{item.phone}</span><br />
                    </div>
                </div>
            </td>
            <td>
                <div className='prospectProfile'>
                    <div className='containerAsesor'>
                        <div className='img'>
                            <img src={item.user.photo} alt="" />
                        </div>
                        <div className='data'>
                            <h3>{item.user.name}</h3>
                            <span>{item.user.rango}</span>
                        </div>
                    </div>
                </div>
            </td>

            <td>
                {
                            item.calendarios && item.calendarios.length ?
                                item.calendarios.map((r, i) => {
                                    return (
                                        r.type == 'Solicita una visita este cliente' ?
                                            <span>{r.fecha}</span>    
                                        :null
                                    )
                                })
                            : <span>...</span>
                    }
            </td>
            <td>
                <div className='tryButton'>

                    <button className='tt Active'>
                        <div className='icono' onClick={() => {
                            setClick(!clic);
                            open(item);
                        }}>
                            <BsQuestion className='icon' />
                        </div>
                        <div className='stateBtn'>
                            {
                                <div>
                                    Estado de la llamada
                                </div>
                            }
                        </div>
                    </button>
                    
                </div> 
            </td>
 
        </tr>
    )
}