
import "./logIn.css";
import "./navigation.css";
import CustomerSignInAndSignUp from "../customer/SignInAndSignUp/signInAndSignUp";
import 'react-toastify/dist/ReactToastify.css'

import { Link, useNavigate } from "react-router-dom";
import MechanicSignInAndSignUp from "../Mechanic/SignInAndSignUp/signInAndSignUp";
import { useDispatch, useSelector } from "react-redux";
import CustomerProfile from "../customer/customerProfile/customerProfile";
import { signOut } from "../../redux-config/customerSlice";
import AdminSignIn from "../Admin/adminSignIn/AdminSignIn";
import { useEffect, useMemo, useState } from "react";

function Navbar() {
    const dispatch = useDispatch();
    const { currentCustomer } = useSelector(state => state.customer);
    const { currentMechanic } = useSelector(state => state.mechanic);
    const { currentLocation } = useSelector(state => state.customer);
    const [city, setCity] = useState("Select City");
    const navigete = useNavigate();



    useEffect(() => {
        function getLocation() {
            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition(showPosition);
        }

        function showPosition(position) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "https://api.opencagedata.com/geocode/v1/json?q=" + position.coords.latitude + "+" + position.coords.longitude + "&key=87f70e732bbd44d984f351fc57d3e4cc", true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4) {
                    var citySpan = document.getElementById("city");
                    let data = JSON.parse(xhttp.responseText);
                    setCity(data.results[0].components.city);
                }
            }
        }

        getLocation();
    }, [currentCustomer])


    var signOutfun = () => {
        dispatch(signOut())
    }

    return <>
        <AdminSignIn />
        <CustomerSignInAndSignUp />
        <MechanicSignInAndSignUp />
        <div className="container-fluid border-bottom">
            <nav className="navbar navbar-expand-lg nav ">
                <div className="container-fluid a">
                    <img className="navbar-brand logo" src="./images/logo.png"></img>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navRight" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {currentCustomer && <>
                                <li className="nav-item ">
                                    <Link className="nav-link navOption" aria-current="page" to="/customerHome">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link navOption" to="/customerBookingHistory">
                                        History
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link navOption " >
                                        <i className="fa fa-map-marker fs-1" aria-hidden="true" />
                                        &nbsp;<span id="city">{currentLocation}</span>
                                    </Link>
                                </li>
                                <CustomerProfile />
                            </>}
                            {!currentCustomer && !currentMechanic && <><li className="nav-item ">
                                <Link to="/" className="nav-link navOption" aria-current="page" >Home</Link>
                            </li>
                                <li className="nav-item">
                                    <a className="nav-link navOption" href="#">Features </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link navOption" href="#">About</a>
                                </li>
                                <li className="nav-item dropdown ">
                                    <a className="nav-link navOption  text-light btn btn-info loginBtn" href="#" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="dropdown-toggle ">Login</span>
                                    </a>
                                    <ul className="dropdown-menu ">
                                        <li><a className="dropdown-item drop" data-bs-toggle="modal" data-bs-target="#customerModel">Customer</a></li>
                                        <li><a className="dropdown-item drop" data-bs-toggle="modal" data-bs-target="#mechanicModel" href="#">Shop</a></li>
                                        <li><a className="dropdown-item drop" data-bs-toggle="modal" data-bs-target="#adminModel">Admin</a></li>
                                    </ul>
                                </li></>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </>
}

export default Navbar;
