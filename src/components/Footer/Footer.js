function Footer() {

    return <>
           <div className="container-fluid footer m-0 border-top justify-align-center ">

            <div className="row d ff ">

                <div className="col-sm-12 col-md-3 col-lg-3 mb-5 ">
                    <div><img className="flogo" src="./images/logo.png" alt="logo" />
                    </div>
                </div>

                <div className="col-sm-12 col-md-3 col-lg-3 text-center mb-5">
                    <div className="fhead">Help & Support</div>
                    <div>FAQ</div>
                    <div>Contact Us</div>
                    <div>More</div>
                </div>



                <div className="col-sm-12 col-md-3 col-lg-3 text-center mb-5 ">
                    <div className="fhead">More Info</div>
                    <div>Terms & Conditions</div>
                    <div>Privacy Policy</div>
                    <div>Terms of Use</div>

                </div>
                <div className="col-sm-12 col-md-3 col-lg-3 text-center mb-5">
                    <div className="fhead">Follow Us</div>
                    <div>
                        <img src="/images/twitter.svg" alt="twitter" />
                        <img src="/images/facebook.svg" alt="facebook" />
                        <img src="/images/instagram.svg" alt="insta" />
                        <img src="/images/youtube.svg" alt="youtube" />
                    </div>
                    <div className="btn btn-info fbtn">chat</div>

                </div>
            </div>

        </div>
        <div className="container-fluid border-bottom  Copyright">
            Copyright © 2023 Mr Mechanic | Designed by Coders-Hub
        </div>
    </>
}

export default Footer;