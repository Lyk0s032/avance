import React, { useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import Nube from './nube';
import { MdClose } from 'react-icons/md';

export default function ItemIntento(props){
    const item = props.item;
    const [params, setParams] = useSearchParams();
    const [clic, setClick] = useState(false);

    const [call, setCall] = useState('one');


    return (
        item.state == 'intento 1' ?
        <tr>
            <td>
                <div className='prospectProfile'>
                    <h3>{item.name}</h3>
                    <span>{item.phone}</span>
                </div>
            </td>
            <td>
                <div className='tryButton'>
                        <button className='tt'>
                            <div className='icono' onClick={() => {
                                setClick(!clic);
                            }}>
                                <BsQuestion className='icon' />
                            </div>
                            <div className='stateBtn' id="nube" >
                                {
                                    clic ? 
                                        <Nube item={item} />
                                    :
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
                        <button className='tt' >
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
                    <button className='tt'>
                            <div className='icono'  onClick={() => {
                                setClick(!clic);
                            }}>
                                <BsQuestion className='icon' />
                            </div>
                            
                            <div className='stateBtn'>    
                                {
                                    clic ? 
                                        <Nube item={item} />
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
                        <button className='tt' >
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
                    <button className='tt' onClick={() => {
                                setClick(!clic);
                            }}>
                            <div className='icono' >
                                <BsQuestion className='icon' />
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
                    <button className='tt' >
                            <div className='icono' onClick={() => {
                                setClick(!clic);
                            }}>
                                <BsQuestion className='icon' />
                            </div>
                            <div className='stateBtn'>                           
                                {
                                    clic ? 
                                        <Nube item={item}/>
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
        </tr>
        :null
    )
}