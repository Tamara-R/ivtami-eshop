import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const OrderSuccess = () => {

    return (
        <Fragment>
            <MetaData title={'Order success!'} />
            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src='/images/success-check-mark-icon-animation-video.jpg' alt="Order Success" width="200" height="200" />

                <h2>Your Order has been placed successfully.</h2>

                <Link to="/my-orders">Go to Orders</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default OrderSuccess;