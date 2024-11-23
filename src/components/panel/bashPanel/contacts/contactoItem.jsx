import React, { useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import NubeContacto from './nubeContact';
import { MdClose } from 'react-icons/md';
import * as actions from './../../../store/action/action';
import { useDispatch } from 'react-redux';

export default function ItemContact(props){
    const usuario = props.usuario;
    const item = props.item;
    const [params, setParams] = useSearchParams();
    const [clic, setClick] = useState(false);
    const [call, setCall] = useState('one');
    
    const dispatch = useDispatch();

    const open = async (cliente, see) => {
        dispatch(actions.ActionGetCliente(cliente));
        params.set('w', 'action');
        params.set('y', 'Segundo');

        setParams(params);
    }
    return (
        
        item.state == 'contacto 1' ?
        <tr>
            
            <td>
                <div className='prospectProfile'>
                    <div className='cl' onClick={() => open(item, true)}>    
                        <h3 className="business">{item.nombreEmpresa ? item.nombreEmpresa : item.name}</h3>
                        <span className="phone">{item.phone}</span><br />
                    </div>
                    <strong className="asesor">Por {usuario.rango == 'lider' ? item.user.name : usuario.name}</strong>
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
                                        Programada para: <br />
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
        </tr>
        : item.state == 'contacto 2' ?
        <tr>
            <td>
                <div className='prospectProfile'>
                    <div className='cl' onClick={() => open(item, true)}>    
                        <h3 className="business">{item.nombreEmpresa ? item.nombreEmpresa : item.name}</h3>
                        <span className="phone">{item.phone}</span><br />
                    </div>
                    <strong className="asesor">Por {usuario.rango == 'lider' ? item.user.name : usuario.name}</strong>
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
                                    item.registers && item.registers.length ? 

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
                                                        {r.createdAt.split('T')[0]}
                                                        {/* {formato.setDate(formato.getDate() + 3)} */}
                                                    </div> 
                                                :null
                                            )
                                        })
                                    : null
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
                                    <div>
                                        {
                                            item.registers && item.registers.length ? 

                                            item.registers.map((r, l) => {
                                                let date = new Date(r.createdAt.split('T')[0])
                                                let day = date.getDate();
                                                let mes = date.getMonth() + 1;
                                                let ano = date.getFullYear();
                                                let formato = `${ano}-${mes}-${day + 3}`;
                                                return (
                                                    r.type == 'contacto 1' ?
                                                        <div key={l}>
                                                            Programada para: <br />
                                                            {r.tiempo.split('T')[0]}
                                                            {/* {formato.setDate(formato.getDate() + 3)} */}
                                                        </div> 
                                                    :null
                                                )
                                            })
                                            :
                                            null
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

        </tr>
        : item.state == 'contacto 3' ?
        <tr>
            <td>
                <div className='prospectProfile'>
                    <div className='cl' onClick={() => open(item, true)}>    
                        <h3 className="business">{item.nombreEmpresa ? item.nombreEmpresa : item.name}</h3>
                        <span className="phone">{item.phone}</span><br />
                    </div>
                    <strong className="asesor">Por {usuario.rango == 'lider' ? item.user.name : usuario.name}</strong>
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
                                    item.registers && item.registers.legnth ? 

                                        item.registers.map((r, l) => {
                                            let date = new Date(r.createdAt.split('T')[0])
                                            return (
                                                r.type == 'contacto 1' ?
                                                    <div key={l}>
                                                        Se intentó comunicar el <br />
                                                        {r.createdAt.split('T')[0]}
                                                        {/* {formato.setDate(formato.getDate() + 3)} */}
                                                    </div> 
                                                :null
                                            )
                                        })
                                    : null
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
                                    item.registers && item.registers.length ? 

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
                                                        {r.createdAt.split('T')[0]}
                                                        {/* {formato.setDate(formato.getDate() + 3)} */}
                                                    </div> 
                                                :null
                                            )
                                        })
                                    : null
                                }   
                                
                            </div>
                    </button>
                </div> 
            </td>
            <td>
                <div className='tryButton'>
                    <button className='tt Active'>
                            <div className='icono'onClick={() => {
                                setClick(!clic);
                                open(item);
                            }} >
                                <BsQuestion className='icon' />
                            </div>
                            <div className='stateBtn'>                           
                                {
                                    <div>
                                        {
                                        item.registers && item.registers.length ? 

                                            item.registers.map((r, l) => {
                                                let date = new Date(r.createdAt.split('T')[0])
                                                return (
                                                    r.type == 'contacto 2' ?
                                                        <div key={l}>
                                                            Programado para: <br />
                                                            {r.tiempo.split('T')[0]}
                                                            {/* {formato.setDate(formato.getDate() + 3)} */}
                                                        </div> 
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
        </tr>
        : null
    )
}