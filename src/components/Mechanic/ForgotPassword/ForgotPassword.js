import {useNavigate } from 'react-router-dom';
import './ForgotPassword.css'
import { useState } from 'react';
import { validContact, validEmail } from '../../Regex/regex';
import axios from 'axios'
import api from "../../../WebApi/api";
import { useDispatch } from 'react-redux';
// import { setCustomer } from '../../../redux-config/customerSlice';
import { toast } from 'react-toastify';
import Navbar from '../../navbar/Navbar';
import { setShopkeeper } from '../../../redux-config/shopkeeperSlice';
function ShopkeeperForgotPassword() {
const dispatch =useDispatch();
const navigate=useNavigate()
const [contact, setContact] = useState("");
const [contactErr, setContactErr] = useState(false);
function contactHendler(e) {
    if (!(validContact.test(e.target.value)))
    setContactErr(true);
    else
    setContactErr(false)
}

const  handleSubnmit =async (event)=>{
    try{
        window.alert("inner handle submit")
         event.preventDefault();
         window.alert("after prevent default")
         const response=await axios.post(api.SHOPKEEPER_FORGOT_PASSWORD,{contact});
         window.alert("after api");
        //  console.log(response.data.shopkeeper);
         dispatch(setShopkeeper(response.data.shopkeeper))
         navigate("/verifyOtp");
    }
    catch(err){
        console.log(err);
        toast.error("Oops! something went wrong");
    }
}

    return <>
     <Navbar/> 
        <div className='container-fluid'>
            <div className='row outerDiv'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <div className='row innerDiv'>
                        <div className="col-md-4 col-sm-12 " id="firstside">
                            <div style={{ marginTop: "2vw" }}>
                                <div className="container-fluid" id="h1">
                                    Forgot Password
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
                            <form onSubmit={handleSubnmit}>
                                <div className="form-group" style={{ marginTop: "3vw" }}>
                                    <div style={{ marginLeft: "1.5vw" }}>
                                        <label className="form-label">Enter contact number</label>
                                        <div style={{ fontSize: 16, marginTop: 15 }}>
                                            <input type="text" required="" id="input"
                                                minLength={10}
                                                maxLength={10}
                                                placeholder="Enter contact number"
                                                onChange={(event) => setContact(event.target.value)}
                                                onKeyUp={contactHendler}
                                            />
                                            <div style={{ height: "1vw" }}>
                                                {contactErr ? <small style={{ color: "red" }} >Invalid contact</small> : ""}
                                            </div>
                                        </div>
                                        <a href='' id='signin'  data-bs-toggle="modal" data-bs-target="#shopKeeperModel">Signin?</a>
                                        <div id='buttonDiv'>
                                            <button type="submit" className="btn" id="signinBtn">
                                                SEND OTP
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
export default ShopkeeperForgotPassword;