import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { validContact, validEmail, validName, validPassword } from "../../Regex/regex";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setCustomer, signOut } from "../../../redux-config/customerSlice";
import { setCurrentLocation } from "../../../redux-config/customerSlice";
import { fetchShop } from "../../../redux-config/shopSlice";
import { fetchCategory } from "../../../redux-config/categorySlice";
import api from "../../../WebApi/api";
import { setAdmin } from "../../../redux-config/adminSlice";

function AdminSignIn() {
    // window.alert("innner admin")
    var latlong;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [contErr, setContErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const [confirmpassErr, setConfirmPassErr] = useState(false);
    const [forgotPasswordFlag, setForgetPasswordFlag] = useState(false);
    const [verifyPasswordFlag, setVerifyPasswordFlag] = useState(false);
    const [setPasswordFlag, setSetPasswordFlag] = useState(false);
    const [customerRegistration, setCustomerRegistration] = useState("");
    const [varifyOtp, setVerifyOtp] = useState("");
    const { isLoading } = useSelector(state => state.shop);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // var verifyPasswordFlag=true;
    function contactHendler(e) {
        if (!(validContact.test(e.target.value)))
            setContErr(true);
        else
            setContErr(false)
    }
    function emailHendler(e) {
        if (!(validEmail.test(e.target.value)))
            setEmailErr(true);
        else
            setEmailErr(false)
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
            await axios.post(api.ADMIN_SIGNIN, { email, password });
            // console.log(response);
            toast.success("Log In successfully...");
            dispatch(setAdmin("Signed In"))
            navigate("/admin")

            // dispatch(setCustomer(response.data.customer));
            // console.log(response.data);

        }
        catch (err) {
            console.log(err)
            if (err.response.status == 400)
                toast.error("Invalid Password");
            else
                toast.error("invalid email");
        }
    }

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
                let data = JSON.parse(xhttp.responseText);
                dispatch(setCurrentLocation(data.results[0].components.city));
            }
        }
    }
    var forPassFun = () => {
        setForgetPasswordFlag(true);
        funTurn();
    }
    var signUpFun = () => {
        // setForgetPasswordFlag(false);
        // funTurn();
        funReturn();
    }
    const forgetClose = () => {
        // setForgetPasswordFlag(false);
        funReturn();

    }
    // --------------------------------------- verify pass---------------------
    // --------------------------------------- verify pass---------------------
    // const navigate = useNavigate();
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [pin5, setPin5] = useState("");
    const [pin6, setPin6] = useState("");
    const [pinErr, setPinErr] = useState(false);
    const { currentAdmin } = useSelector(state => state.admin);
    const verifyHandleSubmit = async (event) => {
        try {

            let tempraryPassword = pin1 + "" + pin2 + "" + pin3 + "" + pin4 + "" + pin5 + "" + pin6;
            event.preventDefault();



            if (currentAdmin) {
                let contact = currentAdmin.contact;
                const response = await axios.post(api.ADMIN_VERIFY_OTP, { email, tempraryPassword });
                setSetPasswordFlag(true);
                setVerifyPasswordFlag(false);
                funTurn();
            }
            
            else {
                if (varifyOtp == tempraryPassword) {
                    const response = await axios.post(api.CUSTOMER_SIGNUP, customerRegistration);
                    console.log(response);
                    window.alert("sign up ki api chli ")
                    toast.success("Registration Successs");
                    setVerifyPasswordFlag(false);
                    funReturn();

                }
                else {
                    toast.error("Otp not Match")
                }
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Oops! wrong otp");
        }
    }
    // -------------------------------------------- set password----------------------------
    const setPasswordHendleSubmit = async (event) => {

        try {
            event.preventDefault();
            if (currentAdmin) {
                let contact = currentAdmin.contact
                let response = await axios.post(api.ADMIN_SET_PASSWORD, { contact, password });
                toast.success("successfully password set");
                setSetPasswordFlag(false);
                dispatch(signOut());
                funReturn();
            }

        }
        catch (err) {
            toast.error("Oops something went wrong");
        }
    }

    const ForgotPasswordHandleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(api.ADMIN_FORGOT_PASSWORD, { contact });
            console.log(response)
            dispatch(setAdmin(response.data.admin))
            setVerifyPasswordFlag(true);
            setForgetPasswordFlag(false);
            funReturn();
        }
        catch (err) {
            if (err.response.status == 450)
                toast.error("Please check contact number");
            else if (err.response.status == 500)
                toast.error("Oops! something went wrong");
            else if (err.response.status == 550)
                toast.error("otp not sent")
            else if (err.response.status == 200)
                toast.success("otp sent successfully");
        }
    }



    const signIn = () => {
        // setForgetPasswordFlag(false);
        funReturn();
    }

    const modalClose = () => {
        dispatch(signOut())
    }
    return <>
        <ToastContainer />
        <div class="modal fade" id="adminModel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-content modal1"  >
                <div className="container-fluid m-0 p-0 box">
                    <div className="container-fluid m-0 p-0 box-content" id="box-content">
                        {/* _______login page___________ */}
                        <div className="row r1 p-0 m-0 outer1">
                            {!verifyPasswordFlag && <>
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


                                                    <input className="input1" type="email" name="email" required="" id="input" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} onKeyUp={emailHendler} />
                                                    <label className="form-label label1">Enter email</label>
                                                    {emailErr ? <small style={{ color: "red" }} >Invalid email</small> : ""}

                                                </div>
                                                <div className="div1 mt-3">


                                                    <input className="input1" type="password" name="password" required="" id="password" placeholder="Enter Password" minLength={8} maxLength={16} onChange={(event) => setPassword(event.target.value)} onKeyUp={passwordHendler} />
                                                    <label className="form-label label1">Enter Password</label>
                                                    {passErr ? <small style={{ color: "red" }} >Invalid password</small> : ""}


                                                </div>

                                                <div style={{ marginTop: 15 }}>
                                                    <span className="link">
                                                        <small className="fp linkHover curser" onClick={forPassFun}>Forgot password?</small>
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
                            </>}
                            {verifyPasswordFlag && <>
                                <div className="col-md-4 col-sm-12 " id="firstside">
                                    <div style={{ marginTop: "2vw" }}>
                                        <div className="container-fluid fw-bold text-center " id="h2">
                                            Verify Otp
                                        </div>
                                    </div>
                                    <div className="imgDiv">
                                        <img
                                            style={{ height: "100px" }}
                                            src="./images/LoginImage.svg"
                                            className="sideImg"
                                            alt="Responsive image"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12 secondside">
                                    <div className="close">
                                        <button type="button" id="closebutoon" onClick={modalClose} class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>

                                    </div>

                                    <form onSubmit={verifyHandleSubmit}>
                                        <div className="form-group" style={{ marginTop: "3vw" }}>
                                            <div style={{ marginLeft: "3vw", textAlign: "center" }}>
                                                <div >
                                                    <label className="form-label label">Enter verification code</label>
                                                </div>
                                                <div style={{ fontSize: 16, marginTop: 15 }}>
                                                    <div class="input-field">
                                                        <input className='input' onChange={(event) => setPin1(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin2(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin3(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin4(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin5(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin6(event.target.value)} type="text" maxLength={1} />

                                                    </div>
                                                    <div>
                                                        <div style={{ height: "1vw" }}>
                                                            {pinErr ? <small style={{ color: "red", textAlign: "left" }} >Invalid Otp</small> : ""}
                                                        </div>
                                                    </div>

                                                </div>
                                                <Link to="/forgotPassword" id='signin'><i class="fa fa-arrow-left icon" aria-hidden="true"></i>Back</Link>
                                                <div id='buttonDiv' style={{ marginTop: "10vw" }} >
                                                    <button type="submit" className="btn" id="signinBtn" >
                                                        VERIFY
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </>}
                        </div>
                        <div className="row r1 p-0 m-0 outer2" id="outer2">
                            {/* --------------------------------signUp page------------------------------------------ */}

                            {/* ------------------------------forgetPassword Page---------------------------------- */}
                            {forgotPasswordFlag && <>
                                <div className="col-md-4 col-sm-12 " id="firstside">
                                    <div style={{ marginTop: "2vw" }}>
                                        <div className="container-fluid fw-bold text-center " id="h2">
                                            Forgot Password

                                        </div>
                                    </div>
                                    <div >
                                        <img
                                            src="./images/LoginImage.svg"
                                            className="sideImg"
                                            alt="Responsive image"
                                            style={{ height: "150px" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12 secondside">
                                    <div className="close">
                                        <button type="button" id="closebutoon" class="btn-close" data-bs-dismiss="modal" onClick={forgetClose}
                                            aria-label="Close"></button>

                                    </div>

                                    <form onSubmit={ForgotPasswordHandleSubmit} >
                                        <div className="" style={{ marginTop: "2vw" }}>
                                            <div style={{ marginLeft: "1.5vw" }}>
                                                <div className="div1 mt-2" >

                                                    <input className="input1" type="email" name="email" required="" id="input" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} onKeyUp={emailHendler} />
                                                    <label className="form-label label1">Enter email</label>
                                                    {emailErr ? <small style={{ color: "red" }} >Invalid email</small> : ""}

                                                </div>
                                                <a id='signin' onClick={signIn}>Signin?</a>

                                                <button type="submit" className="btn" id="sendOptBtn">
                                                    SEND OTP
                                                </button>    </div>
                                        </div>
                                    </form>
                                </div>
                            </>}
                            {setPasswordFlag && <>

                                <div className="col-md-4 col-sm-12 " id="firstside">
                                    <div style={{ marginTop: "2vw" }}>
                                        <div className="container-fluid fw-bold text-center " id="h2">
                                            Set Password

                                        </div>
                                    </div>
                                    <div >
                                        <img

                                            src="./images/LoginImage.svg"
                                            className="sideImg"
                                            alt="Responsive image"
                                            style={{ height: "150px" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12 secondside">
                                    <div className="close">
                                        <button type="button" id="closebutoon" class="btn-close" data-bs-dismiss="modal" onClick={modalClose}
                                            aria-label="Close"></button>

                                    </div>

                                    <form onSubmit={setPasswordHendleSubmit} >
                                        <div className="form-group" style={{ marginTop: "3vw" }}>
                                            <div style={{ marginLeft: "3vw" }}>
                                                <div >
                                                    <label className="form-label">Enter your password</label>
                                                </div>
                                                <div style={{ fontSize: 16, marginTop: 15 }}>
                                                    <input
                                                        onChange={(event) => setPassword(event.target.value)}
                                                        type="password"
                                                        style={{ width: "99%" }}
                                                        id="input"
                                                        placeholder="Enter password"
                                                        onKeyUp={passwordHendler}
                                                        minLength={8}
                                                        maxLength={16}
                                                    />
                                                    <div style={{ height: "1vw" }}>
                                                        {passErr ? <small style={{ color: "red" }} >Invalid password</small> : ""}
                                                    </div>
                                                </div>

                                                <div style={{ fontSize: 16, marginTop: 25 }}>
                                                    <div >
                                                        <label className="form-label">Enter confirm password</label>
                                                    </div>
                                                    <input
                                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                                        type="password"
                                                        style={{ width: "99%" }}
                                                        id="input"
                                                        placeholder="Enter confirm password"
                                                        onKeyUp={confirmPasswordHendler}
                                                        minLength={8}
                                                        maxLength={16}
                                                    />
                                                    <div style={{ height: "1vw" }}>
                                                        {confirmpassErr ? <small style={{ color: "red" }} >Password Not Match</small> : ""}
                                                    </div>
                                                </div>

                                                <Link to='/verifyOtp' id='signin'><i class="fa fa-arrow-left icon" aria-hidden="true"></i>Back</Link>
                                                <div id='buttonDiv' style={{ marginTop: "5vw" }}>
                                                    <button type="submit" className="btn" id="signinBtn">
                                                        SET PASSWORD
                                                    </button>
                                                </div>
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

export default AdminSignIn;

