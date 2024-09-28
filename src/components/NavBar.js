// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Event Finder
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/search">
          Explore Talent
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
