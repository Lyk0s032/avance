import { createStore } from "redux";

const initialState = {
    // Usuario
    usuario: null,
    loadingUser:false,
    
    // Business
    clients: null,
    loadingClients: false,

    cliente: null,
    loadingCliente: false,
    
    intentos: null,
    loadingIntentos:false,

    contactos: null,
    loadingContactos: false,

    visita: null,
    loadingVisitas: false,

    cotizaciones: null,
    loadingCotizaciones: null,

    calendario: null,
    loadingCalendario: false,
    // // asesor
    // asesor: null,
    // // Clientes
    // clients: null,
    // loadingClients: false,
    // // Cliente individual
    // client: null,
    // gettingClient: false,
    // // Prospectos
    // prospects:null,
    // loadingProspect: false,

    // // Prospect
    // prospect: null,
    // loadingProspect: false,

    // // Project
    // project: null,
    // loadingProject: false,

    // note: null,
}
export default (state = initialState, action) => {
    switch(action.type){
        case 'GET_USER':
            return {
                ...state,
                usuario: action.payload,
                loadingUser: false,
            }
        case 'GETTING_USER':
            return {
                ...state,
                loadingUser: action.payload
            }
        case 'GET_CLIENTS':
            return {
                ...state,
                clients: action.payload,
                loadingClients: false
            }
        case 'GETTING_CLIENTS':
            return {
                ...state,
                loadingClients: action.payload
            }

        case 'GET_CLIENTE':
            return {
                ...state,
                cliente: action.payload,
                loadingCliente:false
            }
        case 'GETTING_CLIENTE':
            return {
                ...state,
                loadingCliente:true
            }
        case 'GET_INTENTOS':
            return {
                ...state,
                intentos:action.payload,
                loadingIntentos: false
            }
        case 'GETTING_INTENTOS':
            return {
                ...state,
                loadingIntentos: action.payload
            }
        case 'GET_CONTACTOS':
            return {
                ...state,
                contactos:action.payload,
                loadingContactos: false
            }
        case 'GETTING_CONTACTOS':
            return {
                ...state,
                loadingContactos: action.payload
            }
        // VISITAS
        case 'GET_VISITAS':
            return {
                ...state,
                visitas:action.payload,
                loadingVisitas: false
            }
        case 'GETTING_VISITAS':
            return {
                ...state,
                loadingVisitas: action.payload
            }
        // COTIZACIONES
        case 'GET_COTIZACIONES':
            return {
                ...state,
                cotizaciones:action.payload,
                loadingCotizaciones: false
            }
        case 'GETTING_COTIZACIONES':
            return {
                ...state,
                loadingCotizaciones: action.payload
            }
        // CALENDARIO
        case 'GET_CALENDARIO':
            return {
                ...state,
                calendario:action.payload,
                loadingCalendario: false
            }
        case 'GETTING_CALENDARIO':
            return {
                ...state,
                loadingCalerndario: action.payload
            }

        default:
            return {
                ...state
            }
    }
}