import React, {Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { myOrders, clearError } from '../../redux/actions/orderActions';

const OrdersList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, error, orders} = useSelector(state => state.myOrders);

    useEffect(() => {

        dispatch(myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [dispatch, alert, error]);

    const getData = () => {
        const data = {
        columns: [
            {
            label: 'Order ID',
            field: 'id',
            sort: 'asc'
            },
            {
            label: 'Num of Items',
            field: 'numOfItems',
            sort: 'asc'
            },
            {
            label: 'Amount',
            field: 'amount',
            sort: 'asc'
            },
            {
            label: 'Status',
            field: 'status',
            sort: 'asc'
            },
            {
            label: 'View Details',
            field: 'actions',
            sort: 'asc'
            }
        ],
        rows: []
        };
        orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') ?
                        <p style={{color: 'green'}}>{order.orderStatus}</p> : <p style={{color: 'red'}}>{order.orderStatus}</p>,
                actions: <Link to={`/order/${order._id}`} className='btn btn-primary ml-5'>
                            <i className='fa fa-eye'></i>
                        </Link>
            })
        })

        return data;
    }

    return (
        <Fragment>
        <MetaData title='My Orders' />
            {
                loading ? <Loader /> : (
                    <Fragment>
                        <h1 className='ml-3 mb-3'>My Orders</h1>
                        <MDBDataTable
                            data={getData()}
                            className='px-3'
                            bordered
                            striped
                            hover
                        />
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default OrdersList;