import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  // 🔐 Check admin
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.email !== "admin@gmail.com") {
    navigate("/");
    return null;
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          background: "#0f172a",
          color: "white",
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Admin Dashboard ⚙️
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* 📦 BOOKINGS */}
          <Paper style={{ padding: "20px", width: "250px" }}>
            <Typography variant="h6">Bookings</Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ marginTop: "10px" }}
              onClick={() => navigate("/admin/bookings")}
            >
              View Bookings
            </Button>
          </Paper>

          {/* 📩 CONTACT */}
          <Paper style={{ padding: "20px", width: "250px" }}>
            <Typography variant="h6">Messages</Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ marginTop: "10px" }}
              onClick={() => navigate("/admin/messages")}
            >
              View Messages
            </Button>
          </Paper>

          {/* 🚗 CARS */}
          <Paper style={{ padding: "20px", width: "250px" }}>
            <Typography variant="h6">Cars</Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ marginTop: "10px" }}
              onClick={() => navigate("/admin/cars")}
            >
              Manage Cars
            </Button>
          </Paper>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Admin;