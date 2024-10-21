import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

export default function State(){
    const [params, setParams] = useSearchParams();
    const [form, setForm] = useState({
        name: null,
        description:null,
    });
    const [mistake, setMistake] = useState(null);
    return (
        <div className='newFuente'>
            <div className='modalNewContainer'>
                <div className='form'>
                    <div className='title'>
                        <h1>Nueva fuente</h1>
                        <button onClick={() => {
                            params.delete('state');
                            setParams(params);
                        }}>
                            <MdClose className="icon" />
                        </button>
                    </div>
                    <div className='state'>
                        <h1>Estado</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}