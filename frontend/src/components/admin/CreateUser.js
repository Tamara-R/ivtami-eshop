import React, { useState, useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { clearError, createUser } from '../../redux/actions/authActions';

const CreateUser = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { error, success } = useSelector(state => state.newUser);

    const [ name, setName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const [ adress, setAdress] = useState('');
    const [ city, setCity ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ postalCode, setPostalCode ] = useState('');
    const [ phone, setPhone ] = useState('');
	const [ dateOfBirth, setDateOfBirth ] = useState('');
	const [ role, setRole ] = useState('');
	const [ emptyError, setEmptyError ] = useState('');

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {
            history.push('/admin/users');
            alert.success('User has been created!');

        }
    }, [dispatch, history, alert, error, success]);

    
    const handleSubmit = e => {
        e.preventDefault();

		if( name.trim() === '' || lastName.trim() === '' || 
            email.trim() === '' || password.trim() === '' ||
            adress.trim() === '' || city.trim() === '' ||
            country.trim() === '' || postalCode.trim() === '' ||
            phone.trim() === ''
        ) {
            setEmptyError('Required field!');   
        }
        
        dispatch(createUser({name, lastName, email, password, 
            adress, city, country, postalCode, 
            phone, dateOfBirth, role
        }));

    }

    
    return (
        <Fragment>
            <MetaData title='Create User' />
            <div className="row">
                <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>
                <div className="col-12 col-lg-8 ml-5">
                <form className="shadow-lg px-5 py-5" onSubmit={handleSubmit} encType='multipart/form-data' autoComplete='off'>
                    <h2 className="ui center aligned container mb-3">Create User</h2>
                    <hr />
                    <div className='form row'>
                        <div className="form-group col-md-6">
                            <label htmlFor="name_field">First Name</label>
                            <input type="text" id="name_field" className="form-control"
                                value={name} name='name' onChange={e => setName(e.target.value)} 
                            />
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="LastName_field">Last Name</label>
                            <input type="text" id="lastName_field" className="form-control"
                                value={lastName} name='lastName' onChange={e => setLastName(e.target.value)} 
                            />
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                        </div>
                    </div>
                    <div className='form row'>
                        <div className="form-group col-md-6">
                            <label htmlFor="email_field">Email</label>
                            <input type="email" id="email_field" className="form-control"
                                value={email} name='email' onChange={e => setEmail(e.target.value)}
                            />
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password_field">Password</label>
                            <input type="password" id="password_field" className="form-control"
                                value={password} name='password' onChange={e => setPassword(e.target.value)}
                            />
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                        </div>
                    </div>
                    <div className='form row'>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone_field">Phone</label>
                            <input type="text" id="phone_field" className="form-control"
                                value={phone} name='phone' onChange={e => setPhone(e.target.value)}
                            />
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="date_field">Date of Birth</label>
                            <input type="text" id="date_field" className="form-control"
                                value={dateOfBirth} name='dateOfBirth' onChange={e => setDateOfBirth(e.target.value)}
                            />
                        </div>
                        
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputCity">Address</label>
                            <input type="text" className="form-control" id="adress" 
                                value={adress} name='adress' onChange={e => setAdress(e.target.value)}
                            />
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                            </div>
                        <div className="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input type="text" className="form-control" id="city" 
                                value={city} name='city' onChange={e => setCity(e.target.value)}
                            />
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                            </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control" id="country" 
                                value={country} name='country' onChange={e => setCountry(e.target.value)}
                            />
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="postalCode">Zip</label>
                            <input type="text" className="form-control" id="postalCode" 
                                value={postalCode} name='postalCode' onChange={e => setPostalCode(e.target.value)}
                            />
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="date_field">Role</label>
                            <select
                                className="form-control"
                                name='role'
                                value={role}
                                onChange={e => setRole(e.target.value)}
                            >
                                <option disabled={true} selected={true} value=''>Select role</option>
                                <option value='user'>user</option>
                                <option value='admin'>admin</option>
                                
                            </select>
                            <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                        </div>
                    </div>
                    
                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-2"
                    >
                        CREATE USER
                    </button>
                </form>
            </div>
        </div>
        </Fragment>
    )
}

export default CreateUser
