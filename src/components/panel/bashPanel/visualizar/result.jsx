import React from 'react';

export default function Result(props){
    const cliente = props.cliente;
    const type = props.type;

    // const reciente = cliente.calendarios.reduce((a, b) => new Date(a.createdAt.split('T')) > new Date(b.createdAt.split('T')));
    return (
        <div className="result">
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
    )
}