import axios from "axios";
import { useActionData } from "react-router-dom";


export function GET_USER(user){
    return {
        type: 'GET_USER',
        payload: user
    }
}
export function GETTING_USER(carga){
    return {
        type: 'GETTING_USER',
        payload: true
    }
}
export function AxiosAuthUser(token, carga){
    return function(dispatch){
        dispatch(GETTING_USER(carga));
        axios.get('/app/signIn', {
            headers:{
                'authorization': `Bearer ${token}`
            }
        } )
        .then((res) => {
            return res.data;    
        })
        .then((data) => {
            dispatch(GET_USER(data.user))
        })
        .catch(err => {
            dispatch(GET_USER(null))
            console.log(err);
            console.log('no trae registro');
            window.localStorage.removeItem('loggedPeople');
        })
    }
    
}

// CLIENTES
export function GET_CLIENTS(clients){
    return {
        type: 'GET_CLIENTS',
        payload: clients
    }
}
export function GETTING_CLIENTS(carga){
    return {
        type: 'GETTING_CLIENTS',
    }
}
export function AxiosGetClients(carga){
    return function(dispatch){
        dispatch(GETTING_CLIENTS(carga))
        axios.get(`/clients/get/all/panel/`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_CLIENTS(false));
            return dispatch(GET_CLIENTS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_CLIENTS(false));
            if(e.response.status == 404){
                return dispatch(GET_CLIENTS(404))
            }else{
                return dispatch(GET_CLIENTS('request'));
            }
        })
    }
}

export function ActionGetCliente(cliente){
    return {
        type: 'GET_CLIENTE',
        payload: cliente
    }
}

export function AxiosGetClientsByAsesor(carga, asesorId){
    return function(dispatch){
        dispatch(GETTING_CLIENTS(carga))
        axios.get(`/clients/get/all/panel/${asesorId}`)
        .then((info) => info.data)
        .then(inf => {
            console.log(asesorId)
            dispatch(GETTING_CLIENTS(false));
            return dispatch(GET_CLIENTS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_CLIENTS(false));
            if(e.response.status == 404){
                return dispatch(GET_CLIENTS(404))
            }else{
                return dispatch(GET_CLIENTS('request'));
            }
        })
    }
}

// OBTENER DATOS PARA VISUALIZAR ASESORES.
export function GET_ADVISORS(advisors){
    return {
        type: 'GET_ADVISORS',
        payload: advisors
    }
}
export function GETTING_ADVISORS(carga){
    return {
        type: 'GETTING_ADVISORS',
        payload: carga
    }
}

export function AxiosGetVisualizarAdvisors(carga, asesorId){
    console.log('dispara')
    return function(dispatch){
        dispatch(GETTING_ADVISORS(carga))
        axios.get(`/clients/get/visualizar/asesores/${asesorId}`)
        .then((info) => info.data)
        .then(inf => {
            console.log(asesorId)
            dispatch(GETTING_ADVISORS(false));
            return dispatch(GET_ADVISORS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_ADVISORS(false));
            if(e.response.status == 404){
                return dispatch(GET_ADVISORS(404))
            }else{
                return dispatch(GET_ADVISORS('request'));
            }
        })
    }
}


// INTENTOS
export function GET_INTENTOS(intentos){
    return {
        type: 'GET_INTENTOS',
        payload: intentos
    }
}
export function GETTING_INTENTOS(){
    return {
        type: 'GETTING_INTENTOS',
    }
}
export function AxiosGetIntentos(carga){
    return function(dispatch){
        dispatch(GETTING_INTENTOS(carga))
        axios.get(`/clients/get/all/intentos/`)
        .then((info) => info.data)
        .then(inf => {
            dispatch(GETTING_INTENTOS(false));
            return dispatch(GET_INTENTOS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_INTENTOS(false));
            if(e.response.status == 404){
                return dispatch(GET_INTENTOS(404))
            }else{
                return dispatch(GET_INTENTOS('request'));
            }
        })
    }
}

