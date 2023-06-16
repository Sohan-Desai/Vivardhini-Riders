import React, { Fragment, useEffect } from 'react';
import "./productList.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productAction';
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Product deleted successfully!");
            history.push("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

        dispatch(getAdminProducts());

    }, [dispatch, alert, error, deleteError, isDeleted, history]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 280, flex: 0.5 },
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
                        <Link to={`/admin/product/${params.getValue(params.id, 'id')}`} >
                            <EditIcon />
                        </Link>
                        <Button onClick={
                            () => deleteProductHandler(params.getValue(params.id, 'id'))
                        }>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            }
        }
    ]

    const rows = []

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                name: item.name,
                price: item.price
            })
        });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS -Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 className="productListHeading">ALL PRODUCTS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default ProductList
