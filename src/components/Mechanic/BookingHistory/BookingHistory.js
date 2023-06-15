import { useSelector } from 'react-redux';
import Navbar from '../../navbar/Navbar';
import './BookingHistory.css'

function MechanicBookingHistory() {
  const { mechanicBookingHistory } = useSelector(state => state.mechanic);

  return (
    <>
      <Navbar />
      <div className='outerDiv'>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Problem</th>
              <th>Address</th>
              <th>Bill Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mechanicBookingHistory.map(history => (
              <tr key={history._id}>
                <td>{history.date}</td>
                <td>{history.customerId.customerName}</td>
                <td>{history.problem}</td>
                <td>{history.location}</td>
                <td>{history.billAmount}</td>
                <td className={history.status === 'pending' ? 'status-pending' : 'status-resolved'}>
                  {history.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MechanicBookingHistory;
