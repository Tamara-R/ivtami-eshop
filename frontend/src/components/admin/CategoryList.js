import React, { Fragment, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import dateFormat from "dateformat";

import { getAllCategories, deleteCategory, clearError } from '../../redux/actions/categoryActions';
import { DELETE_CATEGORY_RESET } from '../../constants/categoryConstants';


import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

const CategoryList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { categories, error, loading } = useSelector(state => state.allCategories);
	const { isDeleted } = useSelector(state => state.categoryChange);
	

    useEffect(() => {

		dispatch(getAllCategories());

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}

        if (isDeleted) {
			alert.success('Brand deleted successfully');
			history.push('/categories');
			dispatch({ type: DELETE_CATEGORY_RESET });
		}
        

    }, [dispatch, alert, error, isDeleted, history]);
	
	const deleteCategoryHandler = id => {
		dispatch(deleteCategory(id));
	};

    const setCategories = () => {
		const data = {
			columns: [
				{
					label: 'Category ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Category Name',
					field: 'name',
					sort: 'asc',
				}, 
                {
                    label: 'Category Description',
					field: 'description',
					sort: 'asc',
                },
				{
                    label: 'Created At',
					field: 'createdAt',
					sort: 'asc',
                },
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

		categories && categories.forEach(category => {
			data.rows.push({
				id: category._id,
                name: category.name,
                description: category.description,
				createdAt: dateFormat(category.createdAt, "dd.mm.yyyy, HH:MM"),
               
				actions: (
					<Fragment>
						<Link
							to={`/category/${category._id}`}
							className='btn btn-primary py-1 px-1 mx-2'
						>
							<i className='fa fa-pencil'></i>
						</Link>
						<button
							className='btn btn-danger py-1 px-1'
							onClick={() => deleteCategoryHandler(category._id)}
						>
							<i className='fa fa-trash'></i>
						</button>
					</Fragment>
				),
			});
		});

		return data;
	};

    return (
        
        <Fragment>
            <MetaData title={'Categories'} />
            <div className="row">
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>
					<div className='col-12 col-md-10'>
						<Fragment>
						<h2 className="text-center mb-3">All Categories</h2>
              			<hr className='mx-3' />
							{loading ? (
								<Loader />
							) : (
								<MDBDataTable
									data={setCategories()}
									className='px-2 ml-1'
									bordered
									striped
									hover
								/>
							)}
						</Fragment>
					</div>
						
            </div>
                                    
        </Fragment>
    )
}

export default CategoryList