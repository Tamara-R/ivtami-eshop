import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadUser, verifyUser } from '../../redux/actions/authActions';

const VerifyUser = ({match}) => {

    
    const dispatch = useDispatch();
    // const { user } = useSelector(state => state.auth);

    useEffect(() => {
       
        dispatch(loadUser());
        dispatch(verifyUser(match.params.token));
        
    }, [dispatch, match.params.token]);

    
    return (
        <Fragment>
            <div className='row wrapper'>
                <div className="col-10 col-lg-6" >
                    <div className='ui clearing segment'>
                        <div className='ui center aligned container'>
                            
                            <h2 className="ui center aligned container mb-3 mt-3"style={{ 'color' : '#CD902B' }}>Your account has been confirmed!</h2>
                                         
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default VerifyUser