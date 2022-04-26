import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = () => {

    const { user } = useSelector(state => state.auth);
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const history = useHistory();
  
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shipping = subtotal > 30 ? 0 : 10; 
    const tax = Number((0.05 * subtotal).toFixed(2));
    const totalPrice = (subtotal + shipping + tax).toFixed(2);
  
    const proceedToPayment = () => {
      const data = {
        subtotal: subtotal.toFixed(2),
        shipping,
        tax,
        totalPrice
      };
      sessionStorage.setItem('orderInfo', JSON.stringify(data));
      history.push('/payment');
    }
    return (

        <Fragment>
            <MetaData title='Confirm Order' />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user.name} {user.lastName}</p>
                    <p><b>Phone:</b> {shippingInfo.phone}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.adress}, ${shippingInfo.city}, ${shippingInfo.country}, ${shippingInfo.postalCode}`}</p>
                    
                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>
        
                    {
                        cartItems.map(item => (
                            <div key={item.product}>
                                <hr />
                                <div className="cart-item my-1">
                                    <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>
                
                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                
                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>
                
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))
                    }
        
                </div>
                    
                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${(subtotal).toFixed(2)}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shipping}</span></p>
                        <p>Tax:  <span className="order-summary-values">${tax}</span></p>
            
                        <hr />
            
                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>
            
                        <hr />
                        <button onClick={proceedToPayment} id="checkout_btn" className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
                </div>
            </div>
      </Fragment>
    )
}
  
export default ConfirmOrder;