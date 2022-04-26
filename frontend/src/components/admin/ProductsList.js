import React, {useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import { useHistory } from 'react-router-dom';

import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { getAdminProducts, clearErrors, deleteProduct } from '../../redux/actions/productActions';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';


const ProductsList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const { products,loading, error } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteProduct);

    useEffect(() => {

        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
        }
        
        if (isDeleted) {
          
          alert.success('Product deleted successfully!');
          history.push('/admin/products');
          
          dispatch({type: DELETE_PRODUCT_RESET});
        }
        
    }, [dispatch, alert, error, deleteError, isDeleted, history ]);

    
    const deleteProductHandler = id => {
      dispatch(deleteProduct(id));
  
    };

    const getProduct = () => {

          const data = {
              columns: [
                  {
                  label: 'ID',
                  field: 'id',
                  sort: 'asc'
                  },
                  {
                  label: 'Name',
                  field: 'name',
                  sort: 'asc'
                  },
                  {
                  label: 'Price',
                  field: 'price',
                  sort: 'asc'
                  },
                  {
                  label: 'Stock',
                  field: 'stock',
                  sort: 'asc'
                  },
                  {
                  label: 'Actions',
                  field: 'actions'
                  }
              ],
              rows: []
      };
          products && products.forEach(product => {
              data.rows.push({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  stock: product.stock,
                  actions: (
                    <Fragment>
                      <Link to={`/product/${product._id}`} className='btn btn-info py-1 px-1 mr-1'>
                          <i className="fa fa-eye"></i>
                      </Link>
                      <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-1'>
                          <i className="fa fa-pencil"></i>
                      </Link>
                      <button
                        className='btn btn-danger py-1 px-1 ml-1'
                        onClick={() => deleteProductHandler(product._id)}
						          >
							          <i className='fa fa-trash'></i>
						          </button>
                    </Fragment>
                  ),
              });
          });
          
          return data;
      }

    
  
    return (

      <Fragment>

        <MetaData title='Products List' />
        <div className='row'>
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10">
            <>
              <h2 className="text-center mb-3">All Products</h2>
              <hr className='mx-3' />
              {
                loading ? <Loader /> : (
                  <MDBDataTable
                    data={getProduct()}
                    bordered
                    striped
                    className='px-3'
                    hover
                  />
                )
              }
            </>
          </div>
        </div>
      </Fragment>
    )
}

export default ProductsList;