// CONTACTOS
export function GET_CONTACTOS(intentos){
    return {
        type: 'GET_CONTACTOS',
        payload: intentos
    }
}
export function GETTING_CONTACTOS(){
    return {
        type: 'GETTING_CONTACTOS',
    }
}
export function AxiosGetContactos(carga){
    return function(dispatch){
        dispatch(GETTING_CONTACTOS(carga))
        axios.get(`/clients/get/all/contactos/`)
        .then((info) => info.data)
        .then(inf => {
            dispatch(GETTING_CONTACTOS(false));
            return dispatch(GET_CONTACTOS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_CONTACTOS(false));
            if(e.response.status == 404){
                return dispatch(GET_CONTACTOS(404))
            }else{
                return dispatch(GET_CONTACTOS('request'));
            }
        })
    }
}
export function AxiosGetContactosByAsesor(carga,asesorId){
    return function(dispatch){
        dispatch(GETTING_CONTACTOS(carga))
        axios.get(`/clients/get/all/contactos/${asesorId}`)
        .then((info) => info.data)
        .then(inf => {
            dispatch(GETTING_CONTACTOS(false));
            return dispatch(GET_CONTACTOS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_CONTACTOS(false));
            if(e.response.status == 404){
                return dispatch(GET_CONTACTOS(404))
            }else{
                return dispatch(GET_CONTACTOS('request'));
            }
        })
    }
}


// VISITAS
export function GET_VISITAS(intentos){
    return {
        type: 'GET_VISITAS',
        payload: intentos
    }
}
export function GETTING_VISITAS(){
    return {
        type: 'GETTING_VISITAS',
    }
}
export function AxiosGetVisitas(carga){
    return function(dispatch){
        dispatch(GETTING_VISITAS(carga))
        axios.get(`/clients/get/all/visitas/`)
        .then((info) => info.data)
        .then(inf => {
            dispatch(GETTING_VISITAS(false));
            return dispatch(GET_VISITAS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_VISITAS(false));
            if(e.response.status == 404){
                return dispatch(GET_VISITAS(404))
            }else{
                return dispatch(GET_VISITAS('request'));
            }
        }) 
    }
}
export function AxiosGetVisitasByAsesor(carga, asesorId){
    return function(dispatch){
        dispatch(GETTING_VISITAS(carga))
        axios.get(`/clients/get/all/visitas/${asesorId}`)
        .then((info) => info.data)
        .then(inf => {
            dispatch(GETTING_VISITAS(false));
            return dispatch(GET_VISITAS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_VISITAS(false));
            if(e.response.status == 404){
                return dispatch(GET_VISITAS(404))
            }else{
                return dispatch(GET_VISITAS('request'));
            }
        }) 
    }
}


// VISITAS
export function GET_COTIZACIONES(cotizaciones){
    return {
        type: 'GET_COTIZACIONES',
        payload: cotizaciones
    }
}
export function GETTING_COTIZACIONES(carga){
    return {
        type: 'GETTING_COTIZACIONES',
        payload: carga
    }
}
export function AxiosGetCotizaciones(carga){
    return function(dispatch){
        dispatch(GETTING_COTIZACIONES(carga))
        axios.get(`/clients/get/all/cotizaciones/`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_COTIZACIONES(false));
            return dispatch(GET_COTIZACIONES(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_COTIZACIONES(false));
            if(e.response.status == 404){
                return dispatch(GET_COTIZACIONES(404))
            }else{
                return dispatch(GET_COTIZACIONES('request'));
            }
        })
    }
}
export function AxiosGetCotizacionesByAsesor(carga,asesorId){
    return function(dispatch){
        dispatch(GETTING_COTIZACIONES(carga))
        axios.get(`/clients/get/all/cotizaciones/${asesorId}`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_COTIZACIONES(false));
            return dispatch(GET_COTIZACIONES(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_COTIZACIONES(false));
            if(e.response.status == 404){
                return dispatch(GET_COTIZACIONES(404))
            }else{
                return dispatch(GET_COTIZACIONES('request'));
            }
        })
    }
}


// VISITAS
export function GET_CALENDARIO(cotizaciones){
    return {
        type: 'GET_CALENDARIO',
        payload: cotizaciones
    }
}
export function GETTING_CALENDARIO(carga){
    return {
        type: 'GETTING_CALENDARIO',
        payload: carga
    }
}
export function AxiosGetCalendario(carga){
    return function(dispatch){
        dispatch(GETTING_CALENDARIO(carga))
        axios.get(`/calendario/get/all/`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_CALENDARIO(false));
            return dispatch(GET_CALENDARIO(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_CALENDARIO(false));
            if(e.response.status == 404){
                return dispatch(GET_CALENDARIO(404))
            }else{
                return dispatch(GET_CALENDARIO('request'));
            }
        })
    }
}