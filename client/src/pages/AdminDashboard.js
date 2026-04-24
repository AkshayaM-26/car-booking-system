import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Typography, Button } from "@mui/material";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "40px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard ⚙️
        </Typography>

        <div style={{ marginTop: "30px" }}>
          <Link to="/admin/bookings">
            <Button variant="contained" sx={{ m: 2 }}>
              📦 Bookings
            </Button>
          </Link>

          <Link to="/admin/messages">
            <Button variant="contained" sx={{ m: 2 }}>
              📩 Messages
            </Button>
          </Link>

          <Link to="/admin/cars">
            <Button variant="contained" sx={{ m: 2 }}>
              🚗 Cars
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;