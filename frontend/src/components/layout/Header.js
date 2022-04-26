import React, { Fragment } from 'react';
import '../../App.css';
import Search from './Search';
import { Link, Route } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';


const Header = () => {

    const {user, loading} = useSelector(state => state.auth);
    const {cartItems} = useSelector(state => state.cart);
  
    const dispatch = useDispatch();
    const alert = useAlert();

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('You are logged out!');
    }

    return (
        <Fragment>
            
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand"> 
                        <Link to="/" className='ui left aligned container'>
                            <img 
                                className='ml-5 mt-2'
                                src="/images/ivtami-logo.png" 
                                alt="logo" 
                                style={{height:140}}
                            />
                        </Link>
                    </div>
                </div>
                
                <div className="col-12 col-md-5 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>
                
                <div className="col-14 col-md-3 mt-4 mt-md-0 text-center">
                        <Link to="/cart" style={{textDecoration: 'none'}}>
                            <span id="cart" className="ml-3 mt-1"><i className="fa fa-shopping-cart fa-1x"></i> </span>
                            <span className="ml-1" id="cart_count">{cartItems.length}</span>
                        </Link>
                    {user ? (
                        
                        <div className="dropdown d-inline">
                            <Link to='#!' className='btn dropdown-toggle mr-4' type='button' id='dropDownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                            <figure className='avatar avatar-nav mt-0'>
                                <img
                                    src={user.avatar && user.avatar.url}
                                    alt={user && user.name}
                                    className='rounded-circle'
                                />
                            </figure>
                            <span className="mr-2">{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby='dropDownMenuButton'>
                            {
                                user && user.role === 'admin' && (
                                    <Link className='dropdown-item' to='/dashboard'>Dashboard</Link>
                                ) 
                            }
                                <Link className='dropdown-item' to='/my-profile'>Profile</Link>
                                <Link className='dropdown-item' to='/my-orders'>Orders</Link>
                                <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler}>Logout</Link>
                            </div>
                        
                        </div>
                    ) : !loading && (
                        <>

                            <Link to="/login" className='ml-4' id="menu_btn">Login /</Link>
                            <Link to="/register"  className='ml-2' id="menu_btn">Register</Link>
                            
                        </>
                    )}
                    
                </div>
                
            </nav>
            <div className='text-center mt-0' id='contact_container'>
                <Link to="/contact"  id="menu_btn" className='text-center'>About Us / Contact</Link>
                <hr style={{'border':'1px solid #CD902B' }} />
            </div>
            
            
        </Fragment>
    )
}

export default Header;
