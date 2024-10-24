import React, { useEffect, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import ItemContacto from './contactoItem';
import * as actions from './../../../store/action/action';
import { useDispatch, useSelector } from 'react-redux';
import ItemContact from './contactoItem';

export default function Contacts(props){
    const usuario = props.usuario;

    const dispatch = useDispatch();
    const contactos = useSelector(store => store.contactos);
    const loading = useSelector(store => store.loadingContactos);

    const [stateShow, setStateShow] = useState('contacto 1');


    useEffect(() => {
        usuario.rango == 'lider' ?
            dispatch(actions.AxiosGetContactos(true))
        :
            dispatch(actions.AxiosGetContactosByAsesor(true, usuario.id))
    }, [])
    return (
        <div className='intentos'>
            <div className='containerIntentos'>
                <div className='header'>
                    <div className='title'>
                        <h3>Contactos <span>{contactos ? contactos.length : 0}</span></h3>
                    </div>
                    <div className='filters'>
                        <button className={stateShow == 'contacto 1' ? 'Active' : null} onClick={() => setStateShow('contacto 1')}>
                            <span>Primer contacto</span>
                        </button>
                        <button className={stateShow == 'contacto 2' ? 'Active' : null} onClick={() => setStateShow('contacto 2')}>
                            <span>Segundo Contacto</span>
                        </button>
                        <button className={stateShow == 'contacto 3' ? 'Active' : null} onClick={() => setStateShow('contacto 3')}>
                            <span>Tercer Contacto (0)</span>
                        </button>
                    </div>
                </div>
                <div className='listsContainerProspects'>
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Primer Contacto</th>
                                <th>Segundo Contacto</th>
                                <th>Tercer Contacto</th>
                                <th></th>

                            </tr>
                        </thead>
                        {
                            loading || !contactos ?
                                <h3>Cargando...</h3>
                            :
                            <tbody>
                                {
                                    contactos && contactos.length ?
                                        contactos.map((item, i) => {
                                            return (
                                                item.state == stateShow ?
                                                    <ItemContact key={i+1} item={item} />
                                                :
                                                null
                                            )
                                        })
                                    :null
                                }
                            </tbody>
                        }

                    </table>
                </div>
            </div>
        </div>
    )
}