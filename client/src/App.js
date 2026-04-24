import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ ADD THIS
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminMessages from "./pages/AdminMessages";
import AdminCars from "./pages/AdminCars";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ ADD */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/car" element={<CarDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
       // <Route path="/booking" element={<MyBookings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        //<Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/cars" element={<AdminCars />} />
      </Routes>
    </Router>
  );
}

export default App;