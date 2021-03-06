import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({shipping, confirmOrder, payment}) => {
  return (
    <div className='checkout-process d-flex justify-content-center mt-5'>
      {
        shipping ? <Link to='/shipping' className='float-right'>
            <div className="triange2-active"></div>
            <div className="step active-step">Shipping</div>
            <div className="triangle-active"></div>
                </Link> : <Link to='#!' disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping</div>
                    <div className="triangle-incomplete"></div>
                </Link>
      }

      {
        confirmOrder ? <Link to='confirm-order' className='float-right'>
            <div className="triange2-active"></div>
            <div className="step active-step">Confirm order</div>
            <div className="triangle-active"></div>
                </Link> : <Link to='#!' disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Confirm</div>
                    <div className="triangle-incomplete"></div>
                </Link>
      }

      {
        payment ? <Link to='/payment' className='float-right'>
            <div className="triange2-active"></div>
            <div className="step active-step">Payment</div>
            <div className="triangle-active"></div>
                </Link> : <Link to='#!' disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Payment</div>
                    <div className="triangle-incomplete"></div>
                </Link>
      }
    </div>
  )
}

export default CheckoutSteps;