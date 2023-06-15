import { useEffect, useState } from 'react';
import './dashboard.css'
import api from '../../../WebApi/api';
import axios from 'axios';
import Shop from '../shopList/shopList';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Dashboard() {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const [count, setCount] = useState({});

  useEffect(() => {
    let response = axios.get(api.ADMIN_APP_PERFORMANCE);
    response.then((result) => {
      // console.log(result);
      setCount(result.data.count);
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  const list = (route) => {
    navigate(route)
  }
  return <>
    <div className='dashboard'>
      <div className="col-md-10 ">
        <div className="row ">
          <div className="col-xl-3 col-lg-6" style={{ cursor: "pointer" }} onClick={() => list("/shopList")}>
            <div className="card l-bg-cherry">
              <div className="card-statistic-3 p-4" >
                <div className="card-icon card-icon-large">
                  <i className="	fas fa-bus-alt" />
                </div>
                <div className="mb-4">
                  <h5 className="card-title mb-0" >Shops</h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">{count.shop}+</h2>
                  </div>
                  <div className="col-4 text-right">
                    <span>
                      12.5% <i className="fa fa-arrow-up" />
                    </span>
                  </div>
                </div>
                <div
                  className="progress mt-1 "
                  data-height={8}
                  style={{ height: 8 }}
                >
                  <div
                    className="progress-bar l-bg-cyan"
                    role="progressbar"
                    data-width="25%"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "25%" }}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="col-xl-3 col-lg-6" style={{ cursor: "pointer" }} onClick={() => list("/shopkeeperList")}>
            <div className="card l-bg-blue-dark">
              <div className="card-statistic-3 p-4">
                <div className="card-icon card-icon-large">
                  <i className="fas fa-users" />
                </div>
                <div className="mb-4">
                  <h5 className="card-title mb-0">Shopkeepers</h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">{count.shopkeeper}+</h2>
                  </div>
                  <div className="col-4 text-right">
                    <span>
                      9.23% <i className="fa fa-arrow-up" />
                    </span>
                  </div>
                </div>
                <div
                  className="progress mt-1 "
                  data-height={8}
                  style={{ height: 8 }}
                >
                  <div
                    className="progress-bar l-bg-green"
                    role="progressbar"
                    data-width="25%"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "25%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6" style={{ cursor: "pointer" }} onClick={() => list("/customerList")}>
            <div className="card l-bg-green-dark">
              <div className="card-statistic-3 p-4">
                <div className="card-icon card-icon-large">
                  <i className="fas fa-user-tie" />
                </div>
                <div className="mb-4">
                  <h5 className="card-title mb-0">Customer</h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">{count.customer}+</h2>
                  </div>
                  <div className="col-4 text-right">
                    <span>
                      10% <i className="fa fa-arrow-up" />
                    </span>
                  </div>
                </div>
                <div
                  className="progress mt-1 "
                  data-height={8}
                  style={{ height: 8 }}
                >
                  <div
                    className="progress-bar l-bg-orange"
                    role="progressbar"
                    data-width="25%"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "25%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6" style={{ cursor: "pointer" }} onClick={() => list("/mechanicList")}>
            <div className="card l-bg-orange-dark">
              <div className="card-statistic-3 p-4">
                <div className="card-icon card-icon-large">
                  <i className="fas fa-cogs" />
                </div>
                <div className="mb-4">
                  <h5 className="card-title mb-0">Mechanics</h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">{count.mechanic}+</h2>
                  </div>
                  <div className="col-4 text-right">
                    <span>
                      2.5% <i className="fa fa-arrow-up" />
                    </span>
                  </div>
                </div>
                <div
                  className="progress mt-1 "
                  data-height={8}
                  style={{ height: 8 }}
                >
                  <div
                    className="progress-bar l-bg-cyan"
                    role="progressbar"
                    data-width="25%"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "25%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='col-md-10 row'>
        <h3 className='mb-5 mt-5'>Monthly Growth</h3>
        <div className='col-md-3'>
          <div className="cardMonth">
            <div className="card_load">
              <img src='images/whiteBg1.jpg' />
            </div>
            <div className="card_load_extreme_title">Shop</div>
            <div className="card_load_extreme_descripion"></div>
          </div>

        </div>
        <div className='col-md-3'>
          <div className="cardMonth">
            <div className="card_load" />
            <div className="card_load_extreme_title" />
            <div className="card_load_extreme_descripion" />
          </div>

        </div>
        <div className='col-md-3'>
          <div className="cardMonth">
            <div className="card_load" />
            <div className="card_load_extreme_title" />
            <div className="card_load_extreme_descripion" />
          </div>

        </div>
        <div className='col-md-3'>
          <div className="cardMonth">
            <div className="card_load" />
            <div className="card_load_extreme_title" />
            <div className="card_load_extreme_descripion" />
          </div>

        </div>
      </div> */}
    </div>
  </>
}
export default Dashboard;