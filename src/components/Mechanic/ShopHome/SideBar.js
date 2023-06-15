import { useEffect, useState } from 'react';
import './Sidebar.css'

import api from '../../../WebApi/api';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
// import Dashboard from '../dashboard/dashboard';
// import Shop from '../shopList/shopList';
// import Customer from './customerList/customer';
// import Mechanic from './mechanicList/mechanic';
// import Shopkeeper from './ShopkeeperList/shopkeeper';

function Sidebar() {
  const [menu, setMenu] = useState("dashboard");

  const changeMenu = (currentMenu) => {
    setMenu(currentMenu)
  }
  return <>

    <>
      <Navbar/>

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
                <i className="fa fa-home fa-2x faMechanic" />
                <span className="nav-text">Dashboard</span>
              </a>
            </li>

            <li>
              <a onClick={() => changeMenu("customer")}>
              <i class="fa fa-bell fa-2x faMechanic" aria-hidden="true" />
                <span className="nav-text">Request</span>
              </a>
            </li>
            <li>
              <Link to="/mechanicHistory">
                <i className="fa fa-history fa-2x faMechanic" />
                <span className="nav-text">History</span>
              </Link>
            </li>
          </ul>
          <ul className="logout">
            <li>
              <a href="#">
                <i className="fa fa-power-off fa-2x faMechanic" />
                <span className="nav-text">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </>


      {/* {menu == "shop" && <Shop />}
      {menu == "dashboard" && <Dashboard />}
      {menu == "customer" && <Customer />}
      {menu == "mechanic" && <Mechanic />}
      {menu == "shopkeeper" && <Shopkeeper />} */}
    </>


  </>
}
export default Sidebar;