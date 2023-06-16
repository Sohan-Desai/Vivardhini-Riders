import React, { Fragment, useEffect, useState } from 'react';
import './CreateProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const UpdateProduct = ({ history, match }) => {

    const categories = ["Laptop", "Mobile", "Bottom", "Tops", "Attire", "Camera", "Mouse"];

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error:updateError, isUpdated } = useSelector((state) => state.product);
    const { error, product } = useSelector((state) => state.productDetails);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const productId = match.params.id;

    useEffect(() => {

        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors);
        }

        if (isUpdated) {
            alert.success("Product updated successfully!")
            history.push("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, history, isUpdated, productId, product, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image)
        });

        dispatch(updateProduct(productId, myForm));
    }

    const updateProductImagesChange = (e) => {

        const files = Array.from(e.target.files);

        setImages([]);
        setOldImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            }

            reader.readAsDataURL(file);
        });
    }

    return (
        <Fragment>
            <MetaData title="Update Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        encType='multipart/form-data'
                        className="createProductForm"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder='Product Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder='Product Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={2}
                                cols={20}
                            />
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder='Stock'
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </div>
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept='image/*'
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>
                        <div id="createProductFormImage">
                            {oldImages && 
                                oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>
                        <Button
                            id='createProductBtn'
                            type='submit'
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateProduct
