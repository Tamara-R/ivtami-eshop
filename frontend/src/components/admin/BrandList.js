import React, { Fragment, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import dateFormat from "dateformat";

import { getAllBrands, deleteBrand, clearError } from '../../redux/actions/brandActions';
import { DELETE_BRAND_RESET } from '../../constants/brandConstants';


import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

const BrandList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { brands, error, loading } = useSelector(state => state.allBrands);
	const { isDeleted } = useSelector(state => state.brandChange);
	

    useEffect(() => {

		dispatch(getAllBrands());

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}

        if (isDeleted) {
			alert.success('Brand deleted successfully');
			history.push('/brands');
			dispatch({ type: DELETE_BRAND_RESET });
		}
        

    }, [dispatch, alert, error, isDeleted, history]);
	
	const deleteBrandHandler = id => {
		dispatch(deleteBrand(id));
	};

    const setBrands = () => {
		const data = {
			columns: [
				{
					label: 'Brand ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Brand Name',
					field: 'name',
					sort: 'asc',
				}, 
                {
                    label: 'Brand Description',
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

		brands && brands.forEach(brand => {
			data.rows.push({
				id: brand._id,
                name: brand.name,
                description: brand.description,
				createdAt: dateFormat(brand.createdAt, "dd.mm.yyyy, HH:MM"),
               
				actions: (
					<Fragment>
						<Link
							to={`/brand/${brand._id}`}
							className='btn btn-primary py-1 px-1 mr-1'
						>
							<i className='fa fa-pencil'></i>
						</Link>
						<button
							className='btn btn-danger py-1 px-1'
							onClick={() => deleteBrandHandler(brand._id)}
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
            <MetaData title={'Brands'} />
            <div className="row">
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>
					<div className='col-12 col-md-10'>
						<Fragment>
						<h2 className="text-center mb-3">All Brands</h2>
              			<hr className='mx-3' />
							{loading ? (
								<Loader />
							) : (
								<MDBDataTable
									data={setBrands()}
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

export default BrandList