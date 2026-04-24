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

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // 🔥 LOAD WISHLIST
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return navigate("/login");

    const user = JSON.parse(storedUser);

    fetch(`http://localhost:5000/api/wishlist/${user.email}`)
      .then((res) => res.json())
      .then((data) => setWishlist(data))
      .catch((err) => console.log("Error fetching wishlist:", err));
  }, [navigate]);

  const removeItem = async (carId) => {
  const user = JSON.parse(localStorage.getItem("user"));

  await fetch(`http://localhost:5000/api/wishlist/${user.email}/${carId}`, {
    method: "DELETE",
  });

  // 🔥 RE-FETCH (IMPORTANT)
  fetch(`http://localhost:5000/api/wishlist/${user.email}`)
    .then((res) => res.json())
    .then((data) => setWishlist(data));
};

  // 🛒 MOVE TO CART
  const addToCart = (car) => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: user.email,   // ✅ FIXED
        car: car,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        removeItem(car.id);
      })
      .catch((err) => console.log(err));
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
        <Typography variant="h4" textAlign="center" color="white">
          My Wishlist ❤️
        </Typography>

        {wishlist.length === 0 ? (
          <Typography sx={{ marginTop: "20px", textAlign: "center", color: "white" }}>
            No cars in wishlist 😢
          </Typography>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            {wishlist.map((car) => (
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
                  <Typography sx={{ marginTop: "5px", fontWeight: "bold" }}>
                    {car.price}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: "10px", background: "#0f172a" }}
                    onClick={() => addToCart(car)}
                  >
                    Move to Cart 🛒
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ marginTop: "10px" }}
                    onClick={() => removeItem(car.id ||  car._id)}
                  >
                    Remove ❌
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;