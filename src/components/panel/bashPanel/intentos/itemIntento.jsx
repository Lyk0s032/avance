import React, { useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import Nube from './nube';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from './../../../store/action/action';
export default function ItemIntento(props){
    const item = props.item;
    const [params, setParams] = useSearchParams();
    const [clic, setClick] = useState(false);
    const [call, setCall] = useState('one');
    const clients = props.clients;
    const dispatch = useDispatch();

    const open = async (cliente) => {
        dispatch(actions.ActionGetCliente(cliente));
        params.set('w', 'action');
        params.set('y', 'Primer');
        setParams(params);
    }

    return (
        item.state == 'intento 1' ?
        <tr>
            <td>
                <div className='prospectProfile'>
                    <h3 className="business">{item.nombreEmpresa}</h3>
                    <h3>{item.name}</h3>
                    <span>{item.phone}</span>
                </div>
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
                            <div className='stateBtn' id="nube" >
                                {
                                    <div>
                                        Se solicitó una llamada para el:
                                        {item.createdAt.split('T')[0]}
                                    </div>
                                }
                            </div>
                        </button>
                </div> 
            </td>
            <td>
                <div className='tryButton'>
                    <button className='tt' >
                            <div className='icono' >
                                <BsQuestion className='icon' />
                            </div>
                            <div className='stateBtn'>                           
                                <div>
                                    Acción no disponible
                                </div>
                            </div>
                    </button>
                </div> 
            </td>
            <td>
                <div className='tryButton'>
                    <button className='tt' >
                            <div className='icono' >
                                <BsQuestion className='icon' />
                            </div>
                            <div className='stateBtn'>                           
                                <div>
                                    Acción no disponible
                                </div>
                            </div>
                    </button>
                </div> 
            </td>
        </tr>
        // INTENTO 2
        : item.state == 'intento 2' ?
        <tr>
            <td>
                <div className='prospectProfile'>
                    <h3>{item.name}</h3>
                    <span>{item.phone}</span>
                </div>
            </td>
            <td>
                <div className='tryButton'>
                        <button className='tt Cancel' >
                            <div className='icono'>
                                <MdClose className='icon' />
                            </div>
                            <div className='stateBtn'>
                                {
                      
                                        item.registers.map((r,l) => {
                                            return (
                                                r.type == 'intento 1' ?
                                                    <div>
                                                        Fecha de intento <br />
                                                        {r.createdAt.split('T')[0] }
                                                    </div> 
                                                :null
                                            )
                                        })
                                }
                            </div>
                        </button>
                </div> 
            </td>
            <td>
                <div className='tryButton'>
                    <button className='tt Active'>
                            <div className='icono'  onClick={() => {
                                setClick(!clic);
                                open(item);
                            }}>
                                <BsQuestion className='icon' />
                            </div>
                            
                            <div className='stateBtn'>    
                                {
                                    clic ? 
                                        <Nube item={item} clients={clients} />
                                    :                       
                                    <div>
                                        Ideal llamar el
                                        <br />2024 - 10 -22
                                    </div> 
                                }
                            </div>
                    </button>
                </div> 
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
                                <div>
                                    Acción no disponible
                                </div>
                            </div>
                    </button>
                </div> 
            </td>
        </tr>
        // ---------------------------------------
        // INTENTO 3
        // --------------------------------------
        : item.state == 'intento 3' ?
        <tr>
            <td>
                <div className='prospectProfile'>
                    <h3>{item.name}</h3>
                    <span>{item.phone}</span>
                </div>
            </td>
            <td>
                <div className='tryButton'>
                        <button className='tt Cancel' >
                            <div className='icono'>
                                <MdClose className='icon' />
                            </div>
                            <div className='stateBtn'>
                                {
                    
                                        item.registers.map((r,l) => {
                                            return (
                                                r.type == 'intento 1' ?
                                                    <div key={l}>
                                                        Fecha de intento {r.type} <br />
                                                        {r.createdAt.split('T')[0] }
                                                    </div> 
                                                :null
                                            )
                                        })
                                }
                            </div>
                        </button>
                </div> 
            </td>
            <td>
                <div className='tryButton'>
                    <button className='tt Cancel'>
                            <div className='icono' >
                                <MdClose className='icon' />
                            </div>
                            
                            <div className='stateBtn'>    
                            {
                      
                                    item.registers.map((r,l) => {
                                        return (
                                            r.type == 'intento 2' ?
                                                <div key={l}>
                                                    Fecha de {r.type} <br />
                                                    {r.createdAt.split('T')[0] }
                                                </div> 
                                            :null
                                        )
                                    })
                            }
                            </div>
                    </button>
                </div> 
            </td>
            <td>
                <div className='tryButton'>
                    <button className='tt Active' >
                            <div className='icono' onClick={() => {
                                setClick(!clic);
                                open(item);
                            }}>
                                <BsQuestion className='icon' />
                            </div>
                            <div className='stateBtn'>                           
                                {                  
                                    <div>
                                        Ideal llamar el
                                        <br />2024 - 10 -22
                                    </div> 
                                }
                            </div>
                    </button>
                </div> 
            </td>
        </tr>
        :null
    )
}