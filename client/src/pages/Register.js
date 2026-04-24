import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import background from "../assets/car-background.jpg"; // add a good car image in assets

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Fill all fields ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.message.includes("successfully")) navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Server not connecting ❌");
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(15,23,42,0.85)",
            p: 5,
            borderRadius: 3,
            boxShadow: 10,
            width: { xs: "90%", sm: "400px" },
            color: "#fff",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
            Create Account
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ mb: 3, backgroundColor: "#fff", borderRadius: 1 }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#f59e0b", color: "#000", fontWeight: "bold" }}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?
            <span
              style={{ color: "#f59e0b", cursor: "pointer", marginLeft: "5px" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Register;