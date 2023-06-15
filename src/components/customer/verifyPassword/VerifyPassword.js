import { Link, useNavigate } from 'react-router-dom';
import './VerifyPassword.css'
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import api from '../../../WebApi/api';
import { toast } from 'react-toastify';
import Navbar from '../../navbar/Navbar';
function VerifyPassword() {
    const navigate = useNavigate();
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [pin5, setPin5] = useState("");
    const [pin6, setPin6] = useState("");
    const [pinErr, setPinErr] = useState(false);
    const { currentCustomer } = useSelector(state => state.customer);
    const { currentShopkeeper } = useSelector(state => state.shopkeeper);
    const handleSubmit = async (event) => {
        try {

            let tempraryPassword = pin1 + "" + pin2 + "" + pin3 + "" + pin4 + "" + pin5 + "" + pin6;
            event.preventDefault();

            

            if (currentCustomer) {

                let contact = currentCustomer.contact;
                const response = await axios.post(api.CUSTOMER_VERIFY_OTP, { contact, tempraryPassword });
                navigate("/setPassword")
            }
            else if(currentShopkeeper) {
                let contact = currentShopkeeper.contact;
                const response = await axios.post(api.SHOPKEEPER_VERIFY_OTP, { contact, tempraryPassword });
                navigate("/setPassword")
            }
        }
        catch (err) {
            toast.error("Oops! wrong otp");
        }
    }
    return <>
        <Navbar />
        <div className='container-fluid'>
            <div className='row outerDiv'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <div className='row innerDiv'>
                        <div className="col-md-4 col-sm-12 " id="firstside">
                            <div style={{ marginTop: "2vw" }}>
                                <div className="container-fluid" id="h1">
                                    Verification
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
                            <form onSubmit={handleSubmit}>
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
                                        <div id='buttonDiv'>
                                            <button type="submit" className="btn" id="signinBtn">
                                                VERIFY
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
export default VerifyPassword;