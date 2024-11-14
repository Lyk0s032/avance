import React from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/action/action';

export default function Result(props){
    const cliente = props.cliente;
    const aprobada = props.aprobada
    const type = props.type;
    const [params, setParams] = useSearchParams();
    // const reciente = cliente.calendarios.reduce((a, b) => new Date(a.createdAt.split('T')) > new Date(b.createdAt.split('T')));
    const dispatch = useDispatch();

    return (
        cliente ? 
            <div className="result" onClick={() => {
                dispatch(actions.ActionGetCliente(cliente));
                
                params.set('w', 'action');
                setParams(params);
            }}>
                <div className="containerResult">
                    <div className='headerTop'>
                        <div className="nameBusiness">
                            <h3>{cliente.nombreEmpresa}</h3>
                        </div>
                        <div className="state">
                            <button>
                                <span>En {cliente.state}</span>
                            </button>
                        </div>
                    </div>
                    <div className="otherInfo">
                        <h3>{cliente.name}</h3>
                        <h4>{cliente.phone}</h4>
                    </div>

                    <div className='calendaryTime'>
                        {/* <span>Comunicarse en 3 días</span> */}
                    </div>
                </div>
            </div>
        : aprobada ?
            <div className="result" onClick={() => {
                dispatch(actions.ActionGetCliente(aprobada.client));
                
                params.set('w', 'action');
                setParams(params);
            }}>
                {console.log(aprobada)}
                <div className="containerResult">
                    <div className='headerTop'>
                        <div className="nameBusiness">
                            <h3>{aprobada.client.nombreEmpresa}</h3>
                        </div>
                        <div className="state">
                            <button>
                                <span>{aprobada.client.state}</span>
                            </button>
                        </div>
                    </div>
                    <div className="otherInfo">
                        <h3>{aprobada.client.name}</h3>
                        <h4>{aprobada.client.phone}</h4>
                    </div>

                    <div className='calendaryTime'>
                        {/* <span>Comunicarse en 3 días</span> */}
                    </div>
                </div>
            </div>
        : null
    )
}