import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { getUserDetails, clearError } from '../../redux/actions/authActions';


const UserDetails = ({ history, match }) => {
	
	
	const dispatch = useDispatch();

	const { user, error } = useSelector(state => state.userDetails);

	const userId = match.params.id;
	
	useEffect(() => {

		
		dispatch(getUserDetails(userId));
		

		if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		
	}, [dispatch, alert, error, userId, user]);

	
	

	return (
		<Fragment>
			<MetaData title={`${user.name}`} />
            <div className='row'>
            <div className='col-12 col-md-2'>
					<Sidebar />
				</div>
            
			<div className='col-12 col-md-10'>
                <h2 className="text-center mb-3">User Profile</h2>
                <div className="ui grid">  
                    <div className="five wide column">
                        <div className="ui clearing segment">
                                <div className='ui container'>
                                    <img 
                                        className="ui medium rounded image" 
                                        src={user.avatar?.url} 
                                        alt={user.username} 
                                    />     
                                </div>
                            </div>
                        </div>
                    <div className='five wide column'>
                    <div className="ui clearing segment">
                            <div className='ui container'>
                                <h3>Basic informations</h3>
                                <h4>Full Name</h4>
                                <p>{user.name} {user.lastName}</p>
                                <hr />
                                <h4>Email Address</h4>
                                <p>{user.email}</p>
                                <hr />
                                <h4>Phone No.</h4>
                                <p>{user.phone}</p>
                                <hr />
                                <h4>Date of Birth</h4>
                                <p>{user.dateOfBirth}</p>
                                <hr />
                                <h4>Role</h4>
                                <p>{user.role}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="five wide column">
                        <div className="ui clearing segment">
                            <div className='ui container'>
                                <h3>Other informations</h3>
                                <h4>Address</h4>
                                <p>{user.adress}</p>
                                <hr />
                                <h4>City</h4>
                                <p>{user.city}</p>
                                <hr />
                                <h4>Postal Code</h4>
                                <p>{user.postalCode}</p>
                                <hr />
                                <h4>Country</h4>
                                <p>{user.country}</p>
                                <hr />
                                <h4>Status</h4>
                                <p>{user.status}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
            </div>
		</Fragment>
	);
}

export default UserDetails;