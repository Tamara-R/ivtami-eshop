import {
    ALL_BRANDS_REQUEST,
    ALL_BRANDS_SUCCESS,
    ALL_BRANDS_FAIL,
    CREATE_BRAND_REQUEST,
    CREATE_BRAND_SUCCESS,
    CREATE_BRAND_FAIL,
    CREATE_BRAND_RESET,
    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAIL,
    UPDATE_BRAND_RESET,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAIL,
    DELETE_BRAND_RESET,
    CLEAR_ERROR
} from '../../constants/brandConstants';

export const allBrandsReducers = ( state = {brands: []}, action ) => {
    switch(action.type) {
        case ALL_BRANDS_REQUEST:
            return {
                loading: true,
                brands: []
            }
        case ALL_BRANDS_SUCCESS:
            return {
                loading: false,
                brands: action.payload
            }
        case ALL_BRANDS_FAIL:
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
  
  export const newBrandReducers = (state = {}, action) => {
      switch (action.type) {
        case CREATE_BRAND_REQUEST:
          return {
            ...state,
            loading: true
          }
        case CREATE_BRAND_SUCCESS:
          return {
            loading: false,
            success: action.payload.success,
            brand: action.payload.brand
          }
        case CREATE_BRAND_FAIL:
          return {
            loading: false,
            error: action.payload
          }
        case CREATE_BRAND_RESET:
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
  
export const brandDetailsReducer = (state = { brand: {} }, action) => {
    switch (action.type) {
        case BRAND_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case BRAND_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                brand: action.payload,
            };

        case BRAND_DETAILS_FAIL:
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

export const brandChangeReducers = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BRAND_REQUEST:
        case DELETE_BRAND_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_BRAND_FAIL:
        case DELETE_BRAND_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_BRAND_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_BRAND_RESET:
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