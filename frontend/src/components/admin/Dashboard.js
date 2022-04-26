import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { getAdminProducts } from '../../redux/actions/productActions';
import { allOrders } from '../../redux/actions/orderActions';
import { allUsers } from '../../redux/actions/authActions';
import { getAllBrands } from '../../redux/actions/brandActions';
import { getAllContacts } from '../../redux/actions/contactActions';
import { getAllCategories } from '../../redux/actions/categoryActions';


const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector(state => state.products);
  const { orders, totalAmount } = useSelector(state => state.allOrders);
  const { brands } = useSelector(state => state.allBrands);
  const { categories } = useSelector(state => state.allCategories);
  const { contacts } = useSelector(state => state.allContact);
  const {users} = useSelector(state => state.allUsers);

  let outOfStock = 0;
  products.forEach(product => {
    if (product.stock === 0) {
      outOfStock++;
    }
  })

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    dispatch(getAllContacts());

  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title='Dashboard' />
      <div className="row">
        <div className='col-12 col-md-3'>
          <Sidebar />
        </div>

        <div className="col-12 col-md-9">
          <h2 className='mt-1' id='menu_btn'>Dashboard</h2>  
          <Fragment>
            <div className="row pr-4 pt-4">
              <div className="col-xl-12 col-sm-12 mb-3">
                <div className="card text-white bg-primary o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pr-4">
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-info o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                  </div>
                  <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-info o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">Categories<br /> <b>{categories && categories.length}</b></div>
                  </div>
                  <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-info o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">Brands<br /> <b>{brands && brands.length}</b></div>
                  </div>
                  <Link className="card-footer text-white clearfix small z-1" to="/brands">
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-info o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                  </div>
                  <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
              
            </div>
            <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-info o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                  </div>
                  <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-info o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">Questions<br /> <b>{contacts && contacts.length}</b></div>
                  </div>
                  <Link className="card-footer text-white clearfix small z-1" to="/contacts">
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-warning o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
            
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard;