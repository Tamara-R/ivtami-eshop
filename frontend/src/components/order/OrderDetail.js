import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from './../layout/MetaData';
import Loader from './../layout/Loader';
import { clearError, orderDetail } from '../../redux/actions/orderActions';

const OrderDetail = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, loading, order={}} = useSelector(state => state.orderDetails);
    const {shippingInfo, user, totalPrice, orderStatus, orderItems, paymentInfo} = order;
    const address = shippingInfo && `${shippingInfo.adress}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

    useEffect(() => {

        dispatch(orderDetail(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [dispatch, error, alert, match.params.id]);

    return (
        <Fragment>
            <MetaData title='Order Detail' />
            {
                loading ? <Loader /> : (

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">
                        <h1 className="my-5">Order # {order._id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user && user.name } {user && user.lastName}</p>
                        <p><b>Phone:</b> {shippingInfo && shippingInfo.phone}</p>
                        <p className="mb-4"><b>Address:</b>{address}</p>
                        <p><b>Amount:</b> ${totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Payment</h4>
                        <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>

                        <h4 className="my-4">Order Status:</h4>
                        <p className={orderStatus === 'Delivered' ? 'greenColor' : 'redColor'}><b>{orderStatus}</b></p>

                        <h4 className="my-4">Order Items:</h4>

                        {
                            orderItems && orderItems.map(orderItem => (
                            <Fragment>
                                <hr />
                                <div className="cart-item my-1">
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                    <img src={orderItem.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                    <Link to={`/product/${orderItem.product}`}>{orderItem.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${orderItem.price}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{orderItem.quantity} Piece(s)</p>
                                    </div>
                                </div>
                                </div>
                                <hr />
                            </Fragment>
                            ))
                        }
                        </div>
                    </div>
                )
            }
        </Fragment>
    )
}

export default OrderDetail;