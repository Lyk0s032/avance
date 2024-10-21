import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../store/action/action';

export default function Perdido(props){
    const clients = props.clients;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.AxiosGetClients(false))
    },[])
    return (
        <div className='intentos'>
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Bandeja de Perdidos  <span> ({clients.perdido ? clients.perdido.length : 0 })</span></h3>
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients.perdido && clients.perdido.length ?
                                    clients.perdido.map((item, i) => {
                                        return (
                                            <tr>
                                            <td>
                                                <div className='prospectProfile'>
                                                    <h3>{item.name}</h3>
                                                    <span>{item.phone}</span>
                                                </div>
                                            </td>
                                            <td>
                                                
                                            </td>
                                            <td>
                                                
                                            </td>
                                            <td>
                                                
                                            </td>
                                            <td>
                                                <div className='options'>
                                                    <span>Perdido</span>
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                :null
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}