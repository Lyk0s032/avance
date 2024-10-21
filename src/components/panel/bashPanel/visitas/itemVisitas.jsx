import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import NubeVisita from './nubevisitas';
import { useDispatch, useSelector } from 'react-redux';

export default function ItemVisitas(props){
    const item = props.item;



    const [params, setParams] = useSearchParams();
    const [clic, setClick] = useState(false);

    const [call, setCall] = useState('one');

    return (
        <tr>
            <td>
                <div className='prospectProfile'>
                    <h3>{item.nombreEmpresa}</h3>
                    <span>{item.phone}</span>
                </div>
            </td>
            <td>
                <div className='prospectProfile'>
                    <span>{item.name}</span>
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

                    <button className='tt' >
                        <div className='icono' onClick={() => {
                            setClick(!clic);
                        }}>
                            <BsQuestion className='icon' />
                        </div>
                        <div className='stateBtn'>
                            {
                                clic ? 
                                    <NubeVisita item={props.item} />
                                :
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