import axios from 'axios';
import React, { useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import * as actions from './../../../store/action/action';
import { useDispatch } from 'react-redux';

export default function ItemAprobadas(props){
    const item = props.item;
    const usuario = props.usuario;

    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();
    const [move, setMove] = useState(false);

    const open = async (cliente, see) => {
        dispatch(actions.ActionGetCliente(cliente));
        params.set('w', 'action');
        see ? params.set('watch', 'edit') : null
        setParams(params);
    }
    return (
        <tr onClick={() => open(item)}>
            <td>
                <div className='prospectProfile'>
                    <h3>{item.nombreEmpresa}</h3>
                    <span>{item.phone}</span><br /><br />

                    {
                        usuario.rango == 'lider' ?
                            <span> {item.user ? item.user.name : 'Sin definir'}</span>
                        : null
                    }
                </div>
            </td>
            <td>
                <div className='val'>
                    <div className="part">
                        <span>Nro: </span>
                        <h3 className="nro">
                            { item.cotizacions[0].nro}
                        </h3>
                    </div>
                    <div className="part">
                        <span>Fecha: </span>
                        <h3 className="nro">
                            { item.cotizacions[0].fecha}
                        </h3>
                    </div>
                    <div className="part">
                        <span>Descuento: </span>
                        <h3 className="nro">
                           {`${new Intl.NumberFormat('es-CO', {currency:'COP'}).format(item.cotizacions[0].descuento)} COP`}
                        </h3>
                    </div>
                    <div className="part">
                        <span>V. Bruto: </span>
                        <h3 className="bruto">
                           {new Intl.NumberFormat('es-CO', {currency:'COP'}).format(item.cotizacions[0].bruto) + ' COP'}
                        </h3>
                    </div>

                    <div className="part">
                        <span>V. Neto: </span>
                        <h3 className="neto">
                           {new Intl.NumberFormat('es-CO', { currency:'COP'}).format(item.cotizacions[0].neto) + ' COP'}
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