import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@material-ui/lab'

const ProductCard = ({ product }) => {

    const options = {
        size: "small",
        value: product.ratings,
        precision: 0.5,
        readOnly: true
    }

    return (
        <Fragment>
            <Link className="productCard" to={`/product/${product._id}`}>
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div className='ratings'>
                    <Rating {...options} />
                    <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
                </div>
                <span>{`₹${product.price}`}</span>
            </Link>
        </Fragment>
    )
}

export default ProductCard
