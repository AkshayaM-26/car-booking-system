import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  useEffect(() => {
    fetch("http://localhost:5000/api/booking")
      .then((res) => res.json())
      .then((data) => {
        console.log("BOOKINGS:", data); // debug
        setBookings(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete booking
  const deleteBooking = async (id) => {
    await fetch(`http://localhost:5000/api/booking/${id}`, {
      method: "DELETE",
    });

    setBookings(bookings.filter((b) => b._id !== id));
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>All Bookings</h2>

        {bookings.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            {/* 👤 USER DETAILS */}
            <p><strong>Name:</strong> {b.name}</p>
            <p><strong>Email:</strong> {b.email}</p>

            {/* 🚗 CAR DETAILS */}
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {b.cart && b.cart.length > 0 ? (
                b.cart.map((car, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    <img
                      src={`/ ${car.image}`.replace(" ", "")}
                      alt={car.name}
                      width="120"
                      height="80"
                      style={{ objectFit: "contain" }}
                    />
                    <p>{car.name}</p>
                  </div>
                ))
              ) : b.cars && b.cars.length > 0 ? (
                b.cars.map((car, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    <img
                      src={`/ ${car.image}`.replace(" ", "")}
                      alt={car.name}
                      width="120"
                      height="80"
                      style={{ objectFit: "contain" }}
                    />
                    <p>{car.name}</p>
                  </div>
                ))
              ) : (
                <p>No cars booked</p>
              )}
            </div>

            {/* ❌ DELETE */}
            <button
              onClick={() => deleteBooking(b._id)}
              style={{
                marginTop: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Delete Booking
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default AdminBookings;