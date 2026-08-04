import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import fm2 from "../assets/filterimg.jpg"


function Form() {

    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        location: "",
        gender: "",
        date: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

            navigate(
        `/shoplist?location=${formData.location}&gender=${formData.gender}&date=${formData.date}`
    );





    };

    return (
        <div className="min-h-screen bg-green-300 flex flex-col justify-center items-center ">

            <div className="bg-green-200 w-80 rounded-t-2xl p-8 shadow-2xl">
             <h1 className="text-center font-thin text-2xl mb-5">Filters </h1>

            <form onSubmit={handleSubmit}>

                <input
                className="border-dotted border-2 mb-0.5"
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />

                <br />

                <input
                className="border-dotted border-2 mb-0.5"
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={formData.gender}
                    onChange={handleChange}
                />

                <br />

                <input
                className="border-dotted border-2 mb-0.5"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />

                <br />

                <button type="submit"  className="bg-green-600 text-white rounded-2xl w-40 block mx-auto mt-4 hover:bg-green-700">
                    Search
                </button>

            </form>
            </div>

            <img src={fm2} alt=""  className=" w-90 rounded-b-2xl shadow-2xl"/>
            

        </div>
    );
}

export default Form;