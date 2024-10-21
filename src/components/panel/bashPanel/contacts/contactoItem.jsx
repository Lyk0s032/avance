import React, { useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import NubeContacto from './nubeContact';
import { MdClose } from 'react-icons/md';

export default function ItemContact(props){
    const item = props.item;

    const [params, setParams] = useSearchParams();
    const [clic, setClick] = useState(false);
    const [call, setCall] = useState('one');
    return (
        item.state == 'contacto 1' ?
        <tr>
            {console.log(item)}
            <td>
                <div className='prospectProfile'>
                    <h3>{item.nombreEmpresa}</h3>
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
                                        <NubeContacto item={item} />
                                    :
                                    <div>
                                        Se solicitó una llamada para el: <br />
                                        {
                                            item.calendarios && item.calendarios.length ?
                                                item.calendarios.map((cal,i) => {
                                                    return (
                                                        cal.type == 'Solicita una llamada' ?
                                                        <span>{cal.fecha}</span>
                                                        :null
                                                    )
                                                })
                                            : null
                                        }
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
                            <div className='icono'>
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
                <button className='see' onClick={() => {
                    params.set('state', 1);
                    setParams(params);
                }}> <span>Visualizar</span> </button>
            </td>
        </tr>
        : item.state == 'contacto 2' ?
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
                      
                                        item.registers.map((r, l) => {
                                            let date = new Date(r.createdAt.split('T')[0])
                                            let day = date.getDate();
                                            let mes = date.getMonth() + 1;
                                            let ano = date.getFullYear();
                                            let formato = `${ano}-${mes}-${day}`;
                                            return (
                                                r.type == 'contacto 1' ?
                                                    <div key={l}>
                                                        Se intentó comunicar el <br />
                                                        {formato}
                                                        {/* {formato.setDate(formato.getDate() + 3)} */}
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
                                        <NubeContacto item={item} />
                                    :                       
                                    <div>
                                        {
                                            item.registers.map((r, l) => {
                                                let date = new Date(r.createdAt.split('T')[0])
                                                let day = date.getDate();
                                                let mes = date.getMonth() + 1;
                                                let ano = date.getFullYear();
                                                let formato = `${ano}-${mes}-${day + 3}`;
                                                return (
                                                    r.type == 'contacto 1' ?
                                                        <div key={l}>
                                                            Ideal llamar el: <br />
                                                            {formato}
                                                            {/* {formato.setDate(formato.getDate() + 3)} */}
                                                        </div> 
                                                    :null
                                                )
                                            })
                                        }
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
            <td>
                <button className='see' onClick={() => {
                    params.set('state', 1);
                    setParams(params);
                }}> <span>Visualizar</span> </button>
            </td>
        </tr>
        : item.state == 'contacto 3' ?
        <tr>
            <td>
                <div className='prospectProfile'>
                    <h3>{item.nombreEmpresa}</h3>
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
                      
                                        item.registers.map((r, l) => {
                                            let date = new Date(r.createdAt.split('T')[0])
                                            let day = date.getDate();
                                            let mes = date.getMonth() + 1;
                                            let ano = date.getFullYear();
                                            let formato = `${ano}-${mes}-${day}`;
                                            return (
                                                r.type == 'contacto 1' ?
                                                    <div key={l}>
                                                        Se intentó comunicar el <br />
                                                        {formato}
                                                        {/* {formato.setDate(formato.getDate() + 3)} */}
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
                      
                                        item.registers.map((r, l) => {
                                            let date = new Date(r.createdAt.split('T')[0])
                                            let day = date.getDate();
                                            let mes = date.getMonth() + 1;
                                            let ano = date.getFullYear();
                                            let formato = `${ano}-${mes}-${day}`;
                                            return (
                                                r.type == 'contacto 2' ?
                                                    <div key={l}>
                                                        Se intentó comunicar el <br />
                                                        {formato}
                                                        {/* {formato.setDate(formato.getDate() + 3)} */}
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
                                        <NubeContacto item={item} />
                                    :                       
                                    <div>
                                        {
                                            item.registers.map((r, l) => {
                                                let date = new Date(r.createdAt.split('T')[0])
                                                let day = date.getDate();
                                                let mes = date.getMonth() + 1;
                                                let ano = date.getFullYear();
                                                let formato = `${ano}-${mes}-${day + 3}`;
                                                return (
                                                    r.type == 'contacto 2' ?
                                                        <div key={l}>
                                                            Ideal llamar el: <br />
                                                            {formato}
                                                            {/* {formato.setDate(formato.getDate() + 3)} */}
                                                        </div> 
                                                    :null
                                                )
                                            })
                                        }
                                    </div> 
                                }
                            </div>
                    </button>
                </div> 
            </td>
            <td>
                <button className='see' onClick={() => {
                    params.set('state', 1);
                    setParams(params);
                }}> <span>Visualizar</span> </button>
            </td>
        </tr>
        : null
    )
}