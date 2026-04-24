import { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button, TextField } from "@mui/material";

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: "",
    price: "",
    image: "",
    rating: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  // ➕ ADD CAR
  const handleAdd = async () => {
    await fetch("http://localhost:5000/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    });

    alert("Car added ✅");
    window.location.reload();
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/cars/${id}`, {
      method: "DELETE",
    });

    setCars(cars.filter((c) => c._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">Manage Cars 🚗</Typography>

      {/* ADD FORM */}
      <TextField label="Name" fullWidth margin="normal"
        onChange={(e) => setNewCar({ ...newCar, name: e.target.value })} />

      <TextField label="Price" fullWidth margin="normal"
        onChange={(e) => setNewCar({ ...newCar, price: e.target.value })} />

      <TextField label="Image" fullWidth margin="normal"
        onChange={(e) => setNewCar({ ...newCar, image: e.target.value })} />

      <TextField label="Rating" fullWidth margin="normal"
        onChange={(e) => setNewCar({ ...newCar, rating: e.target.value })} />

      <Button variant="contained" onClick={handleAdd}>
        Add Car ➕
      </Button>

      {/* CAR LIST */}
      {cars.map((car) => (
        <Card key={car._id} sx={{ marginTop: "20px" }}>
          <CardContent>
            <Typography>{car.name}</Typography>
            <Typography>{car.price}</Typography>

            <Button
              color="error"
              onClick={() => handleDelete(car._id)}
            >
              Delete ❌
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AdminCars;