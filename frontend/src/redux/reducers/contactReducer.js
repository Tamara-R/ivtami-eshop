import {
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_SUCCESS,
    CREATE_CONTACT_FAIL,
    CREATE_CONTACT_RESET,
    ALL_CONTACTS_REQUEST,
    ALL_CONTACTS_SUCCESS,
    ALL_CONTACTS_FAIL,
    CONTACT_DETAIL_REQUEST,
    CONTACT_DETAIL_SUCCESS,
    CONTACT_DETAIL_FAIL,
    UPDATE_CONTACT_REQUEST,
    UPDATE_CONTACT_SUCCESS,
    UPDATE_CONTACT_FAIL,
    UPDATE_CONTACT_RESET,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAIL,
    DELETE_CONTACT_RESET,
    CLEAR_ERROR
} from '../../constants/contactConstants';

export const newContactReducers = (state = {}, action) => {
    switch (action.type) {
        case CREATE_CONTACT_REQUEST:
            return {
            ...state,
            loading: true
            }
        case CREATE_CONTACT_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            contact: action.payload.contact
            }
        case CREATE_CONTACT_FAIL:
            return {
            loading: false,
            error: action.payload
            }
        case CREATE_CONTACT_RESET:
            return {
            ...state,
            success: false
            }
        case CLEAR_ERROR:
            return {
            ...state,
            error: null
            }
        default:
            return state;
    }
}


export const allContactReducers = ( state = {contacts: []}, action ) => {
    switch(action.type) {
        case ALL_CONTACTS_REQUEST:
        return {
            loading: true,
            contacts: []
        }
        case ALL_CONTACTS_SUCCESS:
        return {
            loading: false,
            contacts: action.payload
        }
        case ALL_CONTACTS_FAIL:
        return {
            loading: false,
            error: action.payload
        }
        case CLEAR_ERROR: 
        return {
            ...state,
            error: null
        }
        default:
        return state;
    }
}


export const contactDetailsReducer = (state = { contact: {} }, action) => {
    switch (action.type) {
        case CONTACT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                contact: action.payload,
            };
        case CONTACT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const deleteContactReducers = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_CONTACT_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export const updateContactReducers = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_CONTACT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}