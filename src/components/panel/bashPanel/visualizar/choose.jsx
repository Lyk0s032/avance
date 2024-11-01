import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './../../../store/action/action';
import { useSearchParams } from 'react-router-dom';

export default function Choose(props){
    const asesores = props.asesores;
    const [params, setParams] = useSearchParams();
    const dispatch = useDispatch();

    const selectAsesor = (asesor) => {
        dispatch(actions.AxiosGetVisualizarAdvisors(true, asesor));
    }
    return (
        <div className='containerScroll'>
            <div className='choose'>
                <div className='containerCenter'>
                    <div className='message'>
                        <h1>
                            ¿Qué asesor deseas visualizar?
                        </h1>
                    </div>
                    <div className='containerAsesores'>
                        <div className='asesores'>
                            {
                                asesores ?
                                  asesores.map((asesor, i) => {
                                    return (
                                        <div className="asesor" key={i+1} onClick={() => {
                                            selectAsesor(asesor.id);
                                        }}>
                                            <div className='img'>
                                                <img src={asesor.photo} alt="" />
                                            </div>
                                            <div className='text'>
                                                <h3>Kevin Andrés</h3>
                                                <span>Asesor</span>
                                            </div>
                                        </div>
                                    )
                                })
                                : <div>
                                    <h1>No hay asesores disponibles.</h1>
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}