import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
 import Login from "./pages/Login";
 import Form from "./pages/Form";
 import ShopList from "./pages/ShopList";
 import Bookings from "./pages/bookings";
 import ProtectedRoutes from "./components/ProtectedRoutes";
 import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
<Route path="/login" element={<Login />} />

<Route
  path="/search"
  element={
    <ProtectedRoutes>
      <Form />
    </ProtectedRoutes>
  }
/>

<Route
  path="/Shoplist"
  element={
    <ProtectedRoutes>
      <ShopList />
    </ProtectedRoutes>
  }
/>

<Route
  path="/bookings"
  element={
    <ProtectedRoutes>
      <Bookings />
    </ProtectedRoutes>
  }
/>



      </Routes>

            <ToastContainer
            position="top-center"
    autoClose={3000}
    newestOnTop
    closeOnClick
    pauseOnHover
    theme="colored"

      />
      
    </BrowserRouter>

    
  );
}

export default App;