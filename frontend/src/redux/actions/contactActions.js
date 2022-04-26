import axios from "axios";

import {
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_SUCCESS,
    CREATE_CONTACT_FAIL,
    ALL_CONTACTS_REQUEST,
    ALL_CONTACTS_SUCCESS,
    ALL_CONTACTS_FAIL,
    CONTACT_DETAIL_REQUEST,
    CONTACT_DETAIL_SUCCESS,
    CONTACT_DETAIL_FAIL,
    UPDATE_CONTACT_REQUEST,
    UPDATE_CONTACT_SUCCESS,
    UPDATE_CONTACT_FAIL,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAIL,
    CLEAR_ERROR
} from '../../constants/contactConstants';

export const createContact = contact => async (dispatch) => {

	try {

		dispatch({ type: CREATE_CONTACT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/v1/contact/create', contact, config);

		dispatch({ type: CREATE_CONTACT_SUCCESS, payload: data });

	} catch (error) {
        console.log(error.response)
        dispatch({ type: CREATE_CONTACT_FAIL, payload: error.response.data.error });
    }
};
export const getAllContacts = () => async (dispatch) => {

    try {
        dispatch({type: ALL_CONTACTS_REQUEST});

        const {data} = await axios.get('/api/v1/contacts');

        dispatch({ type: ALL_CONTACTS_SUCCESS, payload: data.contacts })

    } catch (error) {

      dispatch({ type: ALL_CONTACTS_FAIL, payload: error.response.data.error })
    }
}


export const getContactDetails = id => async dispatch => {
	try {
		dispatch({ type: CONTACT_DETAIL_REQUEST });

		const { data } = await axios.get(`/api/v1/contact/${id}`);

		dispatch({ type: CONTACT_DETAIL_SUCCESS, payload: data.contact });

	} catch (error) {
        // console.log(error)
		dispatch({ type: CONTACT_DETAIL_FAIL, payload: error.response.data.error });
	}
};

export const updateConstactStatus = (id, contactStatus) => async dispatch => {

	try {

		dispatch({ type: UPDATE_CONTACT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(`/api/v1/admin/contact/${id}`, contactStatus, config);

		dispatch({ type: UPDATE_CONTACT_SUCCESS, payload: data });
    
	} catch (error) {
		dispatch({ type: UPDATE_CONTACT_FAIL, payload: error.response.data.error });
	}
};

export const deleteContact = id => async dispatch => {

	try {
		dispatch({ type: DELETE_CONTACT_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/contact/${id}`);

		dispatch({ type: DELETE_CONTACT_SUCCESS, payload: data.success });

	} catch (error) {
		dispatch({ type: DELETE_CONTACT_FAIL, payload: error.response.data.error });
		
	}
};

export const clearError = () => async (dispatch) => {
    dispatch({type: CLEAR_ERROR});
}


