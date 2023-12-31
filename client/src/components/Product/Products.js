import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts, clearErrors } from '../../actions/productAction';
import Pagination from 'react-js-pagination';
import Loader from '../layout/Loader'
import ProductCard from '../Home/ProductCard';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from '../layout/MetaData';

const categories = ["Laptop", "Mobile", "Bottom", "Tops", "Attire", "Camera", "Mouse"];

const Products = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
    const keyword = match.params.keyword;

    const setCurrentPageNum = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProducts(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);


    let count = filteredProductsCount;

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Vivardhini - Products" />
                    <h2 className='productsHeading'>Products</h2>
                    <div className='products'>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>

                    <div className='filterBox'>
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                        />
                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((category) => (
                                <li
                                    className='category-link'
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRatings) => {
                                    setRatings(newRatings)
                                }}
                                aria-labelledby='continuous-slider'
                                valueLabelDisplay='auto'
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < count && (
                        <div className='paginationBox'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNum}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}

export default Products
