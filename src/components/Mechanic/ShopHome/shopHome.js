
import { useEffect, useState } from 'react';
import './Dashbord.css'
import Sidebar from './SideBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../../WebApi/api';

function MechanicHome() {
    const [mechanicRating, setMechanicRating] = useState("0");
    const { currentMechanic } = useSelector(state => state.mechanic);
    const { mechanicBookingHistory } = useSelector(state => state.mechanic);
    const [possitiveRating, setPossitiveRating] = useState(null);
    const [negativeRating, setNegetiveRating] = useState(null);

    function calculateCurrentDayStats() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const dailyBookings = mechanicBookingHistory.filter(booking => booking.date === formattedDate);

        if (dailyBookings.length === 0) {
            return {
                date: formattedDate,
                bookings: 1,
                earnings: 12
            };
        }

        const dailyEarnings = dailyBookings.reduce((total, booking) => {
            const billAmount = parseFloat(booking.billAmount);
            if (!isNaN(billAmount)) {
                return total + billAmount;
            } else {
                return total;
            }
        }, 0);

        return {
            date: formattedDate,
            bookings: dailyBookings.length,
            earnings: dailyEarnings
        };
    }

    // booking and earning usage
    const currentDayStats = calculateCurrentDayStats();

    useEffect(() => {

        const fetchMechanicRating = async () => {
            try {
                const response = await axios.post(api.MECHANIC_RATING, { mechanicId: "647492f6b17b8642e9326d5a" });
                const rating = response.data; // Assuming the rating value is directly returned in the response data
                setMechanicRating(rating);
                let posCount = 0;
                let negCount = 0;

                for (let i = 0; i < rating.rating.length; i++) {
                    if (rating.rating[i].rating > 3)
                        posCount++;
                    else
                        negCount++;
                }

                const positivePercentage = Math.floor((posCount * 100) / rating.rating.length);
                const negativePercentage = Math.floor((negCount * 100) / rating.rating.length);

                setPossitiveRating(positivePercentage > 50 ? positivePercentage + 1 : positivePercentage);
                setNegetiveRating(negativePercentage > 50 ? negativePercentage + 1 : negativePercentage);

            } catch (error) {

            }
        };
        fetchMechanicRating();
    }, []);

    return <>
        <Sidebar />
        <div className='dashboard' style={{ marginTop: "7vw" }}>
            <div className="col-md-10 ">
                <div className="row ">
                    <div className='col-1' style={{ marginLeft: "3vw" }}></div>
                    <div className="col-xl-5 col-lg-6 " style={{ cursor: "pointer" }}>
                        <div className="card l-bg-cherry boxMechanic">
                            <div className="card-statistic-3 p-4" >
                                <div className="card-icon card-icon-large">
                                    {/* <i className="	fas fa-bus-alt" /> */}
                                </div>
                                <div className="mb-4">
                                    <h5 className="card-title mb-0" >All Requests</h5>
                                </div>
                                <div className="row align-items-center mb-2 d-flex">
                                    <div className="col-8">
                                        <h2 className="d-flex align-items-center mb-0">{currentDayStats.bookings}</h2>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col-xl-5 col-lg-6" style={{ cursor: "pointer", marginLeft: "3vw" }} >
                        <div className="card l-bg-blue-dark boxMechanic">
                            <div className="card-statistic-3 p-4">
                                <div className="card-icon card-icon-large">
                                    {/* <i className="fas fa-users" /> */}
                                </div>
                                <div className="mb-4">
                                    <h5 className="card-title mb-0">Our Mechanics</h5>
                                </div>
                                <div className="row align-items-center mb-2 d-flex">
                                    <div className="col-8">
                                        <h2 className="d-flex align-items-center mb-0">₹ &nbsp;{currentDayStats.earnings}</h2>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row'>
                    <div className='col-1' style={{ marginLeft: "3vw" }}></div>

                    <div className="col-xl-5 col-lg-6" style={{ cursor: "pointer" }} >
                        <div className="card l-bg-green-dark boxMechanic">
                            <div className="card-statistic-3 p-4">
                                <div className="card-icon card-icon-large">
                                    {/* <i className="fas fa-cogs" /> */}
                                </div>
                                <div className="mb-4">
                                    <h5 className="card-title mb-0">Possitive Rating</h5>
                                </div>
                                <div className="row align-items-center mb-2 d-flex">
                                    <div className="col-8">
                                        <h2 className="d-flex align-items-center mb-0">{possitiveRating}&nbsp;%</h2>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="col-xl-5 col-lg-6" style={{ cursor: "pointer", marginLeft: "3vw" }} >
                        <div className="card l-bg-orange-dark boxMechanic">
                            <div className="card-statistic-3 p-4">
                                <div className="card-icon card-icon-large">
                                    {/* <i className="fas fa-cogs" /> */}
                                </div>
                                <div className="mb-4">
                                    <h5 className="card-title mb-0">Negative Rating</h5>
                                </div>
                                <div className="row align-items-center mb-2 d-flex">
                                    <div className="col-8">
                                        <h2 className="d-flex align-items-center mb-0">{negativeRating}&nbsp;%</h2>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-1'></div>
                </div>

            </div>

        </div >
    </>
}

export default MechanicHome;