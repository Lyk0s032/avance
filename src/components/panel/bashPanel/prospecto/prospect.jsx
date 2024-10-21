import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NewProspect from './nuevoProspecto';
import State from './state';

export default function Prospectos(props){
    const clients = props.clients;
    const [params, setParams] = useSearchParams();

    return (
        <div className='prospectos'>
            {
                params.get('w') == 'prospecto' ?
                    <NewProspect  clients={clients}/>
                : params.get('state') ?
                    <State />
                : null
            }
            <div className='containerProspectos'>
                <div className='filters'>
                    <div className='numberAndFilter'>
                        <h3>Prospectos</h3>
                        
                    </div>
                    <div className='newProspect'>
                        <button onClick={() => {
                            params.set('w', 'prospecto');
                            setParams(params);
                        }}>
                            <span>Nuevo prospecto +</span>
                        </button>
                    </div>
                </div>
                <div className='listProspectos'>
                    {/* <div className='containerProspectos'>
                        <table id="example" className="display">
                            <thead>
                                <tr>
                                    <th>Fuente</th>
                                    <th>Nombre</th>
                                    <th>Número</th>
                                    <th>Fecha</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button onClick={() => {
                                            params.set('state', 1);
                                            setParams(params);
                                        }}>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 4</td>
                                    <td>
                                        <button>Avanzar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="pagination">
                            <button><span>Left</span></button>
                            <span>1</span>
                            <button><span>Right</span></button>

                        </div>
                    </div> */}
                    <br /><br />
                    <h1> <br /><br />Se ha inabilitado este listado.</h1>
                    <h3>Con el fin de no ser redundantes en la información, hemos omitido este listado.</h3>
                </div>
            </div>
        </div>
    )
}