import React from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import PrimerIntento from './acciones/primerIntento';
import { useSearchParams } from 'react-router-dom';
import ContactoIntento from './acciones/contactoIntento';
import VisitaIntento from './acciones/visitaIntento';

export default function ModalRight(props){
    const usuario = props.usuario;
    const clients = props.clients;
    const item = useSelector(store => store.cliente);
    const [params, setParams] = useSearchParams();

    
    return (
        <div className="rightNube">
            <div className='header'>
                <button onClick={() => {
                    params.delete('w');
                    params.delete('y');
                    setParams(params);
                }}>
                    <MdClose className="icon" />
                </button>
            </div>
            <div className='nubeA'>
                <div className='infoR'>
                    <div className='ficha'>
                        <div className="headerFicha">
                            Ficha tecnica
                        </div>
                        <div className='propiedades'>
                            <div className='parte'>
                                <h3>Encargado:</h3>
                                <span>{item.name}</span>
                            </div>
                            <div className='parte'>
                                <h3>empresa:</h3>
                                <span>{item.nombreEmpresa ? item.nombreEmpresa : 'Sin definir'}</span>
                            </div>
                            <div className='parte'>
                                <h3>Cargo:</h3>
                                <span>{item.rangoEncargado ? item.rangoEncargado : 'Sin definir'}</span>
                            </div>
                            <div className='parte'>
                                <h3>Contacto:</h3>
                                <span>{item.phone}</span>
                            </div><div className='parte'>
                                <h3>Dirección:</h3>
                                <span>{item.direccion ? item.direccion : 'Sin definir'}</span>
                            </div><div className='parte'>
                                <h3>Teléfono fijo:</h3>
                                <span>{item.fijo ? item.fijo : 'Sin definir'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="acciones">
                    {
                        !item ?
                            <div>
                                <h1>Selecciona un item</h1>
                            </div>
                        : params.get('y') == 'Primer' ?
                            <PrimerIntento item={item} clients={clients} />
                        : params.get('y') == 'Segundo' ?
                            <ContactoIntento usuario={usuario} item={item} clients={clients} /> 
                        : params.get('y') == 'Visita' ?
                            <VisitaIntento usuario={usuario} item={item} clients={clients} />    
                        :null
                    }
                </div>
            </div>
        </div>
    )
}