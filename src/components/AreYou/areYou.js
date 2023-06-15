import { useNavigate } from 'react-router-dom'
import './areYou.css'
export default function AreYou() {
  const navigate = useNavigate();

  const shopSignin = () => {
    alert("chal gya")
    navigate("/shopkeeperSigninSignup");
  }
  return <>
    <div
      className="main-banner wow fadeIn"
      id="top"
      data-wow-duration="1s"
      data-wow-delay="0.5s"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-8 align-self-center">
                <div
                  className="left-content"
                  data-wow-duration="1s"
                  data-wow-delay="1s"
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <h2>Are You <span style={{ color: "#42C8B7" }}>Shopkeeper</span> ?</h2>
                      <p>
                        Chain App Dev is an app landing page HTML5 template based on
                        Bootstrap v5.1.3 CSS layout provided by TemplateMo, a great
                        website to download free CSS templates.
                      </p>
                    </div>
                    <div className="col-lg-12">
                      <button className="btn btn-info cbtn" onClick={shopSignin}>Join Now</button>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">

                <div
                  className="right-image wow fadeInRight"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <img src="images/pngwing.com.png" width={290} height={290} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </>
}