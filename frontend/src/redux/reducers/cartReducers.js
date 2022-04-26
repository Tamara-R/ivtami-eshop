import {
    ADD_TO_CART,
    ADD_SHIPPING_INFO,
    REMOVE_ITEM_CART
} from '../../constants/cartConstants';

export const cartReducers = (state = {cartItems: [], shippingInfo: {}}, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
        const isExists = state.cartItems.find(i => i.product === item.product);
        if (isExists) {
          return {
            ...state,
            cartItems: state.cartItems.map(i => i.product === isExists.product ? item : i)
          }
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item]
          }
        }
      case REMOVE_ITEM_CART:
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product !== action.payload)
        }
      case ADD_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload
        }
      default:
        return state;
    }
}