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

    //Notificaciones
    notifications: null,
    loadingNotifications: false,
    // Leads
    leads: null,
    loadingLeads: false,

    searchLeads: null,
    loadingSearchLeads: false,
    // Visualizar asesores.
    advisors: null,
    loadingAdvisors: false,
    
    intentos: null,
    loadingIntentos:false,

    contactos: null,
    loadingContactos: false,

    visita: null,
    loadingVisitas: false,

    cotizaciones: null,
    loadingCotizaciones: null,

    aprobadas: null,
    loadingAprobadas: false,

    espera:null,
    loadingEspera: false,

    perdido: null,
    loadingPerdido: false,

    newCotizacion: null,
    loadingNewCotizacion:false,

    calendario: null,
    loadingCalendario: false,

    calendary: null


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
 
        // LEADS
        case 'GET_LEADS':
            return {
                ...state,
                leads: action.payload,
                loadingLeads: false
            }
        case 'GETTING_LEADS':
            return {
                ...state,
                loadingLeads: action.payload
            }

        case 'GET_SEARCH_LEADS':
            return {
                ...state,
                searchLeads: action.payload
            }
        case 'GETTING_SEARCH_LEADS':
            return {
                ...state,
                loadingSearchLeads: action.payload
            }


        case 'GETTING_NOTIFICATIONS':
            return {
                ...state,
                loadingNotifications:action.payload
            }
        
        case 'GET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.payload,
                loadingNotifications:false
            }
        // OBTENER DATOS PARA VISUALIZAR ASESOR
        case 'GET_ADVISORS':
            return {
                ...state,
                advisors:action.payload,
                loadingAdvisors: false
            }
        case 'GETTING_ADVISORS':
            return {
                ...state,
                loadingAdvisors: action.payload
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

        // APROBADAS
        case 'GET_APROBADAS':
            return {
                ...state,
                aprobadas:action.payload,
                loadingAprobadas: false
            }
        case 'GETTING_APROBADAS':
            return {
                ...state,
                loadingAprobadas: action.payload
            }

        case 'GET_CLIENT_NEW_COTIZACION':
            return {
                ...state,
                newCotizacion: action.payload,
                loadingNewCotizacion: false
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
        case 'GET_CALENDARY':
            return {
                ...state,
                calendary: action.payload
            }

        case 'GETTING_ESPERA':
            return {
                ...state,
                loadingEspera: action.payload
            }
        
        case 'GET_ESPERA':
            return {
                ...state,
                espera: action.payload,
                loadingEspera: false
            }

        case 'GETTING_PERDIDO':
            return {
                ...state,
                loadingPerdido: action.payload
            }
        
        case 'GET_PERDIDO':
            return {
                ...state,
                perdido: action.payload,
                loadingPerdido: false
            }

        default:
            return {
                ...state
            }
    }
}