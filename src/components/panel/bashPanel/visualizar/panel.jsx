import React, { useState } from "react";
import { useSelector } from "react-redux";
import Result from "./result";

export default function PanelVisualizar(props){
    const advisor = useSelector(store => store.advisors);
    const [filter, setFilter] = useState('contacto 1');
    const changePanel = (state) => {
        setFilter(state);
        document.querySelector('#notFound').scrollIntoView({
            behavior: 'smooth'
        })
    }

    const aprobadas = advisor.aprobadas ? advisor.aprobadas.reduce((total, item) => total + Number(item.neto), 0) : 0;

    return (
        <div className="containerScroll">
            {console.log(advisor[0])}
            <div className="ProfileAsesor">
                <div className='containerProfile'>
                    <div className='infoProfile'>
                        <div className='profileImg'>
                            <img src={advisor.asesor.photo} alt="" />
                        </div>
                        <div className='data'>
                            <h1>{advisor.asesor.name}</h1>
                            <span>Asesor/a</span>

                            <div className='other'>
                                <h3>{advisor.asesor.email}</h3>
                                <h4>{advisor.asesor.phone}</h4>
                            </div>
                        </div>
                    </div>

                    <div className='meta'>
                        <div className='containerMeta'>
                            <div className='circle'>
                                <div className="circleGraph">
                                    {
                                        !advisor.asesor.metum ?
                                            <h1>0%</h1>
                                        : 
                                        <h1>{((aprobadas / Number(advisor.asesor.metum.valor)) * (100)).toFixed(2)} %</h1>

                                    }
                                </div>
                            </div>
                            <div className='dataMeta'>
                                <div className='currently'>
                                    <h3>{ new Intl.NumberFormat('es-CO', {style: 'currency', currency:'COP'}).format(aprobadas)} <span>COP</span></h3>
                                    <span>Hasta el momento</span>
                                </div>

                                <div className='finish'>
                                    <h3>{ advisor.asesor.metum ?  new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP'}).format(advisor.asesor.metum.valor) : 0} <span>COP</span></h3>
                                    <span>Meta del mes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="resAsesor">
                <div className='containerResAsesor'>
                    <div className='tagsNav'>
                        <nav>
                            <ul>
                                <li onClick={() => changePanel('contacto 1')} className={!filter || filter == 'contacto 1' ? 'Active' : null}>
                                    <button>
                                        <span>Contacto 1</span>
                                    </button>
                                </li> 
                                <li onClick={() => changePanel('contacto 2')} className={filter == 'contacto 2' ? 'Active' : null}>
                                    <button>
                                        <span>Contacto 2</span>
                                    </button>
                                </li>
                                <li onClick={() => changePanel('contacto 3')} className={filter == 'contacto 3' ? 'Active' : null}>
                                    <button>
                                        <span>Contacto 3</span>
                                    </button>
                                </li>
                                <li onClick={() => changePanel('visitas')} className={filter == 'visitas' ? 'Active' : null}>
                                    <button>
                                        <span>Visita</span>
                                    </button>
                                </li>
                                <li onClick={() => changePanel('pendientes')} className={filter == 'pendientes' ? 'Active' : null}>
                                    <button>
                                        <span>Cotizaciones pendientes</span>
                                    </button>
                                </li>
                                <li onClick={() => changePanel('aprobadas')} className={filter == 'aprobadas' ? 'Active' : null}>
                                    <button>
                                        <span>Aprobadas</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="results">
                        <div className="containerResults">
                            {
                                !filter || filter == 'contacto 1' ?
                                    advisor.contactOne && advisor.contactOne.length ?
                                        advisor.contactOne.map((cliente, i) => {
                                            return (
                                                <Result cliente={cliente} key={i+1} />
                                            )
                                        })
                                    : <div className="notFound" id="notFound"><h1>No hay clientes en este estado</h1></div>
                                : filter == 'contacto 2' ?
                                    advisor.contactTwo && advisor.contactTwo.length ?
                                        advisor.contactTwo.map((cliente, i) => {
                                            return (
                                                <Result cliente={cliente} key={i+1} />
                                            )
                                        })
                                    : <div className="notFound" id="notFound"><h1>No hay clientes en este estado</h1></div>
                                : filter == 'contacto 3' ?
                                    advisor.contactThree && advisor.contactThree.length ?
                                        advisor.contactThree.map((cliente, i) => {
                                            return (
                                                <Result cliente={cliente} key={i+1} />
                                            )
                                        })
                                    : <h1>No hay clientes</h1>
                                : filter == 'visitas' ?
                                    advisor.visitas && advisor.visitas.length ?
                                        advisor.visitas.map((cliente, i) => {
                                            return (
                                                <Result cliente={cliente} key={i+1} />
                                            )
                                        })
                                    : <h1>No hay clientes</h1>
                                :filter == 'pendientes' ?
                                    advisor.cotizacion && advisor.cotizacion.length ?
                                        advisor.cotizacion.map((cliente, i) => {
                                            return (
                                                <Result cliente={cliente} key={i+1} />
                                            )
                                        })
                                    : <h1>No hay clientes</h1>
                                :filter == 'aprobadas' ?
                                    advisor.aprobadas && advisor.aprobadas.length ?
                                        advisor.aprobadas.map((cliente, i) => {
                                            return (
                                                <Result cliente={cliente} type='aprobadas' key={i+1} />
                                            )
                                        })
                                    : <h1>No hay clientes</h1>
                                :null
                            }
                            {/* <div className="result Alert">
                                <div className="containerResult">
                                    <div className='headerTop'>
                                        <div className="nameBusiness">
                                            <h3>Tesla</h3>
                                        </div>
                                        <div className="state">
                                            <button>
                                                <span>En Contacto 1</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="otherInfo">
                                        <h3>Kevin Andrés</h3>
                                        <h4>321 220 7563</h4>
                                    </div>

                                    <div className='calendaryTime'>
                                        <span>Comunicarse en 3 días</span>
                                    </div>
                                </div>
                            </div>
                            <div className="result">
                                <div className="containerResult">
                                    <div className='headerTop'>
                                        <div className="nameBusiness">
                                            <h3>Tesla</h3>
                                        </div>
                                        <div className="state">
                                            <button>
                                                <span>En Contacto 1</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="otherInfo">
                                        <h3>Kevin Andrés</h3>
                                        <h4>321 220 7563</h4>
                                    </div>

                                    <div className='calendaryTime'>
                                        <span>Comunicarse en 3 días</span>
                                    </div>
                                </div>
                            </div>
                            <div className="result Danger">
                                <div className="containerResult">
                                    <div className='headerTop'>
                                        <div className="nameBusiness">
                                            <h3>Tesla</h3>
                                        </div>
                                        <div className="state">
                                            <button>
                                                <span>En Contacto 1</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="otherInfo">
                                        <h3>Kevin Andrés</h3>
                                        <h4>321 220 7563</h4>
                                    </div>

                                    <div className='calendaryTime'>
                                        <span>Atrasado 3 días</span>
                                    </div>
                                </div>
                            </div>
                            <div className="result">
                                <div className="containerResult">
                                    <div className='headerTop'>
                                        <div className="nameBusiness">
                                            <h3>Tesla</h3>
                                        </div>
                                        <div className="state">
                                            <button>
                                                <span>En Contacto 1</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="otherInfo">
                                        <h3>Kevin Andrés</h3>
                                        <h4>321 220 7563</h4>
                                    </div>

                                    <div className='calendaryTime'>
                                        <span>Comunicarse en 3 días</span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                            
                </div>
            </div>
        </div>
    )
}