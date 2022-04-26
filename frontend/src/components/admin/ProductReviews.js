import React, { Fragment, useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import { getAdminProducts, getProductDetails, getProductReviews, deleteReview, clearErrors } from '../../redux/actions/productActions';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

export default function ProductReviews() {
	
	const [productId, setProductId] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { products, loading: productLoading } = useSelector(state => state.products);
	const { product } = useSelector(state => state.productDetails);
	const { loading, reviews } = useSelector(state => state.productReviews);
	const { isDeleted, error: deleteError } = useSelector(state => state.reviewDelete);
	
	
	useEffect(() => {

		dispatch(getProductDetails(product._id));
		dispatch(getAdminProducts());
        
		
		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (productId !== '') {
			dispatch(getProductReviews(productId));
		}

		if (isDeleted) {
			alert.success('Review deleted successfully');
			dispatch({ type: DELETE_REVIEW_RESET });
		}
	}, [dispatch, alert, productId, isDeleted, deleteError, product._id]);

	const deleteReviewHandler = id => {
		dispatch(deleteReview(id, productId));
	};

	const submitHandler = e => {
		e.preventDefault();
		dispatch(getProductReviews(productId));
	};

	const setReviews = () => {
		const data = {
			columns: [
				{
					label: 'Review ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Rating',
					field: 'rating',
					sort: 'asc',
				},
				{
					label: 'Comment',
					field: 'comment',
					sort: 'asc',
				},
				{
					label: 'User',
					field: 'user',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

		reviews && reviews.forEach(review => {
			data.rows.push({
				id: review._id,
				rating: review.rating,
				comment: review.comment,
				user: review.name,
				actions: (
					<button
						className='btn btn-danger py-1 px-2 ml-2'
						onClick={() => deleteReviewHandler(review._id)}
					>
						<i className='fa fa-trash'></i>
					</button>
				),
			});
		});

		return data;
	};

	return (
		<Fragment>
			<MetaData title={'Product Reviews'} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10'>
					<Fragment>
						{productLoading ? (
							<Loader />
						) : (
							<Fragment>
								<div className='row justify-content-center mt-5'>
									<div className='col-5'>
										<h5>Select a Product</h5>
										<form onChange={submitHandler}>
											<select
												name='assigmentId'
												value={productId}
												onChange={e => setProductId(e.target.value)}
											>
												{products && products.map(product => (
													<option key={product._id} value={product._id}>{product.name}</option>
												
												))}
											</select>
										</form>
						
									</div>
								</div>
							</Fragment>
						)}
						
						{ loading ? (
							<Loader />
						) :
						(reviews && reviews.length > 0 ? (

							<MDBDataTable
								data={setReviews()}
								className='px-3'
								bordered
								striped
								hover
							/>
						) : (
							<div className='row justify-content-center mt-5'>
								<p >No Reviews.</p>
							</div>
						))}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
}