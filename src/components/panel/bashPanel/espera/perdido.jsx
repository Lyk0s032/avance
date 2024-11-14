import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';
import { useSearchParams } from 'react-router-dom';

export default function Perdido(props){
    const usuario = props.usuario;
    const clients = props.clients;
    const dispatch = useDispatch();

    
    const perdido = useSelector(store => store.perdido);
    const loading = useSelector(store => store.loadingPerdido);
    const [params, setParams] = useSearchParams();

    const open = async (cliente, see) => {
        dispatch(actions.ActionGetCliente(cliente));
        params.set('w', 'action');
        see ? params.set('watch', 'edit') : null
        setParams(params);
    }


    useEffect(() => {
        usuario.rango == 'lider' ?
            dispatch(actions.AxiosGetPerdido(false))
        :   dispatch(actions.AxiosGetPerdidoByAsesor(false, usuario.id))
    },[])
    return (
        <div className='intentos'>
            {
                !perdido || loading ?
                <div className="containerIntentos">
                    <div className="loading">
                        <h1>Cargando</h1>
                    </div>
                </div>
                :
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Bandeja de Perdidos  <span> ({perdido ? perdido.length : 0 })</span></h3>
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Razones</th>
                                <th></th>
                                <th></th>
                                <th>Estado</th>

                            </tr>
                        </thead>
                        <tbody>
                        {
                                perdido && perdido.length ?
                                    perdido.map((item, i) => {
                                        return (
                                            <tr>
                                            <td onClick={() => open(item)}>
                                                <div className='WaitOrLost'>
                                                    <h2>{item.nombreEmpresa ? item.nombreEmpresa : null}</h2>
                                                    <h3>{item.name}</h3>
                                                    <span>{item.phone}</span><br /><br />
                                           
                                                    <strong className="asesor">{usuario.rango == 'lider' ? item.user ? `Por ${item.user.name}` : 'Sin asesor' : null }</strong>
                                                    
                                                </div>
                                            </td>
                                            <td>
                                                <div className="razon">
                                                    <div className="note tags">
                                                        {
                                                            item.registers && item.registers.length ?
                                                                <span>{item.registers[0].note ? item.registers[0].note : 'Vacio'}</span>
                                                            :   <span>Vacio</span>
                                                        }<br/><br />
                                                        {
                                                            item.registers && item.registers.length ?
                                                                item.registers[0].tags && item.registers[0].tags.length ?
                                                                    item.registers[0].tags.map((tg, i) => {
                                                                        return (
                                                                            <button style={{border:'1px solid #f44336'}}>
                                                                                <span style={{color: '#f44336'}}>{tg}</span>
                                                                            </button>
                                                                        )
                                                                    })
                                                                : <span>Sin tags</span>
                                                            : null
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="razon">
                                                    <div className="tags">
                                                        
                                                    </div>
                                                </div>        
                                            </td>
                                            <td>
                                                
                                            </td>
                                            <td>
                                                <div className='options'>
                                                    <span style={{color: 'red'}}>Perdido</span><br />
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                :   <div className="notFound">
                                        <h1>
                                            No hay clientes en perdidos
                                        </h1>
                                    </div>
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </div>
    )
}