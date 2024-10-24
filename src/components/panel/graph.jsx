import React from 'react';

export default function Graph(props){
    const aprobadas = props.clientes;
    const total = aprobadas.reduce((acumulador, compra) => Number(acumulador) + Number(compra.neto), 0);
    return (
        
        <div className="graphing">
            
            <h3>
                {
                    new Intl.NumberFormat('es-CO', {style: 'currency', currency:'COP'}).format(total)
                } <span style={{fontSize:'16px'}}>COP</span>
            </h3>
        </div>
    )
}