import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Fab,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import AddListingDialog from "../components/AddListingDialog";
import ProfileComponent from "../components/ProfileComponent";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [listings, setListings] = useState();
  const [open, setOpen] = useState(false);
  const handleDelete = (id) => {
    axios
      .delete(`/listings/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        fetchUserDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = () => {};

  const fetchUserDetails = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("/user/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/user/listings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <AddListingDialog
        open={open}
        onClose={() => {
          setOpen((prev) => !prev);
        }}
        fetchListings={fetchUserDetails}
      />
      <Navbar />
      <ProfileComponent
        firstName={user?.firstname}
        lastName={user?.lastname}
        email={user?.email}
        phone={user?.phone}
      />
      <Container>
        <Typography
          variant="h5"
          sx={{ margin: 2, fontWeight: "bold", fontSize: "36px" }}
        >
          My Listings:
        </Typography>
        {listings?.length > 0 ? (
          <List>
            {listings.map((listing) => (
              <PropertyCard
                key={listing._id}
                property={listing}
                onEdit={handleEdit}
                onDelete={handleDelete}
                sx={{ marginBottom: 2 }}
              />
            ))}
          </List>
        ) : (
          <Typography sx={{ textAlign: "center", fontSize: "24px" }}>
            No listings found.
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
