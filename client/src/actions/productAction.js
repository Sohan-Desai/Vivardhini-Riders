import axios from 'axios'
import {
    ALL_PRODUCT_REQUESTS,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUESTS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUESTS,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUESTS,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUESTS,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUESTS,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUESTS,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUESTS,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUESTS,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL
} from '../constants/productConstants'

// find products through queries
export const getProducts = (
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category,
    ratings = 0
) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUESTS });

        let link = `/api/v1/items?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
            link = `/api/v1/items?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
}

// get all products for admin -- NEED TO ADD
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUESTS });

        const { data } = await axios.get(`/api/v1/admin/items`);

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
}

// Create new product
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUESTS });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.post(`/api/v1/admin/item/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
}

// Update existing product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUESTS });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.put(`/api/v1/admin/item/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
}

// Detete product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUESTS });

        const { data } = await axios.delete(`/api/v1/admin/item/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUESTS });

        const { data } = await axios.get(`/api/v1/item/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.item
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
}

// Create new review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUESTS });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.put(`/api/v1/item/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        });
    }
}

// Get all reviews for a product
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUESTS });

        console.log("request sent to backend")
        const { data } = await axios.get(`/api/v1/item/reviews?id=${id}`);

        console.log("response recieved from backend")
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews
        });

    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message
        });
    }
}

// Delete any review for a product
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUESTS });

        const { data } = await axios.delete(`/api/v1/item/reviews?id=${reviewId}&productId=${productId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        });
    }
}

// Clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
}