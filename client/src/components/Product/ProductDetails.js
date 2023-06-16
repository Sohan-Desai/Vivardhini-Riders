import React, { Fragment, useEffect, useState } from 'react'
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { addToFavorite } from '../../actions/favoriteAction';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const options = {
        value: product.ratings,
        precision: 0.5,
        readOnly: true
    }

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToFavoriteHandler = () => {
        dispatch(addToFavorite(match.params.id, quantity));
        alert.success(`${product.name} added to favorites`);
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("itemId", match.params.id);

        dispatch(newReview(myForm));

        setOpen(false);
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review submitted successfully!");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(match.params.id))

    }, [dispatch, match.params.id, error, alert, reviewError, success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`Vivardhini - ${product.name}`} />
                    <div className='ProductDetails'>
                        <div>
                            <Carousel className='imageCarousel'>
                                {
                                    product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className='CarouselImage'
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} slide`}
                                        />
                                    ))
                                }
                            </Carousel>
                        </div>
                        <div>
                            <div className='detailsBlock_1'>
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className='detailsBlock_2'>
                                <Rating {...options} />
                                <span className='detailsBlock_2_span'>({product.numOfReviews} reviews)</span>
                            </div>
                            <div className='detailsBlock_3'>
                                <h1>{`₹${product.price}`}</h1>
                                <div className='detailsBlock_3-1'>
                                    <div className='detailsBlock_3-1-1'>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input value={quantity} type='number' readOnly />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button onClick={addToFavoriteHandler} disabled={product.stock < 1 ? true : false}>
                                        Add to Favorites
                                    </button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                    </b>
                                </p>
                            </div>
                            <div className='detailsBlock_4'>

                                Description : <p>{product.description}</p>
                            </div>
                            <button className='submitReview' onClick={submitReviewToggle}>
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className='reviewsHeading'>REVIEWS</h3>
                    <Dialog
                        aria-labelledby='simple-dialog-title'
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating
                                name="simple-controlled"
                                onChange={(e, newValue) => setRating(newValue)}
                                value={rating}
                                size='large'
                            />
                            <textarea
                                className='submitDialogTextArea'
                                cols={30}
                                rows={5}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
                            <Button color='primary' onClick={reviewSubmitHandler}>Submit</Button>
                        </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {product.reviews &&
                                product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)
                            }
                        </div>
                    ) : (
                        <p className='noReviews'>No reviews yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails
