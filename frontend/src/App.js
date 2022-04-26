import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import InfoContactPage from './components/layout/InfoContactPage';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import VerifyUser from './components/user/VerifyUser';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import OrdersList from './components/order/OrdersList';
import OrderDetail from './components/order/OrderDetail';
import BrandList from './components/admin/BrandList';
import BrandDetail from './components/admin/BrandDetail';
import NewBrand from './components/admin/CreateBrand';
import CategoryList from './components/admin/CategoryList';
import NewCategory from './components/admin/NewCategory';
import CategoryDetail from './components/admin/CategoryDetail';

import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import CreateUser from './components/admin/CreateUser';
import UserDetails from './components/admin/UserDetails';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import ContactList from './components/admin/ContactList';
import ContactDetail from './components/admin/ContactDetail';

import { loadUser } from './redux/actions/authActions';
// import store from './store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {useDispatch} from 'react-redux'


function App() {

  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    dispatch(loadUser());
    async function getStripeApiKey() {
      const {data} = await axios.get('/api/v1/stripeapikey');
      setStripeApiKey(data.stripeApiKey);
      // console.log(data.stripeApiKey)
    }
    getStripeApiKey();
  }, [dispatch]);

  
  return (
    
    <Router>
      <div className="App">
        
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact/>
          <Route path="/contact" component={InfoContactPage} exact/>
          <Route path="/product/:id" component={ProductDetails} exact/>
          <Route path="/search/:keyword" component={Home} />
          
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/confirm/:token" component={VerifyUser} exact/>
          <Route path="/password-forgot" component={ForgotPassword} exact />
          <Route exact path='/password/reset/:token' component={ResetPassword} />

          <ProtectedRoute path="/my-profile" component={Profile} exact />
          <ProtectedRoute path="/update-profile" component={UpdateProfile} exact />
          <ProtectedRoute path="/password-update" component={UpdatePassword} exact />
          
          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute path="/confirm-order" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} exact />
          <ProtectedRoute path="/my-orders" component={OrdersList} exact />
          <ProtectedRoute exact path='/order/:id' component={OrderDetail} />
          {
            stripeApiKey && 
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute exact path='/payment' component={Payment} />
            </Elements>
          } 

        </div>

        <ProtectedRoute exact path='/dashboard' isAdmin={true} component={Dashboard} />
        <ProtectedRoute exact path='/admin/products' isAdmin={true} component={ProductsList} />
        <ProtectedRoute exact path='/admin/product' isAdmin={true} component={NewProduct} />
        <ProtectedRoute path='/admin/product/:id' isAdmin={true} component={UpdateProduct} exact />
        <ProtectedRoute path='/admin/orders' isAdmin={true} component={OrderList} exact />
        <ProtectedRoute path='/admin/order/:id' isAdmin={true} component={ProcessOrder} exact />

        <ProtectedRoute path='/brands' isAdmin={true} component={BrandList} exact />
        <ProtectedRoute path='/create-brand' isAdmin={true} component={NewBrand} exact />
        <ProtectedRoute path='/brand/:id' isAdmin={true} component={BrandDetail} exact />

        <ProtectedRoute path='/categories' isAdmin={true} component={CategoryList} exact />
        <ProtectedRoute path='/create-category' isAdmin={true} component={NewCategory} exact />
        <ProtectedRoute path='/category/:id' isAdmin={true} component={CategoryDetail} exact />

        <ProtectedRoute path='/brand/:id' isAdmin={true} component={BrandDetail} exact />
        <ProtectedRoute path='/admin/users' isAdmin={true} component={UsersList} exact />
        <ProtectedRoute path='/admin/create-user' isAdmin={true} component={CreateUser} exact />
        <ProtectedRoute path='/user/:id' isAdmin={true} component={UserDetails} exact />
        <ProtectedRoute path='/admin/user/:id' isAdmin={true} component={UpdateUser} exact />
        <ProtectedRoute path='/admin/reviews' isAdmin={true} component={ProductReviews} exact />
        <ProtectedRoute path='/contacts' isAdmin={true} component={ContactList} exact />
        <ProtectedRoute path='/contact/:id' isAdmin={true} component={ContactDetail} exact />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
