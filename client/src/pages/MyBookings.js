import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 FETCH BOOKINGS
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(storedUser);

        const res = await fetch(
          `http://localhost:5000/api/booking/${user.email}`
        );

        const data = await res.json();

        console.log("BOOKINGS DATA:", data);

        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.log("Error fetching bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  // ❌ CANCEL BOOKING
  const removeBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/booking/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      alert(data.message);

      // 🔥 UPDATE UI
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
          backgroundColor: "rgba(0,0,0,0.7)",
          backgroundBlendMode: "darken",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          My Bookings 📦
        </Typography>

        {/* 🔄 LOADING */}
        {loading ? (
          <Typography sx={{ color: "white", textAlign: "center" }}>
            Loading bookings...
          </Typography>
        ) : bookings.length === 0 ? (
          /* ❌ EMPTY */
          <Typography sx={{ color: "white", textAlign: "center" }}>
            No bookings yet 😢
          </Typography>
        ) : (
          /* ✅ BOOKINGS LIST */
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
            }}
          >
            {bookings.map((b) => (
              <Card
                key={b._id}
                sx={{
                  borderRadius: "20px",
                  boxShadow: 5,
                  background: "#ffffffee",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{b.name}</Typography>
                  <Typography>📧 {b.email}</Typography>
                  <Typography>📞 {b.phone}</Typography>
                  <Typography>📍 {b.address}</Typography>

                  <Typography
                    sx={{
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Cars:
                  </Typography>

                  {b.cars && b.cars.length > 0 ? (
                    b.cars.map((car, i) => (
                      <div key={i}>
                        <Typography>🚗 {car.name}</Typography>
                        <Typography>💰 {car.price}</Typography>
                      </div>
                    ))
                  ) : (
                    <Typography>No cars found</Typography>
                  )}

                  {/* ❌ CANCEL BUTTON */}
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ marginTop: "15px" }}
                    onClick={() => removeBooking(b._id)}
                  >
                    Cancel Booking ❌
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

export default MyBookings;