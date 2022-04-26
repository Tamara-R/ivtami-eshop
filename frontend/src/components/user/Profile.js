import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

const Profile = () => {

  const { user, loading } = useSelector(state => state.auth);
  return (
    <>
    {
      loading ? <Loader /> : (
        <Fragment>
          <MetaData title={`${user.name} Profile`} />
          <div className='ui segment'>
            <div className="ui grid">
              <div className="five wide column">
                  <div className="ui clearing segment">
                        <div className='ui container'>
                            
                            <img className="ui medium rounded image" src={user.avatar?.url} alt={user.username} />
                            
                            <Link to='/update-profile' id="edit_profile" className="btn btn-primary btn-block mb-2">
                                Edit Profile
                            </Link>
                            <Link className="btn btn-primary btn-block " to='/password-update'>
                                Change Password
                            </Link>
                            <Link to='/my-orders' className="btn btn-info btn-block">
                              My Orders
                            </Link>
                        </div>
                    </div>
                </div>
              <div className='six wide column'>
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
                          
                          
                          
                      </div>
                  </div>
                
              </div>
          
              
              
            </div>
          </div>
          
        </Fragment>
      )
    }
    </>
  )
}

export default Profile;