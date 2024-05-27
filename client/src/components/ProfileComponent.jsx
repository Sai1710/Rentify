import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfileComponent = ({ firstName, lastName, email, phone }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: "15px" }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Profile Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
              First Name
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "24px" }}>
              {firstName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
              Last Name
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "24px" }}>
              {lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
              Email
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "24px" }}>
              {email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
              Phone Number
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "24px" }}>
              {phone}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileComponent;
