import axios from 'axios';
import {
    ADD_TO_CART,
    ADD_SHIPPING_INFO,
    REMOVE_ITEM_CART
} from '../../constants/cartConstants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {

    const {data} = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity
      }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}
  
export const removeItem = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}
  
export const addShippingInfo = (data) => async (dispatch, getState) => {
    dispatch({
        type: ADD_SHIPPING_INFO,
        payload: data
    })
    
    localStorage.setItem('shippingInfo', JSON.stringify(getState().cart.shippingInfo));
}
  