import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState([]);

  // Add to Cart
  const handleAddToCart = async (car) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email, car }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.log(err);
      alert("Error adding to cart ❌");
    }
  };

  // Add to Wishlist
  const handleWishlist = async (car) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email, car }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  // Fetch cars from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.log("Error fetching cars:", err));
  }, []);

  // Filter based on search
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  const newArrivals = filteredCars.slice(0, 5);
  const recommended = filteredCars.slice(5, 10);
  const moreCars = filteredCars.slice(10, 15);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1493238792000-8113da705763")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "48px", fontWeight: "bold", letterSpacing: "2px" }}>
  Sri Sai Cars
</h1>
        <p>Trusted showroom for affordable cars</p>

        <input
          type="text"
          placeholder="Search cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "none",
          }}
        />
      </div>

      {/* CAR SECTIONS */}
      <div style={{ padding: "30px" }}>
        <h3>New Arrivals</h3>
        <CarGrid
          cars={newArrivals}
          handleWishlist={handleWishlist}
          handleAddToCart={handleAddToCart}
          navigate={navigate}
        />

        <h3 style={{ marginTop: "40px" }}>Recommended</h3>
        <CarGrid
          cars={recommended}
          handleWishlist={handleWishlist}
          handleAddToCart={handleAddToCart}
          navigate={navigate}
        />

        <h3 style={{ marginTop: "40px" }}>More Cars</h3>
        <CarGrid
          cars={moreCars}
          handleWishlist={handleWishlist}
          handleAddToCart={handleAddToCart}
          navigate={navigate}
        />
      </div>

      <Footer />
    </>
  );
}

// Car grid component
function CarGrid({ cars, handleWishlist, handleAddToCart, navigate }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
        marginTop: "20px",
      }}
    >
      {cars.map((car) => (
        <Card
          key={car._id || car.id}
          sx={{
            borderRadius: "20px",
            boxShadow: 3,
            overflow: "hidden",
            position: "relative",
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: 10,
            },
          }}
        >
          {/* Wishlist / Cart */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              gap: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            <span onClick={() => handleWishlist(car)}>❤️</span>
            <span onClick={() => handleAddToCart(car)}>🛒</span>
          </div>

          {/* Car image */}
          <CardMedia
            component="img"
            height="180"
            image={car.image} // ✅ use direct path from DB
            sx={{ objectFit: "contain", background: "#ede9d8", padding: "15px" }}
          />

          <CardContent>
            <Typography variant="h6">{car.name}</Typography>
            <Typography>⭐ {car.rating}</Typography>
            <Typography sx={{ fontWeight: "bold" }}>{car.price}</Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                marginTop: "10px",
                backgroundColor: "#0f172a",
                "&:hover": { backgroundColor: "#020617" },
              }}
              onClick={() => {
  console.log("CLICKED CAR:", car);  // 👈 add this
  navigate("/car", { state: car });
}}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Home;