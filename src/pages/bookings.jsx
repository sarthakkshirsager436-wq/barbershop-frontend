import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function generateSlots(openingTime, closingTime) {
    const slots = [];

    // Convert "09:00 AM" -> Date object
    const start = new Date(`2000-01-01 ${openingTime}`);
    const end = new Date(`2000-01-01 ${closingTime}`);

    while (start < end) {
        let hours = start.getHours();
        let minutes = start.getMinutes();

        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;

        const formattedTime =
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")} ${ampm}`;

        slots.push(formattedTime);

        // Increase by 15 minutes
        start.setMinutes(start.getMinutes() + 15);
    }

    return slots;
}

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const { shopName, date, openingTime,closingTime } = location.state;

    

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.post(
                    "https://barbershop-backend-1-xb3t.onrender.com/api/available/bookings",
                    {
                        shopName,
                        date,
                    }
                );

                setBookings(res.data);
            } catch (err) {
                console.log(err.response);
    console.log(err.response?.data);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [shopName, date]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const allSlots=generateSlots(openingTime,closingTime);

    const bookedSet = new Set(bookings.map(b => b.time));

    const createBooking = async (slot) => {
    try {
        const response = await axios.post(
            "https://barbershop-backend-1-xb3t.onrender.com/api/available/createbookings",
            
            {
                shopName,
                date,
                time: slot
            }
        );

        toast.success("Booking Successful")

        console.log(response.data);

    } catch (error) {
        console.log(error.response?.data || error.message);
    }
};


    return (
        <div className="min-h-screen bg-purple-500">

            <div className="text-center text-white">
            <h1>Booking Page</h1>

            <h2>Shop: {shopName}</h2>
            <h3>Date: {date}</h3>

            <hr />

            </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {allSlots.map((slot) => (
        

    <div key={slot} className="flex flex-col justify-center items-center border-2 border-white
       p-2 rounded-2xl hover:border-green-500">
        <span>{slot}</span>

        {bookedSet.has(slot) ? (
            <button disabled>Booked</button>
        ) : (
            <button onClick={()=>createBooking(slot)} className="bg-amber-50 w-20 shadow-2xl 
            rounded-2xl transition-all duration-100 hover:w-30">Book</button>
        )}
    </div>
    ))}
</div>



            


        </div>
    );
}

export default Bookings;