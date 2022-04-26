import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { getBrandDetails, updateBrand, clearError } from '../../redux/actions/brandActions';
import { UPDATE_BRAND_RESET } from '../../constants/brandConstants';

const BrandDetail = ({ match }) => {
	
	const alert = useAlert();
	const dispatch = useDispatch();
	const history = useHistory();

    const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const { loading, brand, error } = useSelector(state => state.brandDetails);
    const { error: updateError, isUpdated } = useSelector(state => state.brandChange);
	
   
	const brandId = match.params.id;

	useEffect(() => {

        if (brand && brand._id !== brandId) {
			dispatch(getBrandDetails(brandId));
		} else {
			setName(brand.name);
			setDescription(brand.description);
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
			history.push('/brands');
			alert.success('Brand updated successfully');
			dispatch({ type: UPDATE_BRAND_RESET });
		}

		
	}, [dispatch, alert, error, brandId, history, isUpdated, updateError, brand]);
	
	const submitHandler = e => {
		e.preventDefault();

		dispatch(updateBrand(brand._id, {name, description}));
	};

	return (
		<Fragment>
			<MetaData title={`Update Brand`} />
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
                                            <h2 className="text-center mb-3">Update Brand</h2>
                                            <hr/>
                                            <div className='form-group'>
                                                <label htmlFor='name_field'>Brand Name</label>
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


export default BrandDetail