import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/cart_bg.jpg";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return navigate("/login");

    const user = JSON.parse(storedUser);

    fetch(`http://localhost:5000/api/cart/${user.email}`)
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const removeItem = async (carId) => {
  const user = JSON.parse(localStorage.getItem("user"));

  await fetch(`http://localhost:5000/api/cart/${user.email}/${carId}`, {
    method: "DELETE",
  });

  // 🔥 RE-FETCH from DB (IMPORTANT)
  fetch(`http://localhost:5000/api/cart/${user.email}`)
    .then((res) => res.json())
    .then((data) => setCart(data));
};

  // 💰 TOTAL
  const getTotal = () => {
    let total = 0;

    cart.forEach((item) => {
      if (item?.price) {
        const price = parseFloat(
          item.price.replace("₹", "").replace(" Lakh", "")
        );
        total += price;
      }
    });

    return total;
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
          padding: "30px",
          backgroundColor: "rgba(0,0,0,0.6)",
          backgroundBlendMode: "darken",
        }}
      >
        <Typography variant="h4" color="white" textAlign="center">
          Your Cart 🛒
        </Typography>

        {cart.length === 0 ? (
          <Typography sx={{ marginTop: "20px", color: "white", textAlign: "center" }}>
            Cart is empty 😢
          </Typography>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginTop: "30px",
              }}
            >
              {cart.map((car) => (
                <Card key={car.id} sx={{ borderRadius: "15px", boxShadow: 5 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={`/${car.image}`}   // ✅ FIXED
                    sx={{
                      objectFit: "contain",
                      background: "#f5f5f5",
                      padding: "10px",
                    }}
                  />

                  <CardContent>
                    <Typography variant="h6">{car.name}</Typography>
                    <Typography>{car.price}</Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      sx={{ marginTop: "10px" }}
                      onClick={() => removeItem(car.id || car._id)}
                    >
                      Remove ❌
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div style={{ marginTop: "40px", textAlign: "right" }}>
              <Typography variant="h6" color="white">
                Total: ₹ {getTotal()} Lakh
              </Typography>

              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: "10px" }}
                onClick={() => navigate("/checkout", { state: { cart } })}
              >
                Proceed to Checkout 🚀
              </Button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;