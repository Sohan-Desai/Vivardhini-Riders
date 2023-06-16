import React from 'react';
import './NotFound.css'
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='PageNotFound'>
            <ErrorIcon />
            <Typography>Page Not Found</Typography>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default NotFound
