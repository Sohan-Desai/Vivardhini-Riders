import { Fragment, useState } from "react";
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {

    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { favItems } = useSelector((state) => state.favorites);

    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { 
            icon: <FavoriteIcon style={{color:favItems.length>0 ? "tomato" : "unset"}} />, 
            name: `Favorites(${favItems.length})`, 
            func: favorites },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard });
    }

    function dashboard() {
        history.push("/admin/dashboard");
    }

    function favorites() {
        history.push("/favorites");
    }

    function orders() {
        history.push("/orders");
    }

    function account() {
        history.push("/account");
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logged out successfully!");
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                className="speedDial"
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                icon={<img
                    className="speedDialIcon"
                    src={user.avatar.url ? user.avatar.url : "./Profile.png"}
                    alt="Profile"
                />}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth<=600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions
