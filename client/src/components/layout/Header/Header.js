import React from 'react'
import { ReactNavbar } from 'overlay-navbar';
import {MdAccountCircle, MdSearch, MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import logo from '../../../Images/logo.png'

const options = {
    burgerColor: "transparent",
    burgerColorHover: "#eb4034",
    logo: logo,
    logoWidth: "20vmax",
    navColor1: "#fff",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "Book a Service",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/service",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35, 0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIcon: true,
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35, 0.8)",
    ProfileIconElement:  MdAccountCircle ,
    searchIcon: true,
    searchIconColor: "rgba(35, 35, 35, 0.8)",
    SearchIconElement:  MdSearch,
    cartIcon: true,
    cartIconColor: "rgba(35, 35, 35, 0.8)",
    CartIconElement:  MdFavoriteBorder,
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax"
}

const Header = () => {
    return (
        <ReactNavbar {...options}/>
    );
}

export default Header
