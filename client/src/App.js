import React from 'react';
import './App.css';
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home"
import ProductDetails from "./components/Product/ProductDetails"
import Products from "./components/Product/Products"
import Search from "./components/Product/Search"
import Profile from "./components/User/Profile.js"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebFont from 'webfontloader';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions'
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Favorites from './components/Favorites/Favorites';
import Dashboard from './components/admin/Dashboard.js';
import ProductList from './components/admin/ProductList';
import CreateProduct from './components/admin/CreateProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import NotFound from './components/layout/NotFound/NotFound';

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Switch>
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />

        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/favorites" component={Favorites} />

        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/product" component={CreateProduct} />
        <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
        <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />

        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route path="*" component={NotFound} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
