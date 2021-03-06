import React, { Fragment } from 'react';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { addToCart, removeItem } from '../../redux/actions/cartActions';

const Cart = () => {

    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const increaseQuantity = (product, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        dispatch(addToCart(product, newQty));
    }

    const decreaseQuantity = (product, quantity) => {
        const newQty = quantity - 1;
        if (newQty < 1) return;
        dispatch(addToCart(product, newQty))
    }

    const removeItemFromCart = (id) => {
        dispatch(removeItem(id));
        alert.success('Item has been removed from cart');
    }

    const handleCheckout = () => {
        history.push('/login?redirect=shipping');
    }
    
    return (
        <Fragment>
        <MetaData title='Cart' />
        {cartItems.length === 0 ? <div className="mt-5 d-flex justify-content-center"><h2 className="mt-5 py-5">Your cart is empty!</h2></div> : (
            <>
            <h2 className="mt-5">Your have : <b>{cartItems.length} items in your cart.</b></h2>
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8">
                {
                    cartItems.map(item => (
                    <>
                        <hr />
                        <div className="cart-item" key={item.product}>
                            <div className="row">
                                <div className="col-4 col-lg-3">
                                    <img src={item.image} alt="Laptop" height="90" width="115" />
                                </div>

                                <div className="col-5 col-lg-3">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p id="card_item_price">${item.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <div className="stockCounter d-inline">
                                        <span className="btn btn-danger minus" onClick={() => decreaseQuantity(item.product, item.quantity)}>-</span>
                                        <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                        <span className="btn btn-primary plus" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</span>
                                    </div>
                                </div>

                                <div className="col-4 col-lg-1 mt-4 mt-lg-0" onClick={() => removeItemFromCart(item.product)}>
                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                                </div>

                            </div>
                        </div>
                        <hr />
                    </>
                    ))
                }
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + item.quantity), 0)} (Units)</span></p>
                        <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => (acc + (item.quantity * item.price)), 0).toFixed(2)}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={handleCheckout}>Check out</button>
                    </div>
                </div>
            </div>
            </>
        )}
        </Fragment>
    )
}

export default Cart;