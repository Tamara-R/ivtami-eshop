import { 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCTS_REQUEST,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERROR
} from '../../constants/productConstants'

export const productsReducer = (state = {products: []}, action) => {
    switch(action.type) {
        case ALL_PRODUCT_REQUEST:
        case PRODUCTS_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                count: action.payload.count
            }
        case PRODUCTS_SUCCESS:
          return {
              loading: false,
              products: action.payload.products,
              productsCount: action.payload.productsCount,
              resPerPage: action.payload.resPerPage,
              count: action.payload.count
          }
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case ALL_PRODUCT_FAIL:
        case PRODUCTS_FAIL:
        case ADMIN_PRODUCT_FAIL:
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



export const productDetailsReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
            ...state,
            loading: true
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
            loading: false,
            product: action.payload.product
            }
        case PRODUCT_DETAIL_FAIL:
            return {
            ...state,
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

export const newReviewReducer = (state = {}, action) => {
  
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          loading: true
        }
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload
        }
      case NEW_REVIEW_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      case NEW_REVIEW_RESET:
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

export const newProductReducer = (state={}, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        loading: true
      }
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product
      }
    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case NEW_PRODUCT_RESET:
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

export const deleteProductReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};

		case DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload.success,
			};

		case DELETE_PRODUCT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_PRODUCT_RESET:
			return {
				...state,
				isDeleted: false,
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


export const adminProductReducer = (state = {}, action) => {
  switch (action.type) {
    
		case UPDATE_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};


		case UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		
		case UPDATE_PRODUCT_FAIL:
			return {
				...state,
				error: action.payload,
			};


		case UPDATE_PRODUCT_RESET:
			return {
				...state,
				isUpdated: false,
			};

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	
  }
}

export const productReviewsReducer = (state = { review: [] }, action) => {
	switch (action.type) {
		case GET_REVIEWS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case GET_REVIEWS_SUCCESS:
			return {
				loading: false,
				reviews: action.payload,
			};

		case GET_REVIEWS_FAIL:
			return {
				...state,
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


export const reviewDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};

		case DELETE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};

		case DELETE_REVIEW_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_REVIEW_RESET:
			return {
				...state,
				isDeleted: false,
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