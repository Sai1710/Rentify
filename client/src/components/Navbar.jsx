import React from "react";
import { AppBar, Toolbar, Typography, Button, Link, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
function Navbar({ title }) {
  const isLoggedIn = localStorage.getItem("accessToken") !== null;

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "darkblue", height: "80px", boxShadow: "none" }}
    >
      <Toolbar sx={{ height: "100%" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            href="/"
            color="inherit"
            underline="none"
            sx={{
              fontFamily: "Permanent Marker, cursive",
              color: "#fff",
              fontSize: "36px",
              lineHeight: "80px",
            }}
          >
            Rentify
          </Link>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isLoggedIn ? (
            <Link
              href="/user-profile"
              sx={{
                display: "flex",
                alignItems: "center",
                border: "2px solid white",
                borderRadius: "100%",
                padding: "6px",
              }}
            >
              <PersonIcon
                sx={{
                  color: "#fff",
                  padding: "3px",
                }}
              />
            </Link>
          ) : (
            <Button color="inherit">
              <Link
                href="/login"
                color="white"
                underline="none"
                px={3}
                py={1}
                sx={{
                  backgroundColor: "#fff",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  color: "darkblue",
                }}
              >
                Login
              </Link>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
