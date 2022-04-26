import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import { addShippingInfo } from '../../redux/actions/cartActions';
import { clearError } from '../../redux/actions/authActions';
import CheckoutSteps from './CheckoutSteps';


const Shipping = () => {

    
    const { user, error } = useSelector(state => state.auth);
    
    const [ adress, setAdress] = useState('');
    const [ city, setCity ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ postalCode, setPostalCode ] = useState('');
    const [ phone, setPhone ] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

        if (user) {
            setAdress(user.adress);
            setCity(user.city);
            setCountry(user.country);
            setPostalCode(user.postalCode);
            setPhone(user.phone);
            
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        
    }, [dispatch, error, user]);

    const submitHandle = e => {
        e.preventDefault();
        
        dispatch(addShippingInfo({adress, city, phone, postalCode, country}));
        history.push('confirm-order');
    }

  return (

        <Fragment>
            <MetaData title='Shipping Info' />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandle} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={adress}
                                onChange={e => setAdress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={e => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="country">Country</label>
                            <input 
                            type="text" 
                                className="form-control" 
                                id="country" 
                                value={country} name='country' 
                                onChange={e => setCountry(e.target.value)}
                            />
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
  )
}

export default Shipping;