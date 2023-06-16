import React, { Fragment, useEffect, useState } from 'react';
import "./productReview.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, deleteReview, clearErrors } from '../../actions/productAction';
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ProductReviews = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error: deleteError, isDeleted } = useSelector((state) => state.review);
    const { loading, error, reviews } = useSelector((state) => state.productReviews);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReview(reviewId, productId));
    }

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(getAllReviews(productId));
    }

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Review deleted successfully!");
            history.push("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
        { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
        { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "blueColor";
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button onClick={
                            () => deleteReviewHandler(params.getValue(params.id, 'id'))
                        }>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            }
        }
    ];

    const rows = [];

    reviews &&
        reviews.forEach((review) => {
            rows.push({
                id: review._id,
                comment: review.comment,
                rating: review.rating,
                user: review.name
            })
        });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCT REVIEWS -Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productReviewsContainer">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading" >All Product Reviews</h1>
                        <div>
                            <StarIcon />
                            <input
                                type="text"
                                placeholder='Product Id'
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            id='createProductBtn'
                            type='submit'
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>
                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    ) : (
                        <h1 className="productReviewsFormHeading">No reviews found</h1>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default ProductReviews
