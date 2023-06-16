import React, { Fragment } from 'react';
import './Favorites.css';
import FavouriteItemCard from './FavouriteItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../../actions/favoriteAction';
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';

const Favorites = ({history}) => {

    const dispatch = useDispatch();
    const { favItems } = useSelector((state) => state.favorites);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addToFavorite(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) {
            return;
        }
        dispatch(addToFavorite(id, newQty));
    }

    const deleteFavItems = (id) => {
        dispatch(removeFromFavorite(id));
    }

    const checkOutHandler = () => {
        history.push("/login?redirect=shipping");
    }

    return (
        <Fragment>
            {favItems.length === 0 ? (
                <div className="emptyFav">
                    <ElectricBikeIcon />
                    <Typography>Products you like can be viewed here</Typography>
                    <Link to="/products">Let's like some!</Link>
                </div>
            ) : (
                <Fragment>
                    <div className='favPage'>
                        <div className='favHeader'>
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        {favItems && favItems.map((item) => (
                            <div className='favContainer' key={item.product}>
                                <FavouriteItemCard item={item} deleteFavItems={deleteFavItems} />
                                <div className="favInput">
                                    <button
                                        onClick={() =>
                                            decreaseQuantity(item.product, item.quantity)
                                        }
                                    >
                                        -
                                    </button>                            <input type='number' value={item.quantity} readOnly />
                                    <button
                                        onClick={() =>
                                            increaseQuantity(item.product, item.quantity, item.stock)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <p className='favSubtotal'>{`₹${item.price * item.quantity}`}</p>
                            </div>
                        ))}
                        <div className="favGrossTotal">
                            <div></div>
                            <div className="favGrossTotalBox">
                                <p>Gross Total</p>
                                <p>{`₹${favItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkOutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Favorites
