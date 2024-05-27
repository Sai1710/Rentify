import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const AddListingDialog = ({ open, onClose, fetchListings }) => {
  const initialListingState = {
    title: "",
    area: "",
    location: "",
    numBathrooms: "",
    numBedrooms: "",
    nearby: {
      hospitals: [],
      colleges: [],
    },
    images: [],
    rent: "",
  };

  const [newListing, setNewListing] = useState(initialListingState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hospitals" || name === "colleges") {
      const nearby = { ...newListing.nearby, [name]: value };
      setNewListing((prevState) => ({
        ...prevState,
        nearby,
      }));
    } else {
      setNewListing((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);

    Promise.all(
      fileArray.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      })
    ).then((base64Images) => {
      setNewListing((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...base64Images],
      }));
    });
  };

  const handleAddListing = () => {
    const listingData = {
      nearby: {
        hospitals: [newListing.nearby.hospitals],
        colleges: [newListing.nearby.colleges],
      },
      rent: newListing.rent,
      title: newListing.title,
      area: newListing.area,
      location: newListing.location,
      numBathrooms: newListing.numBathrooms,
      numBedrooms: newListing.numBedrooms,
      images: newListing.images,
    };

    console.log("Sending request with data:", listingData);

    axios
      .post(`/listings`, listingData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log("Response received:", res);
        fetchListings();
        setNewListing(initialListingState);
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>Add Listing</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          name="title"
          value={newListing.title}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Area"
          fullWidth
          name="area"
          type="number"
          value={newListing.area}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Location"
          fullWidth
          name="location"
          value={newListing.location}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Number of Bathrooms"
          fullWidth
          name="numBathrooms"
          type="number"
          value={newListing.numBathrooms}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Number of Bedrooms"
          fullWidth
          name="numBedrooms"
          type="number"
          value={newListing.numBedrooms}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Nearby Hospitals"
          fullWidth
          name="hospitals"
          value={newListing.nearby.hospitals}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Nearby Colleges"
          fullWidth
          name="colleges"
          value={newListing.nearby.colleges}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Rent"
          fullWidth
          name="rent"
          type="number"
          value={newListing.rent}
          onChange={handleInputChange}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setNewListing(initialListingState);
            onClose();
          }}
          sx={{
            backgroundColor: "darkred",
            fontWeight: "bold",
            borderRadius: "20px",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 255, 0.5)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddListing}
          color="primary"
          sx={{
            backgroundColor: "darkblue",
            fontWeight: "bold",
            borderRadius: "20px",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 255, 0.5)",
            },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddListingDialog;
