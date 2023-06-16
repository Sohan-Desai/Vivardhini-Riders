import React, { Fragment, useEffect, useState } from 'react';
import './CreateProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, clearErrors } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';

const CreateProduct = ({ history }) => {

    const categories = ["Laptop", "Mobile", "Bottom", "Tops", "Attire", "Camera", "Mouse"];

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

        if (success) {
            alert.success("Product created successfully!")
            history.push("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, history, success]);

    const createProductSubmitHandler = (e) => {
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

        dispatch(createProduct(myForm));
    }

    const createProductImagesChange = (e) => {

        const files = Array.from(e.target.files);

        console.log(files);
        console.log(e.target.name);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    console.log(reader.result);
                    setImages((old) => [...old, reader.result]);
                }
            }

            reader.readAsDataURL(file);
        });
    }

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        encType='multipart/form-data'
                        className="createProductForm"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>
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
                            <select onChange={(e) => setCategory(e.target.value)}>
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
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </div>
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept='image/*'
                                product="123"
                                onChange={createProductImagesChange}
                                multiple
                            />
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

export default CreateProduct
