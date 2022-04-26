import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    return(
        
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>
                    <li>
                        <a href="#brandSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <i className="fa fa-diamond"></i> Brands
                        </a>
                        <ul className="collapse list-unstyled" id="brandSubmenu">
                            <li>
                                <Link to="/brands"><i className="fa fa-diamond"></i> All</Link>
                            </li>

                            <li>
                                <Link to='/create-brand'><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#categorySubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <i className="fa fa-object-group"></i> Categories
                        </a>
                        <ul className="collapse list-unstyled" id="categorySubmenu">
                            <li>
                                <Link to="/categories"><i className="fa fa-object-group"></i> All</Link>
                            </li>

                            <li>
                                <Link to='/create-category'><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <i className="fa fa-product-hunt"></i> Products
                        </a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="fa fa-product-hunt"></i> All</Link>
                            </li>

                            <li>
                                <Link to='/admin/product'><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to='/admin/orders'><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>
                    <li>
                        <a href="#userSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <i className="fa fa-users"></i> Users
                        </a>
                        <ul className="collapse list-unstyled" id="userSubmenu">
                            <li>
                            <Link to='/admin/users'><i className="fa fa-users"></i>All</Link>
                            </li>

                            <li>
                                <Link to='/admin/create-user'><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li> 
                    <li>
                        <Link to='/admin/reviews'><i className="fa fa-star"></i> Reviews</Link>
                    </li>
                    <li>
                        <Link to='/contacts'><i className="fa fa-question-circle"></i> Questions</Link>
                    </li>

                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;