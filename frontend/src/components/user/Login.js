import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { login, clearError } from '../../redux/actions/authActions';

const Login = ({location}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, isAuthenticated, error} = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : "/"

    useEffect(() => {
        if (isAuthenticated)
          history.push(redirect);
    
        if (error) {
          alert.error(error);
          dispatch(clearError());
        }
    }, [dispatch, isAuthenticated, error, alert, history, redirect]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    
    
    return (
        <Fragment>
            { loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />
                    <div className="row wrapper"> 
                        <div className="col-10 col-lg-5">
                            <form onSubmit={handleSubmit} className="shadow-lg">
                            <h2 className="ui center aligned container mb-3">Login</h2>
                            <hr/>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                        
                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to='/password-forgot' className="float-right mb-3">Forgot Password?</Link>
                        
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block pb-2"
                                >
                                    LOGIN
                                </button>

                                <Link to='/register' className="float-right py-3 mb-2">Don't have an account? Register!</Link>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
