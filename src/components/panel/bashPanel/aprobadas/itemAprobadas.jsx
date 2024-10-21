import axios from 'axios';
import React, { useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import * as actions from './../../../store/action/action';
import { useDispatch } from 'react-redux';

export default function ItemAprobadas(props){
    const item = props.item;

    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();
    const [move, setMove] = useState(false);

    return (
        <tr>
            {console.log(item)}
            <td>
                <div className='prospectProfile'>
                    <h3>{item.client.nombreEmpresa}</h3>
                    <span>{item.client.phone}</span>
                </div>
            </td>
            <td>
                <div className='val'>
                    <h3>
                        {
                                item.nro
                        }
                    </h3>
                </div>
            </td>
            <td>
                <div className='val'>
                    <h3>
                        {
                                new Intl.NumberFormat('es-CO', {style: 'currency', currency:'COP'}).format(item.bruto) + ' COP'

                        } </h3>
                </div>
            </td>
            <td>
                <div className='val'>
                    <h3>
                        {
                                new Intl.NumberFormat('es-CO', {style: 'currency', currency:'COP'}).format(item.neto) + ' COP'

                        } 
                    </h3>
                </div>
            </td>
            <td>
                <div className='options'>
                    <span>Aprobada</span>
                </div>
            </td>
        </tr>
    )
}