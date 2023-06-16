import React from 'react';
import './FavouriteItemCard.css';
import { Link } from 'react-router-dom';
// import { removeFromFavorite } from '../../actions/favoriteAction';

const FavouriteItemCard = ({ item, deleteFavItems }) => {
    return (
        <div className="FavItemCard">
            <img src={item.image} alt="ssa" />
            <div className='cardDetails'>
                <div>
                    <Link to={`product/${item.product}`}>{item.name}</Link>
                    <span>{`Price: ₹${item.price}`}</span>
                </div>
                <div>
                    <p onClick={() => deleteFavItems(item.product)}>Remove</p>
                </div>
            </div>
        </div>
    )
}

export default FavouriteItemCard
