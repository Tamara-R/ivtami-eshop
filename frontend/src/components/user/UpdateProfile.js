import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import { updateProfile, loadUser, clearError } from '../../redux/actions/authActions';
import { UPDATE_PROFILE_RESET } from './../../constants/authConstants';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {

    const [name, setName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ email, setEmail] = useState('');
    const [ adress, setAdress] = useState('');
    const [ city, setCity ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ postalCode, setPostalCode ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ dateOfBirth, setDateOfBirth ] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated } = useSelector(state => state.user);

    useEffect(() => {

        if (user) {
            setName(user.name);
            setLastName(user.lastName)
            setEmail(user.email);
            setAdress(user.adress);
            setCity(user.city);
            setCountry(user.country);
            setPostalCode(user.postalCode);
            setPhone(user.phone);
            setDateOfBirth(user.dateOfBirth);
            setAvatarPreview(user.avatar?.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success('Profile has been udpated!');
            dispatch(loadUser());
            history.push('/my-profile');
            dispatch({type: UPDATE_PROFILE_RESET});
        }
    }, [dispatch, error, isUpdated, history, alert, user]);

    const onChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
        if (reader.readyState === 2) {
            setAvatar(reader.result);
            setAvatarPreview(reader.result);
        }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const onSubmit = e => {
        e.preventDefault();
        
        dispatch(updateProfile({ name, lastName, email, 
            adress, city, country, postalCode, phone, 
            dateOfBirth, avatar
        }));
    }

    return (
        <Fragment>
            <MetaData title={`Update User`} />
			<div className='ui clearing segment'>
				<form onSubmit={onSubmit} className='ui form'>
					<h4 className="ui dividing header">Update Profile</h4>
                    <div className="two fields">
						<div className="field">
							<label>First Name</label>
							<input 
								type="text"
								name="name" 
								placeholder="First name" 
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className="field">
							<label>Last Name</label>
							<input 
								type="text" 
								name="lastName" 
								placeholder="Last Name"
								value={lastName}
								onChange={e => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className="two fields">
						<div className="field">
							<label>E-mail address</label>
							<input 
								type="email"
								name="email" 
								placeholder="E-mail adress" 
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="field">
							<label>Address</label>
							<input 
								type="text" 
								name="adress" 
								placeholder="Adress"
								value={adress}
								onChange={e => setAdress(e.target.value)}
							/>
						</div>
					</div>
                    <div className="three fields">				
						<div className="field">
							<label>City</label>
							<input 
								type="text" 
								name="city" 
								placeholder="City"
								value={city}
								onChange={e => setCity(e.target.value)}
							/>
						</div>
                        <div className="field">
							<label>Postal Code</label>
							<input 
								type="text" 
								name="postalCode" 
								placeholder="Postal Code"
								value={postalCode}
								onChange={e => setPostalCode(e.target.value)}
							/>
						</div>
                        <div className="field">
							<label>Country</label>
							<input 
								type="text"
								name="country" 
								placeholder="Date of Birth" 
								value={country}
								onChange={e => setCountry(e.target.value)}
							/>
						</div>
					</div>
					<div className="two fields">				
						<div className="field">
							<label>Phone Number</label>
							<input 
								type="text" 
								name="phoneNo" 
								placeholder="Phone Number"
								value={phone}
								onChange={e => setPhone(e.target.value)}
							/>
						</div>
                        <div className="field">
							<label>Date of Birth</label>
							<input 
								type="text"
								name="dateOfBirth" 
								placeholder="Date of Birth" 
								value={dateOfBirth}
								onChange={e => setDateOfBirth(e.target.value)}
							/>
						</div>
					</div>
                    
                        <div className='field'>
                            <label htmlFor='avatar_upload'>Profile Picture</label>
                            <div className='d-flex align-items-center mb-3'>
                                <div>
                                    <figure className='avatar mb-3 ml-3'>
                                    <img
                                        src={avatarPreview}
                                        className='rounded-circle'
                                        alt='Avatar Preview'
                                    />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Picture
                                    </label>
                                </div>
                            </div>
                        
                    </div>
					<div className="ui right aligned container">
                        
                    </div>
                    <button className="btn btn-block py-2" id='update-btn' type="submit">Update Profile</button>
					
				</form>
			</div>
        </Fragment>
        
    )
}

export default UpdateProfile;