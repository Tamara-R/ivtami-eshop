import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import  { 
    productsReducer, productDetailsReducer, newReviewReducer, 
    newProductReducer, adminProductReducer, deleteProductReducer, 
    productReviewsReducer, reviewDeleteReducer 
} from './redux/reducers/productReducers';
import { 
    authReducer, userReducers, forgotPasswordReducers, allUsersReducer, 
    userDetailsReducer, newUserReducer, adminUserReducers 
} from './redux/reducers/authReducers';
import { 
    allBrandsReducers, newBrandReducers, brandChangeReducers, brandDetailsReducer
} from './redux/reducers/brandReducers';
import {
    allCategoriesReducers, newCategoryReducers, 
    categoryChangeReducers, categoryDetailsReducer
} from './redux/reducers/categoryReducers'
import { cartReducers } from './redux/reducers/cartReducers';
import { newOrderReducers, myOrdersReducer, orderDetailReducer, allOrdersReducer, orderReducers } from './redux/reducers/orderReducers';
import { 
    newContactReducers, 
    allContactReducers, contactDetailsReducer,
    updateContactReducers, deleteContactReducers } 
from './redux/reducers/contactReducer';

const reducer = combineReducers({
    
    allBrands: allBrandsReducers,
    newBrand: newBrandReducers,
    brandDetails: brandDetailsReducer,
    brandChange: brandChangeReducers,
    allCategories: allCategoriesReducers,
    newCategory: newCategoryReducers,
    categoryChange: categoryChangeReducers,
    categoryDetails: categoryDetailsReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducers,
    forgotPassword: forgotPasswordReducers,
    cart: cartReducers,
    newOrder: newOrderReducers,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    adminProduct: adminProductReducer,
    allOrders: allOrdersReducer,
    order: orderReducers,
    allUsers : allUsersReducer,
    userDetails: userDetailsReducer,
    newUser: newUserReducer,
    adminUser: adminUserReducers,
    deleteProduct: deleteProductReducer,
    productReviews: productReviewsReducer,
    reviewDelete: reviewDeleteReducer,
    newContact: newContactReducers,
    allContact: allContactReducers,
    contactDetails: contactDetailsReducer,
    updateContact: updateContactReducers,
    deleteContact: deleteContactReducers
    
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
};
  
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
  
export default store;