import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import MetaData from './MetaData';
import { createContact, clearError } from '../../redux/actions/contactActions';
import { CREATE_CONTACT_RESET } from '../../constants/contactConstants';

const InfoContactPage = () => {

    const [ fullName, setFullName] = useState('');
    const [ email, setEmail] = useState('');
    const [ question, setQuestion] = useState('');
    const [ emptyError, setEmptyError ] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { error, success } = useSelector(state => state.newContact);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {
            history.push('/');
            alert.success('Question has been sent!');
            dispatch({type: CREATE_CONTACT_RESET});
        }
    }, [dispatch, history, alert, error, success]);

    
    const handleSubmit = e => {
        e.preventDefault();
       
        if( fullName.trim() === '' || email.trim() === '' || question.trim() === '') {
            setEmptyError('Required field!');
            
        }
        
        dispatch(createContact({fullName, email, question}));
    }


    return (
        <Fragment>
            <MetaData title='About Us - Contact' />
            <div className="row wrapper">
                <div className="col-14 col-lg-8">
                    <div className="shadow-lg">
                        <div className='row'>
                            <div className='col-md-6'>
                                <h4 className="ui center aligned container mt-4">About Us</h4>
                                <hr className='mr-5 ml-5 mb-0' />
                                <div className='mr-5 ml-5 mt-5' style={{'text-align': 'justify', 'color': 'gray'}}>
                                    Wondering whether our watches are genuine, 
                                    considering how good the prices are? No need to worry. 
                                </div>
                                <div className='mr-5 ml-5 mt-2' style={{'text-align': 'justify', 'color': 'gray'}}>
                                    We are official stockists for all of our brands. 
                                    Your watch will ship out of our very own warehouse, 
                                    and before then, it will sit with the official manufacturer. 
                                    No middle man here! 
                                </div>
                                <div className='mr-5 ml-5 mt-2' style={{'text-align': 'justify', 'color': 'gray'}}>    
                                    This also means every watch you purchase 
                                    with us will come in the original brand packaging and with a valid guarantee. 
                                    Plus any extras, such as instructions and technical information, 
                                    will be present and correct.
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <h4 className="ui center aligned container mt-4">Contact Us</h4>
                                <hr className='mr-5 ml-5 mb-0' />
                                <form className='mt-1' onSubmit={handleSubmit} autoComplete='off'>
                                    <div className="form-group">
                                        <input type="text" id="name_field" className="form-control"
                                            placeholder='Enter your email'
                                            value={email} onChange={e => setEmail(e.target.value)}
                                        />
                                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" id="name_field" className="form-control"
                                            placeholder='Enter your name'
                                            value={fullName} onChange={e => setFullName(e.target.value)}
                                        />
                                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            type="text" className="form-control" 
                                            id="description_field" rows="6"
                                            placeholder='Enter your question'
                                            value={question}
                                            onChange={e => setQuestion(e.target.value)}
                                        ></textarea>
                                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-block py-2"
                                    >
                                        SEND
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default InfoContactPage