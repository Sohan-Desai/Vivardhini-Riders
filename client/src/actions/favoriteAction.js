import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from '../constants/favoriteConstants';
import axios from 'axios';

// Add product to favorites
export const addToFavorite = (id, quantity) => async (dispatch, getState) => {

    //Change url to product later
    const { data } = await axios.get(`/api/v1/item/${id}`);

    dispatch({
        type: ADD_TO_FAVORITE,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    });

    localStorage.setItem("favItems", JSON.stringify(getState().favorites.favItems));

}

//Remove product from favorites
export const removeFromFavorite = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_FAVORITE,
        payload: id
    })

    localStorage.setItem("favItems", JSON.stringify(getState().favorites.favItems));

}