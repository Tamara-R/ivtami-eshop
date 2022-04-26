import React, { Fragment, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import dateFormat from "dateformat";

import { getAllContacts, clearError, deleteContact } from '../../redux/actions/contactActions';
import { DELETE_CONTACT_RESET } from '../../constants/contactConstants';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

const ContactList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { contacts, error, loading } = useSelector(state => state.allContact);
	const { isDeleted } = useSelector(state => state.deleteContact);
	

    useEffect(() => {

		dispatch(getAllContacts());

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}

        if (isDeleted) {
			alert.success('Question deleted successfully');
			history.push('/contacts');
			dispatch({ type: DELETE_CONTACT_RESET });
		}
        

    }, [dispatch, alert, error, isDeleted, history]);
	
	const deleteContactHandler = id => {
		dispatch(deleteContact(id));
	};

    const setContacts = () => {
		const data = {
			columns: [
				{
					label: 'Question ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Sender Full Name',
					field: 'fullName',
					sort: 'asc',
				}, 
                {
                    label: 'Sender Email',
					field: 'email',
					sort: 'asc',
                },
				{
                    label: 'Date',
					field: 'date',
					sort: 'asc',
                },
                {
                    label: 'Status',
					field: 'status',
					sort: 'asc',
                },
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

		contacts && contacts.forEach(contact => {
			data.rows.push({
				id: contact._id,
                fullName: contact.fullName,
                email: contact.email,
				date: dateFormat(contact.createdAt, "dd.mm.yyyy, HH:MM"),
                status: contact.status,

				actions: (
					<Fragment>
						<Link
							to={`/contact/${contact._id}`}
							className='btn btn-primary py-1 px-1 mx-2'
						>
							<i className='fa fa-pencil'></i>
						</Link>
						<button
							className='btn btn-danger py-1 px-1'
							onClick={() => deleteContactHandler(contact._id)}
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
            <MetaData title={'Questions'} />
            <div className="row">
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>
					<div className='col-12 col-md-10'>
						<Fragment>
						<h2 className="text-center mb-3">All Messages</h2>
              			<hr className='mx-3' />
							{loading ? (
								<Loader />
							) : (
								<MDBDataTable
									data={setContacts()}
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

export default ContactList
