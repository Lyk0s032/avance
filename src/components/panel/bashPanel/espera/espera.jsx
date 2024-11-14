import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';
import { useSearchParams } from 'react-router-dom';

export default function Espera(props){
    const usuario = props.usuario;
    const clients = props.clients;

    const espera = useSelector(store => store.espera);
    const loading = useSelector(store => store.loadingEspera);
    const [params, setParams] = useSearchParams();
    const dispatch = useDispatch();

    const open = async (cliente, see) => {
        dispatch(actions.ActionGetCliente(cliente));
        params.set('w', 'action');
        see ? params.set('watch', 'edit') : null
        setParams(params);
    }


    useEffect(() => {
        usuario.rango == 'lider' ?
            dispatch(actions.AxiosGetEspera(false))
        :   dispatch(actions.AxiosGetEsperaByAsesor(false, usuario.id))
        },[])
    return (
        <div className='intentos'>
            {
                !espera || loading ?
                <div className="containerIntentos">
                    <div className="loading">
                        <h1>Cargando</h1>
                    </div>
                </div>
                :
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Bandeja de espera  <span> ({clients.espera ? clients.espera.length : 0 })</span></h3>
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Razones</th>
                                <th>Estado</th>

                            </tr>
                        </thead>
                        <tbody> 
                            {
                                espera && espera.length ?
                                    espera.map((item, i) => {
                                        return (
                                            <tr>
                                            <td onClick={() => open(item)}>
                                                <div className='WaitOrLost'>
                                                    <h2>{item.nombreEmpresa ? item.nombreEmpresa : null}</h2>
                                                    <h3>{item.name}</h3>
                                                    <span>{item.phone}</span><br /><br />

                                                    <span style={{color: 'green'}}>{item.embudo}</span><br /><br />

                                           
                                                    <strong className="asesor">{usuario.rango == 'lider' ? item.user ? `Por ${item.user.name}` : 'Sin asesor' : usuario.name }</strong>
                                                    
                                                </div>
                                            </td>
                                            <td>
                                                <div className="razon">
                                                    <div className="note">
                                                        {
                                                            item.registers && item.registers.length ?
                                                                <span>{item.registers[0].note ? item.registers[0].note : 'Vacio'}</span>
                                                            :   <span>Vacio</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="razon">
                                                    <div className="tags">
                                                        {
                                                            item.registers && item.registers.length ?
                                                                item.registers[0].tags && item.registers[0].tags.length ?
                                                                    item.registers[0].tags.map((tg, i) => {
                                                                        return (
                                                                            <button>
                                                                                <span>{tg}</span>
                                                                            </button>
                                                                        )
                                                                    })
                                                                : <span>Sin tags</span>
                                                            : <span>vacio</span>
                                                        }
                                                    </div>
                                                </div>   
                                            </td>

                                            <td>
                                                <div className='options'>
                                                    <span>En espera</span><br />
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                :   <div className="notFound">
                                        <h1>
                                            No hay clientes en espera
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