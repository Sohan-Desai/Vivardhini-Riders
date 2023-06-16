import React, { Fragment, useState, useEffect } from 'react';
import './UpdatePassword.css';
import Loader from '../layout/Loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const UpdatePassword = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password updated successfully!");

            history.push("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, alert, error, history, isUpdated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className='updatePasswordContainer'>
                        <div className='updatePasswordBox'>
                            <h2 className='updatePasswordHeading'>Update Password</h2>
                            <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                                <div className='signUpPassword'>
                                    <VpnKeyIcon />
                                    <input
                                        type='password'
                                        placeholder='OLd Password'
                                        name='password'
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='signUpPassword'>
                                    <LockOpenIcon />
                                    <input
                                        type='password'
                                        placeholder='New Password'
                                        name='password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='signUpPassword'>
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
                                    value="Change Password"
                                    className='updatePasswordBtn'
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

export default UpdatePassword
