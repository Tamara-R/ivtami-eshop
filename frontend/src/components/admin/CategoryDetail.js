import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { getCategoryDetails, updateCategory, clearError } from '../../redux/actions/categoryActions';
import { UPDATE_CATEGORY_RESET } from '../../constants/categoryConstants';

const CategoryDetail = ({ match }) => {
	
	const alert = useAlert();
	const dispatch = useDispatch();
	const history = useHistory();

    const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const { loading, category, error } = useSelector(state => state.categoryDetails);
    const { error: updateError, isUpdated } = useSelector(state => state.categoryChange);
	
   
	const categoryId = match.params.id;

	useEffect(() => {

        if (category && category._id !== categoryId) {
			dispatch(getCategoryDetails(categoryId));
		} else {
			setName(category.name);
			setDescription(category.description);
		}

		if (error) {
			alert.error(error);
			dispatch(clearError());
		}

        if (updateError) {
			alert.error(updateError);
			dispatch(clearError());
		}

		if (isUpdated) {
			history.push('/categories');
			alert.success('Category updated successfully');
			dispatch({ type: UPDATE_CATEGORY_RESET });
		}

		
	}, [dispatch, alert, error, categoryId, history, isUpdated, updateError, category]);
	
	const submitHandler = e => {
		e.preventDefault();

		dispatch(updateCategory(category._id, {name, description}));
	};

	return (
		<Fragment>
			<MetaData title={`Update Category`} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10'>
					<Fragment>
						{loading ? (
							<Loader />
						) : (
							<Fragment>
                                <div className='col-12 col-md-10'>
                                    <div className='wrapper my-5'>
                                        <form
                                            className='col-10 col-md-6 shadow-lg px-5'
                                            onSubmit={submitHandler}
                                            encType='multipart/form-data'
                                        >
                                            <h2 className="text-center mb-3">Update Category</h2>
                                            <hr/>
                                            <div className='form-group'>
                                                <label htmlFor='name_field'>Category Name</label>
                                                <input
                                                    type='text'
                                                    id='name_field'
                                                    className='form-control'
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                />
                                            </div>

                                            
                                            <div className='form-group'>
                                                <label htmlFor='description_field'>
                                                    Description
                                                </label>
                                                <textarea
                                                    className='form-control'
                                                    id='description_field'
                                                    rows='8'
                                                    value={description}
                                                    onChange={e => setDescription(e.target.value)}
                                                ></textarea>
                                            </div>

                                            <button
                                                id='login_button'
                                                type='submit'
                                                className='btn btn-block py-2'
                                                disabled={loading ? true : false}
                                            >
                                                UPDATE
                                            </button>
                                        </form>
                                    </div>
                                    
                                </div>
                            </Fragment>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
}


export default CategoryDetail