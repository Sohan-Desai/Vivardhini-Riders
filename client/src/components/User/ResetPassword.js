import React, { Fragment, useState, useEffect } from 'react';
import './ResetPassword.css';
import Loader from '../layout/Loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const ResetPassword = ({ history, match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(match.params.token, myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password updated successfully!");

            history.push("/login");

        }
    }, [dispatch, alert, error, history, success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Reset Password" />
                    <div className='resetPasswordContainer'>
                        <div className='resetPasswordBox'>
                            <h2 className='resetPasswordHeading'>Reset Password</h2>
                            <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>
                                <div>
                                    <LockOpenIcon />
                                    <input
                                        type='password'
                                        placeholder='New Password'
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <LockIcon />
                                    <input
                                        type='password'
                                        placeholder='Confirm Password'
                                        name='password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <input
                                    type='submit'
                                    value="Update Password"
                                    className='resetPasswordBtn'
                                // disabled={loading ? true : false}
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default ResetPassword
