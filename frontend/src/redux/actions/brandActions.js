import axios from 'axios';
import {
    ALL_BRANDS_REQUEST,
    ALL_BRANDS_SUCCESS,
    ALL_BRANDS_FAIL,
    CREATE_BRAND_REQUEST,
    CREATE_BRAND_SUCCESS,
    CREATE_BRAND_FAIL,
    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAIL,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAIL,
    CLEAR_ERROR
} from '../../constants/brandConstants';

export const getAllBrands = () => async (dispatch) => {

    try {
        dispatch({type: ALL_BRANDS_REQUEST});

        const {data} = await axios.get('/api/v1/brands');

        dispatch({ type: ALL_BRANDS_SUCCESS, payload: data.brands })

    } catch (error) {
        dispatch({ type: ALL_BRANDS_FAIL, payload: error.response.data.error
      })
    }
}
export const createBrand = brand => async (dispatch) => {

	try {

		dispatch({ type: CREATE_BRAND_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/v1/brand/create', brand, config);

		dispatch({ type: CREATE_BRAND_SUCCESS, payload: data });

	} catch (error) {
        
        dispatch({ type: CREATE_BRAND_FAIL, payload: error.response.data.error });
    }
};

export const getBrandDetails = id => async dispatch => {

	try {
		dispatch({ type: BRAND_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/brand/${id}`);

		dispatch({ type: BRAND_DETAILS_SUCCESS, payload: data.brand });

	} catch (error) {
        
		dispatch({ type: BRAND_DETAILS_FAIL, payload: error.response.data.error });
	}
};

export const updateBrand = (id, brandData) => async dispatch => {

	try {

		dispatch({ type: UPDATE_BRAND_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(`/api/v1/admin/brand/${id}`, brandData, config);

		dispatch({ type: UPDATE_BRAND_SUCCESS, payload: data });
    
	} catch (error) {
		dispatch({ type: UPDATE_BRAND_FAIL, payload: error.response.data.error });
	}
};

export const deleteBrand = id => async dispatch => {

	try {
		dispatch({ type: DELETE_BRAND_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/brand/${id}`);

		dispatch({ type: DELETE_BRAND_SUCCESS, payload: data.success });

	} catch (error) {
		dispatch({ type: DELETE_BRAND_FAIL, payload: error.response.data.error });
		
	}
};

export const clearError = () => async (dispatch) => {
    dispatch({type: CLEAR_ERROR});
}
