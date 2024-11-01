import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Choose from './choose';
import PanelVisualizar from './panel';
import * as actions from './../../../store/action/action';

export default function ByAsesorPanel(props){
    const asesores = props.asesores;
    const advisors = useSelector(store => store.advisors);
    const loading = useSelector(store => store.loadingAdvisors);

    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();


    const selectAsesor = (asesor) => {
        document.querySelector('#asesorChange').blur();
        if(asesor){
            if(asesor != advisors.asesor.id){
                dispatch(actions.AxiosGetVisualizarAdvisors(true, asesor));
            }
        } 
    }
    return (
        <div className='byAsesor'>
            <div className='containerByAsesor'>
                <div className='headerNav'>
                    <button className='hidden'>
                        <span></span>
                    </button>
                    {
                        advisors && asesores && asesores.length ?
                        <div className='asesor'>
                            <select name="" id="asesorChange" onChange={(e) => {
                                selectAsesor(e.target.value)
                            }}>
                            <option value={null} defaultValue={null}>Seleccionar asesor</option>

                                {
                                    asesores.map((a,i) => {
                                        return (
                                            <option value={a.id} key={i+1}>{a.name}</option>
                                        )
                                    })
                                }
                                
                            </select>
                        </div>
                        : <div></div>
                    }
                    <button className="close" onClick={() => {
                        params.delete('watch');
                        setParams(params);
                    }}>
                        <MdClose className="icon" />
                    </button>
                </div>
                {
                    !advisors && !loading ?
                        <Choose asesores={asesores} />
                    : !advisors || loading ? 
                        <div className='loading'>
                            <h1>Cargando información del asesor...</h1>
                        </div>
                    : advisors && !loading ?
                        <PanelVisualizar />
                    : <h1>Ha sucedido algo</h1>
                }
                
            </div>
        </div>
    )
}