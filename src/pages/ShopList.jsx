import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShopList() {
    const navigate=useNavigate();

    const [shops, setShops] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();

    const location = searchParams.get("location");
    const gender = searchParams.get("gender");
    const date = searchParams.get("date");

    const handleBooking = (shopName, date,openingTime,closingTime) => {
    navigate("/bookings", {
        state: {
            shopName,
            date,
            openingTime,
            closingTime

        }
    });
  };
    
    

    useEffect(() => {

        const fetchShops = async () => {

            try {

                const res = await axios.post(
                    "https://barbershop-backend-1-xb3t.onrender.com/api/shops/search",
                    {
                        location,
                        gender,
                        
                    }
                );

                setShops(res.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }
        };

        fetchShops();

    }, [location,gender]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (

        <div  className="min-h-screen bg-pink-300  ">

            <h1 className="text-4xl font-thin mb-5 text-center underline">Available Shops</h1>

            <div className="ml-[15%]">
                 {shops.length === 0 ? (

                <h2>No Shops Found</h2>

            ) : (

                shops.map((shop) => (

                    <div
                        key={shop._id}
                       
                        className=" w-80 h-80 bg-pink-200 text-center border-4 
                        border-double p-8  m-2 rounded-2xl shadow-2xl transition-all duration-100  hover:w-90  "
                    >

                        <h2 className="text-pink-800 text-3xl underline ">{shop.shopName}</h2>

                        <p>Owner : {shop.owner}</p>

                        <p>Location : {shop.location}</p>

                        <p>Gender : {shop.gender}</p>

                        <p>Address : {shop.address}</p>

                        <p>Phone : {shop.phone}</p>

                        <p>
                            Timing :
                            {shop.openingTime}
                            -
                            {shop.closingTime}
                        </p>

                        <p>Rating : {shop.rating}</p>

                        <button onClick={()=>handleBooking(shop.shopName,date,shop.openingTime,shop.closingTime)}
                          className="bg-pink-400 text-white w-40 h-10 m-2 rounded-2xl shadow-2xl hover:bg-pink-500"  >
                            Book now
                        </button>

                    </div>

                ))

            )}
            </div>



        </div>

    );
}

export default ShopList;