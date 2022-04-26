import axios from 'axios';

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
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    GET_REVIEWS_REQUEST,
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAIL,
    CLEAR_ERROR
} from '../../constants/productConstants';

// test action
export const getProducts = (keyword = '', currentPage = 1, category, rating = 0, price ) => async (dispatch) => {
    try {

        dispatch({
            type: ALL_PRODUCT_REQUEST
        })

        // lte = less than or equal to
        // gte = great than or equal to
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if(category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link);

        // console.log(response.data);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.error
        })
    }
}

// used one
export const getAllProducts = (keyword = '', category, brand, price, currentPage = 1) => async (dispatch) => {
    try {

        dispatch({
            type: PRODUCTS_REQUEST
        })

        let link = `/api/v1/allproducts?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`

        if(category) {
            link = `/api/v1/allproducts?keyword=${keyword}&page=${currentPage}&category=${category}&price[lte]=${price[1]}&price[gte]=${price[0]}`
        }

        if(brand) {
            link = `/api/v1/allproducts?keyword=${keyword}&page=${currentPage}&brand=${brand}&price[lte]=${price[1]}&price[gte]=${price[0]}`
        }

        if(brand && category) {
            link = `/api/v1/allproducts?keyword=${keyword}&page=${currentPage}&category=${category}&brand=${brand}&price[lte]=${price[1]}&price[gte]=${price[0]}`
        }

        
        const { data } = await axios.get(link);

        dispatch({
            type: PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: PRODUCTS_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {

    try {

        dispatch({type: PRODUCT_DETAIL_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);
        
        dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.response.data.error});
    }
}

export const createReview = (reviewData) => async (dispatch) => {

    try {

        dispatch({type: NEW_REVIEW_REQUEST});
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const {data} = await axios.put('/api/v1/review', reviewData, config);
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
      dispatch({type: NEW_REVIEW_FAIL, payload: error.response.data.error});
    }
}

export const getAdminProducts = () => async (dispatch) => {

    try {

        dispatch({type: ADMIN_PRODUCT_REQUEST});

        const {data} = await axios.get('/api/v1/admin/products');

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        })

    } catch (error) {

      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.error
      })
    }
}

export const createProduct = (productData) => async (dispatch) => {

    try {

        dispatch({type: NEW_PRODUCT_REQUEST});

        const config = {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }

        const {data} = await axios.post('/api/v1/admin/product/new', productData, config);
        dispatch({type: NEW_PRODUCT_SUCCESS, payload: data});
    } catch (error) {
        console.log(error.response)
        dispatch({type: NEW_PRODUCT_FAIL, payload: error.response.data.error});
    }
}

export const deleteProduct = id => async dispatch => {
	try {
		dispatch({ type: DELETE_PRODUCT_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

		dispatch({
			type: DELETE_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DELETE_PRODUCT_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const updateProduct = (id, productData) => async dispatch => {

	try {
		dispatch({ type: UPDATE_PRODUCT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(`/api/v1/admin/product/${id}`,
			productData,
			config
		);

		dispatch({
			type: UPDATE_PRODUCT_SUCCESS,
			payload: data.success,
		});

	} catch (error) {
		dispatch({
			type: UPDATE_PRODUCT_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const getProductReviews = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_REVIEWS_REQUEST });
        // passing the id of the product
		const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

		dispatch({ type: GET_REVIEWS_SUCCESS, payload: data.reviews });

	} catch (error) {
		dispatch({ type: GET_REVIEWS_FAIL, payload: error.response.data.error });
	}
};


export const deleteReview = (id, productId) => async dispatch => {
	try {
		dispatch({ type: DELETE_REVIEW_REQUEST });

		const { data } = await axios.delete(
			`/api/v1/reviews?id=${id}&productId=${productId}`
		);

		dispatch({
			type: DELETE_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		// console.log(error.response);

		dispatch({
			type: DELETE_REVIEW_FAIL,
			payload: error.response.data.error,
		});
	}
};

// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}