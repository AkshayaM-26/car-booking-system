import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TextField, Button, Typography, Paper } from "@mui/material";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
      alert("Error sending message ❌");
    }
  };

  return (
    <>
      <Navbar />

      {/* 🔥 Background Section */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.75)",
          backgroundBlendMode: "darken",
          padding: "20px",
        }}
      >
        {/* 💎 Glass Card */}
        <Paper
          elevation={12}
          style={{
            padding: "35px",
            width: "420px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.95)",
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Contact Us 📩
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ marginBottom: "15px", color: "gray" }}
          >
            We’d love to hear from you!
          </Typography>

          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: "20px",
              backgroundColor: "#0f172a",
              padding: "10px",
              fontWeight: "bold",
              borderRadius: "10px",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#020617",
                transform: "scale(1.03)",
              },
            }}
            onClick={handleSubmit}
          >
            Send Message 🚀
          </Button>
        </Paper>
      </div>

      <Footer />
    </>
  );
}

export default Contact;