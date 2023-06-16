import React, { Fragment, useState, useEffect } from 'react';
import './UpdateProfile.css';
import Loader from '../layout/Loader';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const UpdateProfile = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));
    }

    const updateProfileImageChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile updated successfully!");
            dispatch(loadUser());

            history.push("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET
            });
        }
    }, [dispatch, alert, error, history, user, isUpdated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Profile" />
                    <div className='updateProfileContainer'>
                        <div className='updateProfileBox'>
                            <h2 className='updateProfileHeading'>Update Profile</h2>
                            <form className='updateProfileForm' encType='multipart/form-data' onSubmit={updateProfileSubmit}>
                                <div className='updateProfileName'>
                                    <FaceIcon />
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='updateProfileEmail'>
                                    <MailOutlineIcon />
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div id='updateProfileImage'>
                                    <img src={avatarPreview}
                                        alt='Avatar preview'
                                        style={{opacity:avatarPreview === "/Profile.png" ? "0.6" : "1"}}
                                    />
                                    <input
                                        type='file'
                                        name='avatar'
                                        accept='image/*'
                                        onChange={updateProfileImageChange}
                                    />
                                </div>
                                <input
                                    type='submit'
                                    value="Update Profile"
                                    className='updateProfileBtn'
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

export default UpdateProfile
