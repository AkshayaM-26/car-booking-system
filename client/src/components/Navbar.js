import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // 🔐 Get user
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚪 Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    alert("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "#0f172a" }}>
      <Toolbar>

       
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: "1px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/")}
        >
           SRI SAI CARS
        </Typography>

        {/* 🏠 Navigation */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        <Button color="inherit" component={Link} to="/about">
          About
        </Button>

        <Button color="inherit" component={Link} to="/contact">
          Contact
        </Button>

        <Button color="inherit" component={Link} to="/cart">
          Cart 🛒
        </Button>

        <Button color="inherit" component={Link} to="/wishlist">
          Wishlist ❤️
        </Button>
        {/* <Button color="inherit" onClick={() => navigate("/booking")}>
  Booking 📦
</Button> */}

          {user?.email === "admin@gmail.com" && (
  <button
    onClick={() => navigate("/admin")}
    style={{
      marginLeft: "0px",
      padding: "4px 9px",
      background: "#0f172a",
      color: "white",
      border: "none",
      borderRadius: "0px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    ADMIN ⚙️
  </button>
)}

        {/* 🔐 Login / Logout */}
        {user ? (
          <Button
            variant="contained"
            sx={{
              marginLeft: "10px",
              background: "#ef4444",
              fontWeight: "bold",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              marginLeft: "10px",
              background: "#22c55e",
              fontWeight: "bold",
            }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;