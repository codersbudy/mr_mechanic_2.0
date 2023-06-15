// import {useNavigate } from 'react-router-dom';
// import './AdminForgot.css'
// import { useState } from 'react';
// import { validContact, validEmail } from '../../Regex/regex';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setCustomer } from '../../../redux-config/customerSlice';
// import { toast } from 'react-toastify';
// import Navbar from '../../navbar/Navbar';
// import api from '../../../../WebApi/api';

function AdminForgotPassword() {

    return <>
        {/* <Navbar/>  */}
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
                            <form>
                                <div className="form-group" style={{ marginTop: "3vw" }}>
                                    <div style={{ marginLeft: "1.5vw" }}>
                                        <label className="form-label">Enter contact number</label>
                                        <div style={{ fontSize: 16, marginTop: 15 }}>
                                            <input type="text" required="" id="input"
                                                minLength={10}
                                                maxLength={10}
                                                placeholder="Enter contact number"
                                            //    onChange={(event) => setContact(event.target.value)}
                                            //    onKeyUp={contactHendler}
                                            />
                                            <div style={{ height: "1vw" }}>
                                                {/* {contactErr ? <small style={{ color: "red" }} >Invalid contact</small> : ""} */}
                                            </div>
                                        </div>
                                        <a href='' id='signin' data-bs-toggle="modal" data-bs-target="#customerModel">Signin?</a>
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
export default AdminForgotPassword;