import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginim from "../assets/loginimg.jpg"

import axios from "axios";
import { toast } from "react-toastify";


function Login() {
  const navigate=useNavigate();

  const[formData,setFormData]=useState({

    email:"",
    password:"",
  });

    const handleChange=(e)=>{
      setFormData({

        ...formData,
        [e.target.name]:e.target.value,
      });
    }

const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if (!formData.email || !formData.password) {
    toast.warning("Please fill all fields.");
    return;
}
        const response = await axios.post("https://barbershop-backend-1-xb3t.onrender.com/api/auth/login", formData);
        localStorage.setItem("token", response.data.token);

        toast.success("Login successful!");



        navigate("/search");

        console.log(response.data);

    }catch (err) {
              toast.error("login Faild");
  console.log(err.response.data);
}
}



  return (

    <div className="min-h-screen bg-blue-400 flex items-center justify-center ">

      <img
      
        src={loginim}
        alt="Barber"
        className="w-96 h-75 rounded-l-3xl  shadow-2xl "
      />

      <div className="bg-blue-200 p-8 rounded-r-2xl shadow-2xl w-70 ">
        <h1 className="text-2xl font-thin mb-6  text-center"> Login  </h1>

      <form onSubmit={handleSubmit}>

        <input
        className="border-2 border-dotted mb-0.5"
        
        type="email"
        name="email"
        placeholder="enter email.."
        value={formData.email}
        onChange={handleChange}

         />

         <br />

         <input
         className="border-2 border-dotted mb-0.5"
         
         type="password"
        name="password"
        placeholder="enter password.."
        value={formData.password}
        onChange={handleChange}

         />

         <br />

         <button type="submit"  className="block mx-auto bg-blue-600 text-white w-20 mt-5 rounded-2xl h-10 hover:bg-blue-700">
          login
         </button>

         
      </form>

      </div>

      
    </div>
  );
}

export default Login;