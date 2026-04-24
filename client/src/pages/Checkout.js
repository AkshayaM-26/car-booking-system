import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/cart_bg.jpg";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // 🔥 Auto-fill user data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    setForm({
      name: user.name,
      email: user.email,
      phone: "",
      address: "",
    });
  }, [navigate]);

  // 🔄 Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 Booking
  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 🔥 GET CART FROM DB
    const resCart = await fetch(
      `http://localhost:5000/api/cart/${storedUser.email}`
    );
    const cart = await resCart.json();

    if (!cart || cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          cart: cart,
        }),
      });

      const data = await res.json();
      console.log("Booking response:", data);

      // ✅ SIMPLE SUCCESS CHECK
      if (res.ok) {
        alert("Booking successful ✅");

        // 🔥 OPTIONAL: clear cart in DB
        await fetch(
          `http://localhost:5000/api/cart/${storedUser.email}/clear`,
          { method: "DELETE" }
        );

        navigate("/");
      } else {
        alert("Booking failed ❌");
      }
    } catch (err) {
      console.log(err);
      alert("Booking failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={10}
          style={{
            padding: "30px",
            width: "400px",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h5" textAlign="center" gutterBottom>
            Checkout 🧾
          </Typography>

          <TextField
            fullWidth
            label="Name"
            value={form.name}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Email"
            value={form.email}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: "20px",
              backgroundColor: "#0f172a",
            }}
            onClick={handleSubmit}
          >
            Confirm Booking 🚀
          </Button>
        </Paper>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;