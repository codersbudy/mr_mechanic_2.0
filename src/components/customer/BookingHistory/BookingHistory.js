import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import CustomerNavigation from "../Navigation/navigation";
import axios from "axios";
import api from "../../../WebApi/api";
import { setCustomerBookingHistory } from "../../../redux-config/customerSlice";
import './BookingHistory.css'
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import { createContext } from "react";
function CustomerBookingHistory() {
  const [index, setIndex] = useState("");
  const { currentCustomer } = useSelector(state => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadHistory = async () => {
    let customerId = currentCustomer._id;
    let response = await axios.post(api.CUSTOMER_BOOKING_HISTORY, { customerId });
    dispatch(setCustomerBookingHistory(response.data.result));
  }
  const { customerBookingHistory } = useSelector(state => state.customer);

  useEffect(() => {
    loadHistory();
  }, []);


  function getIndex(id) {
    setIndex(id);
    navigate("/viewBookingHistory", {
      state: {
        id: id
      }
    });
  }

  return <>
    <Navbar />
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Shop Name</th>
            <th>Problem</th>
            <th>Contact</th>
            <th>Bill</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {customerBookingHistory.map((history, index) => <tr>
            <td className="srNumber">{index + 1} </td>
            <td>{history.shopName}</td>
            <td>{history.problem}</td>
            <td>{history.contact}</td>
            <td>{history.billAmmount}</td>
            <td>{history.date}</td>
            <td><button className="btn view" onClick={() => getIndex(index)}>View</button></td>
          </tr>)}

        </tbody>

      </table>
    </div>
  </>
}

export default CustomerBookingHistory;
