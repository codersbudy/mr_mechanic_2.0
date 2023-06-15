import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { validContact, validName, validPassword } from "../../Regex/regex";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../WebApi/api";
import { setCustomer } from "../../../redux-config/customerSlice";
import { setCurrentLocation } from "../../../redux-config/customerSlice";
import { setLatLong } from "../../../redux-config/customerSlice";
import { fetchShop } from "../../../redux-config/shopSlice";
import { fetchCategory } from "../../../redux-config/categorySlice";
function CustomerSignInAndSignUp() {
    var latlong;
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [contErr, setContErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const [confirmpassErr, setConfirmPassErr] = useState(false);
    const [forgotPasswordFlag, setForgetPasswordFlag] = useState(false);
    const { isLoading } = useSelector(state => state.shop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function contactHendler(e) {
        if (!(validContact.test(e.target.value)))
            setContErr(true);
        else
            setContErr(false)
    }

    function passwordHendler(e) {
        if (!(validPassword.test(e.target.value)))
            setPassErr(true);
        else
            setPassErr(false);
    }
    function confirmPasswordHendler(e) {
        if (!(password == e.target.value))
            setConfirmPassErr(true);
        else
            setConfirmPassErr(false);

    }
    function nameHendler(e) {
        if (validName.test(e.target.value))
            setNameErr(false);
        else
            setNameErr(true);
    }

    function funReturn() {
        let element = document.getElementById('box-content');
        element.style.transform = "rotateY(0deg)";
    }
    function funTurn() {
        var outer2 = document.getElementById('outer2');
        outer2.style.overflowY = "auto";
        outer2.style.borderRadius = "17px"
        var ele = document.getElementById('box-content');
        ele.style.transform = "rotateY(180deg)";

    }


    const handleSubmit = async (event) => {

        try {
            event.preventDefault();
            const response = await axios.post(api.CUSTOMER_SIGNIN, { contact, password });
            toast.success("Log In successfully...");
            dispatch(setCustomer(response.data.customer));
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                latlong = lat + "," + long;
                console.log("location " + latlong);

                dispatch(fetchShop(latlong));
                dispatch(fetchCategory());
                dispatch(setLatLong(latlong));
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", "https://api.opencagedata.com/geocode/v1/json?q=" + position.coords.latitude + "+" + position.coords.longitude + "&key=87f70e732bbd44d984f351fc57d3e4cc", true);
                xhttp.send();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4) {
                        let data = JSON.parse(xhttp.responseText);
                        dispatch(setCurrentLocation(data.results[0].components.city));
                    }
                }
                // getLocation();
                navigate("/customerHome");
            });
        }
        catch (err) {
            toast.error("please check contact password")
        }
    }


    const onSignUpHendler = async (event) => {
        try {
            event.preventDefault();
            let response = await axios.post(api.CUSTOMER_SIGNUP, { contact, password, customerName })
            toast.success("Registration successfully...");
            funReturn();
        }
        catch (err) {
            if (err.response.status == 400)
                toast.error("Bad request : 400");
            else if (err.response.status == 500)
                toast.error("Server Error : 500");
        }
    }


    var forPassFun = () => {
        setForgetPasswordFlag(true);
        funTurn();
    }
    var signUpFun = () => {
        setForgetPasswordFlag(false);
        funTurn();
    }
    return <>
        <ToastContainer />
        <div class="modal fade" id="customerModel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-content modal1"  >
                <div className="container-fluid m-0 p-0 box">
                    <div className="container-fluid m-0 p-0 box-content" id="box-content">
                        {/* _________________________login page_____________________________________ */}
                        <div className="row r1 p-0 m-0 outer1">
                            <div className="col-md-4 col-sm-12 " id="firstside">
                                <div style={{ marginTop: "2vw" }}>
                                    <div className="container-fluid fw-bold text-center " id="h2">
                                        * Login *
                                    </div>
                                </div>
                                <div className="imgDiv">
                                    <img
                                        src="./images/LoginImage.svg"
                                        className="sideImg"
                                        alt="Responsive image"
                                    />
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-12 secondside">
                                <div className="close">
                                    <button type="button" id="closebutoon" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>

                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="" style={{ marginTop: "2vw" }}>
                                        <div style={{ marginLeft: "1.5vw" }}>


                                            <div className="div1">

                                                <input className="input1" type="text" name="contact" required="" id="input" placeholder="+91" minLength={10} maxLength={10} onChange={(event) => setContact(event.target.value)} onKeyUp={contactHendler} />
                                                <label className="form-label label1">Enter Mobile Number</label>
                                                {contErr ? <small style={{ color: "red" }} >Invalid contact number</small> : ""}

                                            </div>
                                            <div className="div1 mt-3">

                                                <input className="input1" type="password" name="password" required="" id="password" placeholder="Enter Password" minLength={8} maxLength={16} onChange={(event) => setPassword(event.target.value)} onKeyUp={passwordHendler} />
                                                <label className="form-label label1">Enter Password</label>
                                                {passErr ? <small style={{ color: "red" }} >Invalid password</small> : ""}

                                            </div>
                                            <div style={{ marginTop: 15 }}>
                                                <span className="link">
                                                    <small className="fp linkHover" onClick={forPassFun}>Forgot password?</small>
                                                </span>
                                            </div>

                                            <div style={{ fontSize: 16, marginTop: "8vw" }}>
                                                <span style={{ marginTop: "2vw" }}>
                                                    <input type="checkbox" id="checkbox" onclick="termcondition()" />
                                                </span>
                                                <span id="checkboxcontaint">I agree to the <a href="" class="linkHover" id="termcondition">Term and condition.</a></span>

                                            </div>
                                            <div style={{ fontSize: 16, marginTop: "1.5vw" }} >
                                                <button type="submit" className="btn p-2" data-bs-dismiss="modal" aria-label="Close" id="signinBtn" > Login </button>

                                            </div>
                                            <div className="signup">Don't have an account? <span><Link className="signuplink linkHover" onClick={signUpFun} >Sign up</Link></span></div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="row r1 p-0 m-0 outer2" id="outer2">
                            {/* --------------------------------signUp page------------------------------------------ */}
                            {!forgotPasswordFlag && <>
                                <div className="col-md-4 col-sm-12 " id="firstside">
                                    <div style={{ marginTop: "2vw" }}>
                                        <div className="container-fluid fw-bold text-center " id="h2">
                                            * Sign up *
                                        </div>
                                    </div>
                                    <div >
                                        <img
                                            src="./images/LoginImage.svg"
                                            className="sideImg"
                                            alt="Responsive image"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12 secondside">
                                    <div className="close">
                                        <button type="button" id="closebutoon" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>

                                    </div>

                                    <form onSubmit={onSignUpHendler} >
                                        <div className="" style={{ marginTop: "2vw" }}>
                                            <div style={{ marginLeft: "1.5vw" }}>
                                                <div className="div1 ">

                                                    <input className="input1" type="text" name="username" required="" id="password" placeholder="Ex: John" onChange={(event) => setCustomerName(event.target.value)} onKeyUp={nameHendler} />
                                                    <label className="form-label label1">Customer name</label>
                                                    {nameErr ? <small style={{ color: "red" }} >Invalid customer name</small> : ""}


                                                </div>

                                                <div className="div1 mt-2" >

                                                    <input className="input1" type="text" name="contact" required="" id="input" placeholder="+91" minLength={10} maxLength={10} onChange={(event) => setContact(event.target.value)} onKeyUp={contactHendler} />
                                                    <label className="form-label label1">Mobile Number</label>
                                                    {contErr ? <small style={{ color: "red" }} >Invalid contact number</small> : ""}

                                                </div>
                                                <div className="div1 mt-2">

                                                    <input className="input1" type="password" name="password" required="" id="password" placeholder="Enter password" minLength={8} maxLength={16} onKeyUp={passwordHendler} onChange={(event) => setPassword(event.target.value)} />
                                                    <label className="form-label label1">Password</label>
                                                    {passErr ? <small style={{ color: "red" }} >Invalid password</small> : ""}

                                                </div>
                                                <div className="div1 mt-2">


                                                    <input className="input1" type="password" name="confirmPassword" required="" id="password" placeholder="Enter Confirm Password" minLength={8} maxLength={16} onKeyUp={confirmPasswordHendler} />
                                                    <label className="form-label label1">Confirm Password</label>
                                                    {confirmpassErr ? <small style={{ color: "red" }} >Password not match</small> : ""}

                                                </div>



                                                <div style={{ fontSize: 16, marginTop: "4vw" }} >
                                                    <button type="submit" className="btn p-2" id="signinBtn" > Sign Up </button>


                                                </div>
                                                <div className="signup">have an account? <span><a className="signuplink linkHover" onClick={funReturn} >Log in</a></span></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </>}
                            {/* ------------------------------forgetPassword Page---------------------------------- */}
                            {forgotPasswordFlag && <>
                                <div className="col-md-4 col-sm-12 " id="firstside">
                                    <div style={{ marginTop: "2vw" }}>
                                        <div className="container-fluid fw-bold text-center " id="h2">
                                            Forgot

                                        </div>
                                    </div>
                                    <div >
                                        <img
                                            src="./images/LoginImage.svg"
                                            className="sideImg"
                                            alt="Responsive image"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12 secondside">
                                    <div className="close">
                                        <button type="button" id="closebutoon" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>

                                    </div>

                                    <form onSubmit={onSignUpHendler} >
                                        <div className="" style={{ marginTop: "2vw" }}>
                                            <div style={{ marginLeft: "1.5vw" }}>
                                                <div className="div1 ">

                                                    <input className="input1" type="text" name="username" required="" id="password" placeholder="Ex: John" onChange={(event) => setCustomerName(event.target.value)} onKeyUp={nameHendler} />
                                                    <label className="form-label label1">Customer name</label>
                                                    {nameErr ? <small style={{ color: "red" }} >Invalid customer name</small> : ""}


                                                </div>

                                                <div className="div1 mt-2" >

                                                    <input className="input1" type="text" name="contact" required="" id="input" placeholder="+91" minLength={10} maxLength={10} onChange={(event) => setContact(event.target.value)} onKeyUp={contactHendler} />
                                                    <label className="form-label label1">Mobile Number</label>
                                                    {contErr ? <small style={{ color: "red" }} >Invalid contact number</small> : ""}

                                                </div>
                                                <div className="div1 mt-2">

                                                    <input className="input1" type="password" name="password" required="" id="password" placeholder="Enter password" minLength={8} maxLength={16} onKeyUp={passwordHendler} onChange={(event) => setPassword(event.target.value)} />
                                                    <label className="form-label label1">Password</label>
                                                    {passErr ? <small style={{ color: "red" }} >Invalid password</small> : ""}

                                                </div>
                                                <div className="div1 mt-2">


                                                    <input className="input1" type="password" name="confirmPassword" required="" id="password" placeholder="Enter Confirm Password" minLength={8} maxLength={16} onKeyUp={confirmPasswordHendler} />
                                                    <label className="form-label label1">Confirm Password</label>
                                                    {confirmpassErr ? <small style={{ color: "red" }} >Password not match</small> : ""}

                                                </div>



                                                <div style={{ fontSize: 16, marginTop: "4vw" }} >
                                                    <button type="submit" className="btn p-2" id="signinBtn" > Forgot Password </button>


                                                </div>
                                                <div className="signup">have an account? <span><a className="signuplink linkHover" onClick={funReturn} >Log in</a></span></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </>}
                        </div>

                    </div>
                </div>


            </div>

        </div>
        <div className="modal fade" id="customerSignUpModel"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-lg modal-content rounded-0"
                style={{ borderRadius: "100%" }}
            >
                <div className="row">
                    <div className="col-md-4 col-sm-12 " id="firstside">
                        <div style={{ marginTop: "2vw" }}>
                            <div className="container-fluid" id="h2" style={{ textAlign: "center" }}>
                                Signup
                            </div>
                        </div>
                        <div style={{ marginTop: 200 }}>
                            <img
                                src="./images/LoginImage.svg"
                                className="img-fluid"
                                alt="Responsive image"
                            />
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-12" style={{ paddingRight: 25 }}>
                        <div className="close">
                            <button
                                type="button"
                                id="closebutoon"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <form style={{ padding: "3vw" }}>
                            <div className="placeholderdiv">
                                <input
                                    className="place"
                                    type="text"
                                    id="customerName"
                                />
                                <div style={{ height: "1vw" }}>

                                </div>
                            </div>
                            <div className="placeholderdiv">
                                <input
                                    className="place"
                                    type="text"
                                    required=""
                                    id="customerContact"
                                    placeholder="Enter contact number"
                                    minLength={10}
                                    maxLength={10}

                                />
                                <div style={{ height: "1vw" }}>

                                </div>
                            </div>

                            <div className="placeholderdiv">
                                <input
                                    className="place"
                                    type="password"
                                    id="customerPassword"
                                    placeholder="Enter password"

                                    minLength={8}
                                    maxLength={16}
                                />
                                <div style={{ height: "1vw" }}>

                                </div>
                            </div>
                            <div>
                                <a href="" className="link">
                                    <a data-bs-toggle="modal" data-bs-target="#customerModel">Already have an account ?</a>
                                </a>
                            </div>
                            <div>
                                <button type="submit" className="btn btn" id="signUpBtn">
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CustomerSignInAndSignUp;

