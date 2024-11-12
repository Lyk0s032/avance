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
                    <div className="part">
                        <span>Nro: </span>
                        <h3 className="nro">
                            { item.nro}
                        </h3>
                    </div>
                    <div className="part">
                        <span>Fecha: </span>
                        <h3 className="nro">
                            { item.fecha}
                        </h3>
                    </div>
                    <div className="part">
                        <span>Descuento: </span>
                        <h3 className="nro">
                           {`${new Intl.NumberFormat('es-CO', {currency:'COP'}).format(item.descuento)} COP`}
                        </h3>
                    </div>
                    <div className="part">
                        <span>V. Bruto: </span>
                        <h3 className="bruto">
                           {new Intl.NumberFormat('es-CO', {currency:'COP'}).format(item.bruto) + ' COP'}
                        </h3>
                    </div>

                    <div className="part">
                        <span>V. Neto: </span>
                        <h3 className="neto">
                           {new Intl.NumberFormat('es-CO', { currency:'COP'}).format(item.neto) + ' COP'}
                        </h3>
                    </div>
                </div>
            </td>
            <td>
                <div className='options'>
                    <span style={{color: 'green'}}>Aprobada</span>
                </div>
            </td>
        </tr>
    )
}