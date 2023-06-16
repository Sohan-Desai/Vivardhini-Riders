import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productsReducer,
    productReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    reviewReducer,
    productReviewsReducer
} from './reducers/productReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { favoriteReducer } from './reducers/favoriteReducer';

const reducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    favorites: favoriteReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer
});

let initialState = {
    favorites: {
        favItems: localStorage.getItem("favItems")
            ? JSON.parse(localStorage.getItem("favItems"))
            : []
    }
};

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store