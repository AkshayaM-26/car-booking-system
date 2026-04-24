import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import background from "../assets/car-background.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter all fields ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST", // ✅ IMPORTANT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data); // ✅ debug

      // ✅ PROPER CHECK
      if (res.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful ✅");
        navigate("/");
      } else {
        alert(data.message || "Invalid credentials ❌");
      }
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
            Login
          </Typography>

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
            type="button"   // ✅ IMPORTANT FIX
            sx={{
              backgroundColor: "#f59e0b",
              color: "#000",
              fontWeight: "bold",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Don't have an account?
            <span
              style={{
                color: "#f59e0b",
                cursor: "pointer",
                marginLeft: "5px",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Login;