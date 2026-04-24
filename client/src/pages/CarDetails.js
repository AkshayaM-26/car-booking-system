import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function CarDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("CAR DATA:", location.state);
  const car = location.state;

  // ❌ If no data
  if (!car) {
    return (
      <>
        <Navbar />
        <Typography sx={{ textAlign: "center", marginTop: "50px" }}>
          No Car Found ❌
        </Typography>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
        <Card sx={{ borderRadius: "20px", boxShadow: 5 }}>

          {/* 🚗 IMAGE */}
          <CardMedia
            component="img"
            height="400"
            image={`/${car.image}`}   // ✅ IMPORTANT FIX
            sx={{ objectFit: "contain", background: "#f5f5f5" }}
          />

          <CardContent>
            {/* NAME */}
            <Typography variant="h4">{car.name}</Typography>

            {/* RATING */}
            <Typography>⭐ {car.rating}</Typography>

            {/* PRICE */}
            <Typography variant="h5" sx={{ color: "green" }}>
              {car.price}
            </Typography>

            {/* DETAILS */}
            <Typography><b>Year:</b> {car.year || "N/A"}</Typography>
            <Typography><b>Fuel:</b> {car.fuel || "N/A"}</Typography>
            <Typography><b>Mileage:</b> {car.mileage || "N/A"}</Typography>
            <Typography><b>Features:</b> {car.features || "N/A"}</Typography>

            {/* BUTTONS */}
            <div style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                onClick={() => navigate(-1)}
              >
                Go Back ⬅
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CarDetails;