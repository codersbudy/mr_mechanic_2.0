import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import './navigation.css';
import axios from "axios";
import api from "../../../WebApi/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setCustomer, signOut } from "../../../redux-config/customerSlice";

function CusotmerProfile() {
    const dispatch = useDispatch();
    var photochange = true;
    var image = "http://localhost:3001/images/"
    const { currentCustomer } = useSelector((state) => state.customer);
    const [customerName, setCustomerName] = useState(currentCustomer.customerName);
    const [email, setemail] = useState(currentCustomer.email);
    const [photo, setPhoto] = useState([]);
    const [imagesrc, setImagesrc] = useState(image + currentCustomer.photo);
    const [imageShow, setImageShow] = useState(image + currentCustomer.photo);
    const navigete = useNavigate();

    var profileshow = () => {
        document.getElementById("save").disabled = "true"
        let viewProfile = document.getElementById("viewProfile")
        let email = document.getElementById("email")
        viewProfile.style.display = "block";
        email.style.color = currentCustomer.email ? "#3CB0A2" : "red";
    }
    var nameEdit = () => {
        let name = document.getElementById("name")
        name.readOnly = false;
        name.style.border = "1px solid #3CB0A2"
        name.style.color = "#3CB0A2"
        name.focus();
        saveEnable();
    }
    var nameOnblur = () => {
        let name = document.getElementById("name")
        name.readOnly = true;
        name.style.border = "none";
    }
    var photoEdit = () => {
        let name = document.getElementById("profileImg")
        name.readOnly = false;
        name.style.border = "1px solid #3CB0A2"
        name.style.color = "#3CB0A2"
        name.focus();
    }
    var emailEdit = () => {
        let email = document.getElementById("email")
        email.readOnly = false;
        email.style.border = "1px solid #3CB0A2"
        email.focus();
        saveEnable();
    }
    var emailOnblur = () => {
        let email = document.getElementById("email")
        email.readOnly = true;
        email.style.border = "none";
    }
    var saveEnable = () => {
        let saveEle = document.getElementById("save");
        saveEle.disabled = false;
    }
    var closeBtnOnclick = () => {
        setImagesrc(imageShow);

        let viewProfile = document.getElementById("viewProfile");
        document.getElementById("save").disabled = "true";
        viewProfile.style.display = "none";
    }


    const profilePic = (e) => {
        var preview = document.getElementById('profileImg');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setImagesrc(reader.result);
        }

        if (file)
            reader.readAsDataURL(file);
        setPhoto(e.target.files[0]);

        photochange = false;
        saveEnable();

    }
    function saveData() {
        setImageShow(imagesrc)
        let contact = currentCustomer.contact;
        const formdata = new FormData();
        formdata.append('photo', photo);
        console.log(photo);
        formdata.set('customerName', customerName);
        formdata.set('email', email);
        formdata.set('contact', contact);
        console.log(formdata);
        let response = axios.post(api.CUSTOMER_UPDATE_PROFILE, formdata);
        // const [customerName, setCustomerName] = useState(currentCustomer.customerName);
        let customer = { ...currentCustomer, customerName, email, photo };
        // window.alert(response.data.result);
        dispatch(setCustomer(customer));
        toast.success("Profile successfully update..");
        navigete("/customerHome");
    }
    var signout = () => {
        dispatch(signOut())
    }

    return <>
        <li className="nav-item">
            <a className="nav-link navOption user " id="userProfile" onClick={profileshow}>
                {" "}
                <i className="fa fa-user fs-5 " aria-hidden="true" />
                &nbsp;&nbsp;<span className="fw-bold ">{currentCustomer.customerName}</span>
            </a>
        </li>
        <div className="viewProfile" id="viewProfile">
            <div className="closeBtn" id="closeBtn" onClick={closeBtnOnclick}><i style={{ fontSize: '17px' }} className="fa"></i></div>
            <div className="text-center">
                <h4>Profile</h4>
                <div className="file">
                    {/* onchange="previewFile()" */}
                    {/* src={photochange?image+currentCustomer.photo:photo} */}
                    <img id="profileImg" src={imagesrc} onClick={photoEdit} alt="profile photo" className="profileImg" />
                    <input id="file" onChange={profilePic} type="file" name="photo" className="userphoto" accept="image/png, image/gif, image/jpeg" />
                </div>

                <div className="nameDiv">
                    <span className="pe-2">Name :</span>
                    <input id="name" type="text" name="username" className="username" onChange={(event) => setCustomerName(event.target.value)} onBlur={nameOnblur} readOnly defaultValue={currentCustomer.customerName} />
                    <button className="btn edit" onClick={nameEdit} id="nameEdit"><i className="fa fa-pencil fs-5" aria-hidden="true" /></button>
                </div>
                <div >
                    <span className="pe-2">Email :</span>
                    <input id="email" type="text" name="email" className="useremail" onChange={(event) => setemail(event.target.value)} onBlur={emailOnblur} readOnly defaultValue={currentCustomer.email ? currentCustomer.email : "Update Your Email"} />
                    <button className="btn edit" onClick={emailEdit} id="emailEdit"><i className="fa fa-pencil fs-5" aria-hidden="true" /></button>
                </div>
                <div >
                    <span className="pe-2">Contact :</span>
                    <input type="text" name="contact" className="usercontact " readOnly Value={currentCustomer.contact} />
                    <button className=" btn edit"><i className="fa fa-pencil fs-5 contectBtn" aria-hidden="true" /></button>
                </div>
            </div>
            <div className="  px-3 mt-3 text-center">
                <Link className="btn btn-danger" onClick={signout} id="signout">Sign Out</Link>
                <button className="btn btn-success" type="submit" id="save" onClick={saveData}>Save</button>
            </div>
        </div>

    </>
}

export default CusotmerProfile;