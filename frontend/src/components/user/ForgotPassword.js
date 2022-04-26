import React, {useState, useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';

import {forgotPassword, clearError} from '../../redux/actions/authActions';
import {FORGOT_PASSWORD_CLEAR} from '../../constants/authConstants';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();
  const {loading, message, error} = useSelector(state => state.forgotPassword);

  useEffect(() => {

    if (error) {
        alert.error(error);
        dispatch(clearError());
    }

    if (message) {
        alert.success(message);
        dispatch({type: FORGOT_PASSWORD_CLEAR});
    }

  }, [dispatch, error, alert, message]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('email', email);
    dispatch(forgotPassword(formData));
  }
  
  return (
    <Fragment>
      <MetaData title={'Forgot Password'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmit} className="shadow-lg">
            <h2 className="ui center aligned container mb-3">Forgot Password</h2>
            <hr />
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-2"
              disabled={loading ? true : false}>
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default ForgotPassword;