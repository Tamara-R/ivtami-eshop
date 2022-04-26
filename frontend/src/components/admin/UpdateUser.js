import React, { Fragment, useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { updateUser, getUserDetails, clearError } from '../../redux/actions/authActions';
import { UPDATE_USER_RESET } from '../../constants/authConstants';

export default function UpdateUser({ history, match }) {
	
	const [name, setName] = useState('');
	const [ lastName, setLastName] = useState('');
	const [ email, setEmail] = useState('');
	const [ status, setStatus ] = useState('');
	const [role, setRole] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, isUpdated } = useSelector(state => state.adminUser);
	const { user } = useSelector(state => state.userDetails);

	const userId = match.params.id;
	
	useEffect(() => {

		// console.log(user && user._id !== userId);

		if (user && user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setLastName(user.lastName);
			setEmail(user.email);
			setRole(user.role);
			setStatus(user.status);
		}

		if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		if (isUpdated) {
			alert.success('User updated successfully');

			history.push('/admin/users');

			dispatch({type: UPDATE_USER_RESET});
		}
	}, [dispatch, alert, error, history, isUpdated, userId, user]);

	
    const updateHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('lastName', lastName);
		formData.set('email', email);
		formData.set('status', status);
        formData.set('role', role);
        dispatch(updateUser(match.params.id, formData));
      }
	return (
		<Fragment>
			<MetaData title={`Update User`} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>
				
				<div className='col-12 col-md-10'>
					<div className='row wrapper'>
						<div className='col-10 col-lg-5'>
							<form onSubmit={updateHandler} className='shadow-lg' autoComplete='off'>
							<h2 className="text-center mb-3">Update User</h2>
              				<hr />
								<div className='form-group'>
									<label htmlFor='name_field'>Name</label>
									<input
										type='text'
										id='name_field'
										className='form-control'
										name='name'
										value={name}
										onChange={e => setName(e.target.value)}
									/>
								</div>

								<div className='form-group'>
									<label htmlFor='lastName_field'>Last Name</label>
									<input
										type='text'
										id='lastName_field'
										className='form-control'
										name='email'
										value={lastName}
										onChange={e => setLastName(e.target.value)}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='email_field'>Email</label>
									<input
										type='email'
										id='email_field'
										className='form-control'
										name='email'
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='role_field'>Role</label>

									<select
										id='role_field'
										className='form-control'
										name='role'
										value={role}
										onChange={e => setRole(e.target.value)}
									>
										<option value='user'>user</option>
										<option value='admin'>admin</option>
									</select>
								</div>
								<div className="form-group">
									<label htmlFor='status_field'>Status</label>
									<select
										id='status_field'
										className="form-control"
										name='status'
										value={status}
 										onChange={e => setStatus(e.target.value)}
 									>
 										<option disabled={true}>Select status</option>
										 <option value='pending'>Pending</option>
 										<option value='active'>Active</option>
										<option value='deactivated'>Deactivated</option>
										
									</select>
								</div>

								<button
									type='submit'
									className='btn update-btn btn-block mt-4 mb-3'
								>
									Update
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
