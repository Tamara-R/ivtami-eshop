import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import dateFormat from "dateformat";

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { updateConstactStatus, getContactDetails, clearError } from '../../redux/actions/contactActions';
import { UPDATE_CONTACT_RESET } from '../../constants/contactConstants';


export default function ContactDetail({ match }) {
	
	const [status, setStatus] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();
	const history = useHistory();

	const { loading, contact } = useSelector(state => state.contactDetails);
	
   
	const { error, isUpdated } = useSelector(state => state.updateContact);

	const contactId = match.params.id;

	useEffect(() => {

		dispatch(getContactDetails(contactId));

		if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		if (isUpdated) {
			alert.success('Responded successfully');
			dispatch({ type: UPDATE_CONTACT_RESET });
			history.push('/contacts');
		}
	}, [dispatch, alert, error, isUpdated, contactId, history]);
	
	const updateContactHandler = id => {
		const formData = new FormData();
		formData.set('status', status);

		dispatch(updateConstactStatus(id, formData));
	};

	return (
		<Fragment>
			<MetaData title={`Process Question`} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10'>
					<Fragment>
						{loading ? (
							<Loader />
						) : (
							<div className='row d-flex justify-content-around'>
								<div className='col-12 col-lg-7 order-details'>
									<h2 className='my-5'>Question ID # {contact._id}</h2>
									<hr/>
                                    <div className='row'>
                                        <div className="form-group col-md-6">
                                            <h4 className='my-4'>Full Name </h4>
                                            <p>{contact.fullName}</p>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <h4 className='my-4'>Email Address </h4>
                                            <p>{contact.email}</p>
                                        </div>
                                        
                                    </div>
									<hr />
                                    <div className='row'>
                                        <div className="form-group col-md-6">
                                            <h4 className='my-4'>Date </h4>
                                            <p>{dateFormat(contact.createdAt, "dddd, mmmm dS, yyyy, HH:MM")}</p>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <h4 className='my-4'>Response Status</h4>
                                            <p>{contact.status}</p>
                                        </div>  
                                    </div>
									<hr />
									
                                    <h4 className='my-4'>Question</h4>
									<p >
										{contact.question}
									</p>
									

									
								</div>

								<div className='col-12 col-lg-3 mt-5'>
									<h4 className='my-4'>Update Response Status</h4>

									<div className='form-group'>
										<select
											className='form-control'
											name='status'
											value={status}
											onChange={e => setStatus(e.target.value)}
										>   
                                            <option disabled selected>Select</option>
											<option value='Not Responded'>Not Responded</option>
											<option value='Responded'>Responded</option>
										</select>
									</div>

									<button
										className='btn btn-block update-btn'
										onClick={() => updateContactHandler(contact._id)}
									>
										Update Status
									</button>
								</div>
							</div>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
}