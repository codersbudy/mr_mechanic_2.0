import { Link, useNavigate } from 'react-router-dom';
import './SetPassword.css'
import { useState } from 'react';
import { validPassword } from '../../Regex/regex';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../../WebApi/api';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../../navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
function SetPassword() {
    const navigate = useNavigate();
    const [passErr, setPassErr] = useState(false);
    const [confirmpassErr, setConfirmPassErr] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { currentCustomer } = useSelector(state => state.customer);
    const { currentShopkeeper } = useSelector((state) => state.shopkeeper);
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
    const hendleSubmit = async (event) => {

        try {
            event.preventDefault();
            if (currentCustomer) {
                let contact = currentCustomer.contact
                let response = await axios.post(api.CUSTOMER_SET_PASSWORD, { contact, password });
                toast.success("successfully password set");
                navigate("/home");
            }
            else {
                let contact = currentShopkeeper.contact;
                let response = await axios.post(api.SHOPKEEPER_SET_PASSWORD, { contact, password });
                toast.success("successfully password set");
                navigate("/home");
            }
        }
        catch (err) {
            toast.error("Oops something went wrong");
        }
    }

    return <>
        <Navbar />
        <ToastContainer />
        <div className='container-fluid'>
            <div className='row outerDiv'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <div className='row innerDiv'>
                        <div className="col-md-4 col-sm-12 " id="firstside">
                            <div style={{ marginTop: "2vw" }}>
                                <div className="container-fluid" id="h1">
                                    Set Password
                                </div>
                            </div>
                            <div style={{ marginTop: 100 }}>
                                <img
                                    src="./images/LoginImage.svg"
                                    className="img-fluid"
                                    alt="Responsive image"
                                />
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12" style={{ paddingRight: 25 }}>
                            <form onSubmit={hendleSubmit}>
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
                                        <div id='buttonDiv'>
                                            <button type="submit" className="btn" id="signinBtn">
                                                SET PASSWORD
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-2'></div>
            </div>
        </div>
    </>

}
export default SetPassword;