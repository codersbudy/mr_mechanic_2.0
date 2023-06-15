import { Link, useLocation } from "react-router-dom";
// import './viewShopDetails.css'
function ViewShopDetails() {
  const { state } = useLocation();
  var shop = state.shop;
  console.log(shop);
  return <>
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="card-n">
            <div className="row">
              <div className="col-md-6  p-4 img-n">
                <div className="">
                  <img src={shop.photo} height={350} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-n p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-long-arrow-left" />
                      <span className="ml-1">Back</span>
                    </div>
                    <i className="fa fa-user text-muted" />
                  </div>
                  <div className="mt-4 mb-3">
                    <span className="text-uppercase text-muted brand">
                      Shop
                    </span>
                    <h5 className="text-uppercase">{shop.shopName}</h5>
                    <div className="price d-flex flex-row align-items-center">

                      <ul className="list-unstyled d-flex justify-content-between ratings">
                        <li>
                          <i className="text-warning fa fa-star" />
                        </li>
                        <li>
                          <i className="text-warning fa fa-star" />
                        </li>
                        <li>
                          <i className="text-warning fa fa-star" />
                        </li>
                        <li>
                          <i className="text-warning fa fa-star" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h6 className="text-uppercase">Address</h6>
                  <p className="about">{shop.address}</p>
                  <div className="row">
                    <div className="col-6">
                      <div className="sizes mt-1">
                        <h6 className="text-uppercase">Contact</h6>
                        <p className="about">{shop.contact}</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="sizes mt-1">
                        <h6 className="text-uppercase">Status</h6>
                        <p className="about">{shop.shopStatus}</p>
                      </div>
                    </div>
                  </div>
                  <div className="cart-n mt-4 align-items-center">
                    <button className="btn btn-info text-uppercase mr-2 px-4">
                      Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
}
export default ViewShopDetails;