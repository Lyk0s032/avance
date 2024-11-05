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


    const open = async (cliente) => {
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
                    <div className='cl'>    
                        <h3 className="business">{item.nombreEmpresa ? item.nombreEmpresa : item.name}</h3>
                        <span className="phone">{item.phone}</span><br />
                    </div>
                    <strong className="asesor">Por {usuario.range == 'lider' ? item.user.name : usuario.name}</strong>
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
        </tr>
        : item.state == 'contacto 2' ?
        <tr>
            <td>
                <div className='prospectProfile'>
                    <div className='cl'>    
                        <h3 className="business">{item.nombreEmpresa ? item.nombreEmpresa : item.name}</h3>
                        <span className="phone">{item.phone}</span><br />
                    </div>
                    <strong className="asesor">Por {item.user.name}</strong>
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

        </tr>
        : item.state == 'contacto 3' ?
        <tr>
            <td>
                <div className='prospectProfile'>
                    <div className='cl'>    
                        <h3 className="business">{item.nombreEmpresa ? item.nombreEmpresa : item.name}</h3>
                        <span className="phone">{item.phone}</span><br />
                    </div>
                    <strong className="asesor">Por {item.user.name}</strong>
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
                    <button className='tt Cancel'>
                            <div className='icono' >
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
        </tr>
        : null
    )
}