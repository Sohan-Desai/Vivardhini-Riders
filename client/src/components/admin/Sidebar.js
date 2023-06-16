import React, { Fragment } from 'react';
import './Sidebar.css';
import logo from "../../Images/logo.png";
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
    return (
        <Fragment>
            <div className="sidebar">
                <Link to="/">
                    <img src={logo} alt='Vivardhini Riders' />
                </Link>
                <Link to="/admin/dashboard">
                    <p>
                        <DashboardIcon /> Dashboard
                    </p>
                </Link>
                <TreeView
                    className='productTab'
                    defaultExpandIcon={<ExpandMoreIcon />}
                    defaultCollapseIcon={<ExpandLessIcon />}
                >
                    <TreeItem nodeId='1' label="Products">
                        <Link to="/admin/products" >
                            <TreeItem nodeId='2' label="All" icon={<PostAddIcon />} />
                        </Link>
                        <Link to="/admin/product" >
                            <TreeItem nodeId='3' label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
                <Link to="/admin/users">
                    <p>
                        <PeopleIcon /> Users
                    </p>
                </Link>
                <Link to="/admin/reviews">
                    <p>
                        <RateReviewIcon /> Reviews
                    </p>
                </Link>
            </div>
        </Fragment>
    );
}

export default Sidebar
