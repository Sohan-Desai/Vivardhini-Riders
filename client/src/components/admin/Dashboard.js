import React, { useEffect } from 'react';
import Sidebar from "./Sidebar";
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction';
import { getAllUsers } from '../../actions/userAction';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { Doughnut, Line } from 'react-chartjs-2';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.stock === 0) {
                outOfStock += 1;
            }
        });

    useEffect(() => {

        dispatch(getAdminProducts());
        dispatch(getAllUsers());

    }, [dispatch]);

    const lineState = {
        labels: ["Initial amount", "Amount earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#aaa"],
                hoverBackgroundColor: ["#999"],
                data: [0, 4000]
            }
        ]
    };

    const doughnutState = {
        labels: ["Out of stock ", "In stock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, (products.length - outOfStock)],
            }
        ]
    };

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className="dashboardContainer">
                <Typography component="h1" >Dashboard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total amount<br />2000
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line
                        data={lineState}
                    />
                </div>
                <div className="doughnutChart">
                    <Doughnut
                        data={doughnutState}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
