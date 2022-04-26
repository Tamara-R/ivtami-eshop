import React, { useState, useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { clearErrors, createProduct } from '../../redux/actions/productActions';
import { getAllBrands } from '../../redux/actions/brandActions';
import { getAllCategories } from '../../redux/actions/categoryActions';


const NewProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { loading, error, success } = useSelector(state => state.newProduct);
    const { brands } = useSelector(state => state.allBrands);
    const { categories } = useSelector(state => state.allCategories);

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ stock, setStock ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ images, setImages ] = useState([]);
    const [ imagesPreview, setImagesPreview ] = useState([]);

    
    useEffect(() => {

        dispatch(getAllBrands());
        dispatch(getAllCategories());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {

            history.push('/admin/products');
            alert.success('Product has been created!');

            dispatch({type: NEW_PRODUCT_RESET});
        }
    }, [dispatch, history, alert, error, success]);

    const onChange = e => {
        const files = Array.from(e.target.files);
        setImagesPreview([]);
        setImages([]);

        files.forEach(file => {

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                setImagesPreview(oldArray => [...oldArray, reader.result]);
                setImages(oldArray => [...oldArray, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    }

    const handleSubmit = e => {

        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('brand', brand);
        images.forEach(image => {
            formData.append('images', image)
        });

        dispatch(createProduct(formData));
    }

    return (
        <Fragment>
            <MetaData title='Create Product' />
                <div className='row'>
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-lg-8">
                    <Fragment>
                        <div className="wrapper my-5"> 
                            <form onSubmit={handleSubmit} className="col-10 col-md-6 shadow-lg px-5" encType='multipart/form-data' autoComplete='off'>
                                <h2 className="text-center mb-3">Create Product</h2>
                                <hr />
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="6" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select 
                                        className="form-control" 
                                        id="category_field" 
                                        value={category} 
                                        onChange={e => setCategory(e.target.value)}
                                    >
                                        {
                                            categories.map(category => (
                                                <option key={category._id} value={category.name}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={e => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="brand_field">Brand Name</label>
                                    <select 
                                        className="form-control" 
                                        id="brand_field" 
                                        value={brand} 
                                        onChange={e => setBrand(e.target.value)}
                                    >
                                        {
                                            brands.map(brand => (
                                                <option key={brand._id} value={brand.name}>{brand.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                
                                <div className='form-group'>
                                    <label>Images</label>
                                
                                    <div className='custom-file'>
                                        <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onChange}
                                        />
                                        <label className='custom-file-label' for='customFile'>
                                        Choose Images
                                        </label>
                                    </div>

                                    {
                                        imagesPreview.map(img => (
                                        <img src={img} key={img} alt='Preview' className='mt-3 mr-2' width='55' height='52' />
                                        ))
                                    }
                                </div>
                    
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-2"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct;