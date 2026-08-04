import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import barberImage from "../assets/images.jpg";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password  || !formData.name) {
    toast.warning("Please fill all fields.");
    return;
}

    try{
        const response = await axios.post("https://barbershop-backend-1-xb3t.onrender.com/api/auth/register", formData);
        toast.success("Registered successfully!");

        console.log(response.data);

    }catch (err) {

      toast.error("Registration failed");
      
  console.log(err.response.data);
}
}

  return (
    <div className="min-h-screen bg-yellow-200 flex items-center justify-center">

      <div className="bg-amber-100 p-8 rounded-l-3xl shadow-2xl  w-96">

              <h1 className="text-3xl font-thin mb-6 text-center ">Register</h1>

      <form onSubmit={handleSubmit} >

        <input className="border-2 border-dotted "
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        <input className="border-2 border-dotted "
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <input className="border-2 border-dotted "
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit"   className="block mx-auto bg-yellow-600 text-white px-4 py-1 rounded-2xl hover:bg-yellow-700 "
>
          Register
        </button>

      </form>

          <p>
           . 
          <Link to="/login" className="text-blue-700 hover:underline" >login</Link>
         </p> 
      </div>

      <img

  src={barberImage}
  alt="Barber"
  className="w-96 rounded-r-2xl shadow-2xl"
/>

    </div>
  );
}

export default Register;