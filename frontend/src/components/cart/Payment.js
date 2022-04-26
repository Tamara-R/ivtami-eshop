import React, { Fragment, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

import CheckoutSteps from './CheckoutSteps';
import { createOrder, clearError } from '../../redux/actions/orderActions';

const options = {
  style: {
    base: {
      fontSize: '16px'
    },
    invalid: {
      color: '#9e2146'
    }
  }
}

const Payment = () => {

    const { user } = useSelector(state => state.auth);
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder);

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
      
      if(error) {
        alert.error(error);
        dispatch(clearError());
      }
    }, [dispatch, alert, error])

    
    const order = {
        orderItems: cartItems,
        shippingInfo
    };

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.taxPrice = orderInfo.taxPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

   
    const handleSubmit = async (e) => {
      e.preventDefault();
      document.querySelector('#pay_btn').disabled = true;
      let res;

      try {
        const config =   {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        res = await axios.post('/api/v1/payment/process', paymentData, config);
        const clientSecret = res.data.client_secret;
        // console.log(clientSecret)

        if (!stripe || !elements) {
          return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              // lastName: user.lastName,
              email: user.email
            }
          }
        })

        if (result.error) {
          alert.error(result.error.message);
          document.querySelector('#pay_btn').disabled = false;
        } else {
          if (result.paymentIntent.status === 'succeeded') {
					order.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
					};

					dispatch(createOrder(order));
          
          localStorage.removeItem('cartItems', JSON.stringify(cartItems));
          localStorage.removeItem('shippingInfo', JSON.stringify(shippingInfo));
					history.push('/success');
				

          } else {
            alert.error('There is some issue while process payment')
          }
        }
      } catch (error) {
        document.querySelector('#pay_btn').disabled = false;
       
      }
    }

    return (

      <Fragment>
        <CheckoutSteps shipping confirmOrder payment />
        <MetaData title='Payment' />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
              <h1 className="mb-4">Card Info</h1>
              <div className="form-group">
                <label htmlFor="card_num_field">Card Number</label>
                <CardNumberElement
                  type="text"
                  id="card_num_field"
                  className="form-control"
                  options={options}
                />
              </div>
          
              <div className="form-group">
                <label htmlFor="card_exp_field">Card Expiry</label>
                <CardExpiryElement
                  type="text"
                  id="card_exp_field"
                  className="form-control"
                  options={options}
                />
              </div>
          
              <div className="form-group">
                <label htmlFor="card_cvc_field">Card CVC</label>
                <CardCvcElement
                  type="text"
                  id="card_cvc_field"
                  className="form-control"
                  options={options}
                />
              </div>
              
              <button
                id="pay_btn"
                type="submit"
                className="btn btn-block py-3"
              >
                Pay {`${orderInfo.totalPrice}`}
              </button>
            </form>
 
          </div>
        </div>
      </Fragment>
    )
}

export default Payment;