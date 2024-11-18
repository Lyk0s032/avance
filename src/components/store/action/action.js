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
    return async function(dispatch){
        dispatch(GETTING_CLIENTS(carga))
        axios.get(`/clients/get/all/panel/`)
        .then((info) => info.data)
        .then(async inf => {
            console.log(inf)
            dispatch(GETTING_CLIENTS(false));
            return dispatch(GET_CLIENTS(inf));
        })

        .catch(e => {
            console.log('error')
            dispatch(GETTING_CLIENTS(false));
            if(e.status == 404){
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

// OBTENER LEADS
export function GET_LEADS(clientes){
    return {
        type: 'GET_LEADS',
        payload: clientes
    }
}
export function GETTING_LEADS(carga){
    return {
        type: 'GETTING_LEADS',
        payload: carga
    }
}

export function AxiosGetLeads(carga, page, asesor){
    return function(dispatch){
        dispatch(GETTING_LEADS(carga))
        axios.get(`/client/get/all/visualizar/`, {
            params: {
                page: page,
                asesor: asesor ? asesor : null
            }
        })
        .then((info) => {
            console.log(info);
            return info.data.rows
        })
        .then(inf => {
            dispatch(GETTING_LEADS(false));
            return dispatch(GET_LEADS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_LEADS(false));
            if(e.response.status == 404){
                return dispatch(GET_LEADS(404))
            }else{
                return dispatch(GET_LEADS('request'));
            }
        })
    }
}

export function SearchClientLeads(leads){
    return function(dispatch){
        dispatch(GET_LEADS(leads))
    }
}
// OBTENER DATOS PARA VISUALIZAR ASESORES.
export function GET_ADVISORS(advisors){
    return {
        type: 'GET_ADVISORS',
        payload: advisors
    }
}


// GETTINGS NOTIFICATIONS
export function GET_NOTIFICATIONS(notifications){
    return {
        type: 'GET_NOTIFICATIONS',
        payload: notifications
    }
}
export function GETTING_NOTIFICATIONS(carga){
    return {
        type: 'GETTING_NOTIFICATIONS',
        payload: carga
    }
}

export function AxiosGetNotifications(carga){
    return async function(dispatch){
        dispatch(GETTING_NOTIFICATIONS(carga))
        console.log('Llego aqui')

        await axios.get(`/calendario/notification/get/all`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_NOTIFICATIONS(false));
            return dispatch(GET_NOTIFICATIONS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_NOTIFICATIONS(false));
            if(e.response.status == 404){
                return dispatch(GET_NOTIFICATIONS(404))
            }else{
                return dispatch(GET_NOTIFICATIONS('request'));
            }
        })
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

// APROBADAS
export function GET_APROBADAS(aprobadas){
    return {
        type: 'GET_APROBADAS',
        payload: aprobadas
    }
}
export function GETTING_APROBADAS(carga){
    return {
        type: 'GETTING_APROBADAS',
        payload: carga
    }
}
export function AxiosGetAprobadas(carga){
    return function(dispatch){
        dispatch(GETTING_APROBADAS(carga))
        axios.get(`/clients/get/all/aprobadas/`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_APROBADAS(false));
            return dispatch(GET_APROBADAS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_APROBADAS(false));
            if(e.response.status == 404){
                return dispatch(GET_APROBADAS(404))
            }else{
                return dispatch(GET_APROBADAS('request'));
            }
        })
    }
}
export function AxiosGetAprobadasByAsesor(carga,asesorId){
    return function(dispatch){
        dispatch(GETTING_APROBADAS(carga))
        axios.get(`/clients/get/all/aprobadas/${asesorId}`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_APROBADAS(false));
            return dispatch(GET_APROBADAS(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_APROBADAS(false));
            if(e.response.status == 404){
                return dispatch(GET_APROBADAS(404))
            }else{
                return dispatch(GET_APROBADAS('request'));
            }
        })
    }
}



export function AxiosGetAllFunctionsForAsesor(carga, asesorId){
    return function(dispatch){
        dispatch(AxiosGetCotizacionesByAsesor(carga, asesorId))
        dispatch(AxiosGetVisitasByAsesor(carga, asesorId))
        dispatch(AxiosGetContactosByAsesor(carga, asesorId))
        dispatch(AxiosGetClientsByAsesor(carga, asesorId))
        dispatch(AxiosGetPerdidoByAsesor(carga, asesorId))
        dispatch(AxiosGetEsperaByAsesor(carga, asesorId))
        dispatch(AxiosGetAprobadas(carga, asesorId));

    }
}
export function AxiosGetAllFunctionForLider(carga){
    return function(dispatch){
        dispatch(AxiosGetIntentos(carga));
        dispatch(AxiosGetCotizaciones(carga))
        dispatch(AxiosGetVisitas(carga))
        dispatch(AxiosGetContactos(carga));
        dispatch(AxiosGetClients(carga));
        dispatch(AxiosGetPerdido(carga));
        dispatch(AxiosGetEspera(carga));
        dispatch(AxiosGetAprobadas(carga));


    }

}
export function GET_CLIENT_NEW_COTIZACION(client){
    return {
        type: 'GET_CLIENT_NEW_COTIZACION',
        payload: client
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
export function AxiosGetCalendario(carga, asesor){
    return function(dispatch){
        dispatch(GETTING_CALENDARIO(carga))
        axios.get(`/calendario/get/all/`, {
            params:{
                asesor: asesor ? asesor : null
            }
        })
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

export function GET_CALENDARY(data){
    return {
        type: 'GET_CALENDARY',
        payload: data
    }
}

export function GETTING_ESPERA(carga){
    return {
        type: 'GETTING_ESPERA',
        payload: carga
    }
}
export function GET_ESPERA(res){
    return {
        type: 'GET_ESPERA',
        payload: res
    }
}
// PARA LIDER
export function AxiosGetEspera(carga){
    return function(dispatch){
        dispatch(GETTING_ESPERA(carga))
        axios.get(`/clients/get/all/espera/`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_ESPERA(false));
            return dispatch(GET_ESPERA(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_ESPERA(false));
            if(e.response.status == 404){
                return dispatch(GET_ESPERA(404))
            }else{
                return dispatch(GET_ESPERA('request'));
            }
        })
    }
}

// PARA ASESOR
export function AxiosGetEsperaByAsesor(carga,asesorId){
    return function(dispatch){
        dispatch(GETTING_ESPERA(carga))
        axios.get(`/clients/get/all/espera/${asesorId}`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_ESPERA(false));
            return dispatch(GET_ESPERA(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_ESPERA(false));
            if(e.response.status == 404){
                return dispatch(GET_ESPERA(404))
            }else{
                return dispatch(GET_ESPERA('request'));
            }
        })
    }
}



export function GETTING_PERDIDO(carga){
    return {
        type: 'GETTING_PERDIDO',
        payload: carga
    }
}
export function GET_PERDIDO(res){
    return {
        type: 'GET_PERDIDO',
        payload: res
    }
}
// PARA LIDER
export function AxiosGetPerdido(carga){
    return function(dispatch){
        dispatch(GETTING_PERDIDO(carga))
        axios.get(`/clients/get/all/perdido/`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_PERDIDO(false));
            return dispatch(GET_PERDIDO(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_PERDIDO(false));
            if(e.response.status == 404){
                return dispatch(GET_PERDIDO(404))
            }else{
                return dispatch(GET_PERDIDO('request'));
            }
        })
    }
}

// PARA ASESOR
export function AxiosGetPerdidoByAsesor(carga,asesorId){
    return function(dispatch){
        dispatch(GETTING_PERDIDO(carga))
        axios.get(`/clients/get/all/perdido/${asesorId}`)
        .then((info) => info.data)
        .then(inf => {
            console.log(inf)
            dispatch(GETTING_PERDIDO(false));
            return dispatch(GET_PERDIDO(inf));
        })
        .catch(e => {
            console.log('error')
            dispatch(GETTING_PERDIDO(false));
            if(e.response.status == 404){
                return dispatch(GET_PERDIDO(404))
            }else{
                return dispatch(GET_PERDIDO('request'));
            }
        })
    }
}