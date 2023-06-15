import { useEffect, useState } from 'react';
// import './adminHome.css'

import api from '../../../WebApi/api';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
import Dashboard from '../dashboard/dashboard';
import Shop from '../shopList/shopList';
import Customer from './customerList/customer';
import Mechanic from './mechanicList/mechanic';
import Shopkeeper from './ShopkeeperList/shopkeeper';

function AdminHome() {
  const [menu, setMenu] = useState("dashboard");

  const changeMenu = (currentMenu) => {
    setMenu(currentMenu)
  }
  return <>

    <>
      <Navbar />

      {/* Sidebar */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
        integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
        crossOrigin="anonymous"
      />
      <>
        <div className="area" />
        <nav className="main-menu">
          <ul>
            <li>
              <a onClick={() => changeMenu("dashboard")} >
                <i className="fa-n fa fa-home fa-2x" />
                <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li className="has-subnav">
              <a onClick={() => changeMenu("shop")}>
                <i className="fa-n fa fa-globe fa-2x" />
                <span className="nav-text">Shops</span>
              </a>
            </li>
            <li className="has-subnav">
              <a onClick={() => changeMenu("shopkeeper")} >
                <i className="fa-n fa fa-user-friends fa-2x" />
                <span className="nav-text">Shopkeepers</span>
              </a>
            </li>
            <li className="has-subnav">
              <a onClick={() => changeMenu("mechanic")}>
                <i className="fa-n fa fa-cogs fa-2x" />
                <span className="nav-text">Mechanics</span>
              </a>
            </li>
            <li>
              <a onClick={() => changeMenu("customer")}>
                <i className="fa-n fa  fa-user-tie fa-2x" />
                <span className="nav-text">Custemers</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-n fa fa-book fa-2x" />
                <span className="nav-text">Bookings</span>
              </a>
            </li>

            <li>
              <a href="#">
                <i className="fa-n fa fa-map-marker fa-2x" />
                <span className="nav-text">Shop Map</span>
              </a>
            </li>

          </ul>
          <ul className="logout">
            <li>
              <a href="#">
                <i className="fa-n fa fa-power-off fa-2x" />
                <span className="nav-text">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </>


      {menu == "shop" && <Shop />}
      {menu == "dashboard" && <Dashboard />}
      {menu == "customer" && <Customer />}
      {menu == "mechanic" && <Mechanic />}
      {menu == "shopkeeper" && <Shopkeeper />}
    </>


  </>
}
export default AdminHome;