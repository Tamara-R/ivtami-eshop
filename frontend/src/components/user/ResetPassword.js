import React, {useState, useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import MetaData from './../layout/MetaData';
import {useHistory} from 'react-router-dom';
import {resetPassword, clearError} from '../../redux/actions/authActions';

const ResetPassword = ({match}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {error, success} = useSelector(state => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (success) {
      alert.success('Password has been changed!');
      history.push('/login');
    }
  }, [dispatch, error, success, alert, history]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);
    dispatch(resetPassword(match.params.token, formData));
  }

  return (
    <Fragment>
      <MetaData title='Reset Password' />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmit} className="shadow-lg">
            <h2 className="ui center aligned container mb-3">New Password</h2>
            <hr />
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

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-2">
              Set Password
            </button>

          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default ResetPassword;