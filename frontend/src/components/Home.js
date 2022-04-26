import React, { Fragment, useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Pagination from 'react-js-pagination';
import { useAlert } from 'react-alert';

import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';


import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions/productActions';
import { getAllBrands } from '../redux/actions/brandActions';
import { getAllCategories } from '../redux/actions/categoryActions';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


const Home = ({ match }) => {

    const [ price, setPrice ] = useState([1, 1000]); 
    const [ category, setCategory ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { products, loading, error, productsCount, resPerPage, count } = useSelector(state => state.products);
    const { brands } = useSelector(state => state.allBrands);
    const { categories } = useSelector(state => state.allCategories);
    const keyword = match.params.keyword;
    
    
    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        
        dispatch(getAllProducts(keyword, category, brand, price, currentPage));
        dispatch(getAllBrands());
        dispatch(getAllCategories());
        
    }, [dispatch, alert, error, keyword, category, brand, price, currentPage]);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Home'} />

                    <section id="products" className="container mt-5">
                        <div className="row">
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className='px-5' >
                                            <h4 className="mb-5">
                                                Price Range
                                            </h4>
                                            <Range
                                                marks={{
                                                    1 : '$1',
                                                    1000 : '$1000'
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <div className='mt-5'>
                                                <h4 className="mb-3 pt-3" id='fonts'>
                                                    <hr/>
                                                    Categories
                                                </h4>

                                                <ul className="pl-0 card-title" id='fonts'>
                                                    {categories && categories.map(category => (
                                                        <li 
                                                            style={{cursor: 'pointer', listStyleType: 'none'}} 
                                                            key={category._id} 
                                                            onClick={() => setCategory(category.name)}
                                                            id='fonts'
                                                            className='mb-2'
                                                        >
                                                            {category.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <hr className='mt-3'/>
                                            <div>
                                                <h4 className="mb-3" id='fonts'>
                                                    Brands
                                                </h4>

                                                <ul className="pl-0 ">
                                                    {brands && brands.map(brand => (
                                                        <li 
                                                            style={{cursor: 'pointer', listStyleType: 'none'}} 
                                                            key={brand._id} 
                                                            onClick={() => setBrand(brand.name)}
                                                            id='fonts'
                                                            className='mb-2'
                                                        >
                                                            {brand.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        
                                            <hr className="my-3"/>        
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            { products && products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                    
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className='px-5' >
                                            
                                            <div>
                                                <h4 className="mb-3" id='fonts'>
                                                    Categories
                                                </h4>
                                                <ul className="pl-0 card-title">
                                                    {categories && categories.map(category => (
                                                        <li 
                                                            style={{cursor: 'pointer', listStyleType: 'none'}} 
                                                            key={category._id} 
                                                            onClick={() => setCategory(category.name)}
                                                            id='fonts'
                                                            className='mb-2'
                                                        >
                                                            {category.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <hr className='mt-3'/>
                                            <div className="mt-2">
                                                <h4 className="mb-3" id='fonts'>
                                                    Brands
                                                </h4>

                                                <ul className="pl-0 card-title">
                                                    {brands && brands.map(brand => (
                                                        <li 
                                                            style={{cursor: 'pointer', listStyleType: 'none'}} 
                                                            key={brand._id} 
                                                            onClick={() => setBrand(brand.name)}
                                                            id='fonts'
                                                            className='mb-2'
                                                        >
                                                            {brand.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        
                                            <hr className="my-3"/>

                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            { products && products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                    
                                </Fragment>
                                
                            )}
                            
                        </div>
                    </section> 

                    {   
                        resPerPage < productsCount && (
                            <div className="d-flex justify-content-center mt-5">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={
                                        productsCount
                                        // ((keyword || brand || category || price) && (count < resPerPage)) ? count : productsCount 
                                    }
                                    prevPageText='<'
                                    nextPageText='>'
                                    firstPageText='First'
                                    lastPageText='Last'
                                    itemClass='page-item'
                                    linkClass='page-link'
                                    onChange={handlePagination}
                                />
                            </div>
                        )
                    }
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home;
