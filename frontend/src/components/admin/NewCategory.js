import React, { useState, useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';

import { createCategory, clearError } from '../../redux/actions/categoryActions';
import { CREATE_CATEGORY_RESET } from '../../constants/categoryConstants'; 

const NewCategory = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { loading, error, success } = useSelector(state => state.newCategory);

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {

            history.push('/categories');
            alert.success('Category has been created!');

            dispatch({type: CREATE_CATEGORY_RESET});
        }
    }, [dispatch, history, alert, error, success]);


    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);
        
        dispatch(createCategory(formData));
    }

    return (
        <Fragment>
            <MetaData title='Create Category' />
                <div className='row'>
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-lg-8">
                    <Fragment>
                        <div className="wrapper my-5"> 
                            <form onSubmit={handleSubmit} className="col-10 col-md-6 shadow-lg px-5" encType='multipart/form-data' autoComplete='off'>
                                <h2 className="text-center mb-3">Create Category</h2>
                                <hr />
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="description_field" rows="6" 
                                        value={description} 
                                        onChange={e => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-2"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default NewCategory;