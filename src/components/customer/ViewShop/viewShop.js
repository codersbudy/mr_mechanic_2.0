import { useSelector } from 'react-redux';
import './viewShop.css'
// import CustomerNavigation from '../Navigation/navigation';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';

function ViewShop() {
    console.log("haooooo")
    const {shopList}=useSelector(state=>state.shop);
    const state=useLocation();
    let index=state.state.index;
    console.log(shopList);
    console.log(index);
    let shop=shopList.shop[index];
    

    return <>
       <Navbar/>
        <div className="container-fluid outerContainer">
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8  outerDiv'>
                    <div className='imageDiv'>
                        <img src={shop.photo} class="img-fluid image" alt="..." />
                    </div>
                    <div className='row p-4'>
                        <div className='col-6' >
                            <div className='row' >
                                <div className='col-md-4 head'>Shop Name</div>
                                <div className='col-md-8 sm-12'>{shop.shopName}</div>
                            </div>
                        </div>
                        <div className='col-6' >
                            <div className='row'>
                                <div className='col-md-4 head'>Contact</div>
                                <div className='col-md-8 sm-12'>{shop.contact}</div>
                            </div></div>
                    </div>
                    <div className='row p-4' >
                        <div className='col-6' style={{ backgroundColor: "white" }}>
                            <div className='row'>
                                <div className='col-md-4 head'>Address</div>
                                <div className='col-md-8 sm-12'>{shop.address}</div>
                            </div>
                        </div>
                        <div className='col-6' style={{ backgroundColor: "white" }}>
                            <div className='row'>
                                <div className='col-md-4 head'>Type</div>
                                <div className='col-md-8 sm-12'>{shop.shopName}</div>
                            </div>
                        </div>
                    </div>
                    <div className='row p-4' >
                        <div className='col-6' style={{ backgroundColor: "white" }}>
                            <div className='row'>
                                <div className='col-md-4 head'>Rating</div>
                                <div className='col-md-8 sm-12'>{shop.rating}</div>
                            </div>
                        </div>
                        <div className='col-6' style={{ backgroundColor: "white" }}>
                            <div className='row'>
                                <div className='col-md-4 head'>Email</div>
                                <div className='col-md-8 sm-12'>{shop.shopName}</div>
                            </div>
                        </div>
                    </div>
                    <div className='row p-4' >
                        <div className='col-6'>
                            <Link to="/customerEditProfile" className="btn" id="btn">Request</Link>
                        </div>
                        <div className='col-6 backDiv' >
                            <Link to="/customerHome" className="btn back margin-right-2" id="btn" ><i class="fa fa-arrow-left" aria-hidden="true"></i>Back</Link>
                        </div>

                    </div>


                </div>
            </div>

        </div>

        <div>

        </div>
    </>
}

export default ViewShop;