import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import { updatePassword, clearError } from '../../redux/actions/authActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/authConstants';
import MetaData from '../layout/MetaData';

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
  
    const { loading, error, isUpdated } = useSelector(state => state.user);
  
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    
        if (isUpdated) {
            alert.success('Password has been updated!');
            
            history.push('/my-profile');
            dispatch({type: UPDATE_PASSWORD_RESET});
        }
    }, [dispatch, isUpdated, error, history, alert]);
  
    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('newPassword', newPassword);
        dispatch(updatePassword(formData));
    }
    
    return (
        <Fragment>
            <MetaData title={"Change Password"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h2 className="ui center aligned container mb-3">Update Password</h2>
                         <hr />
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
            
                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
            
                        <button type="submit" disabled={loading ? true : false} className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
  }
  
  export default UpdatePassword;