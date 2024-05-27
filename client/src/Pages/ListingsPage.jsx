import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
} from "@mui/material";
import PropertyCard from "../components/PropertyCard";
import axios from "axios";
import Navbar from "../components/Navbar";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [rentRange, setRentRange] = useState([0, 10000]);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [displayedListings, setDisplayedListings] = useState([]);

  const fetchListings = async () => {
    try {
      const res = await axios.get("/listings");
      setListings(res.data);
      setDisplayedListings(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch listings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleFilterChange = () => {
    setFilterDialogOpen(false);
    const filteredListings = listings.filter((listing) => {
      const matchesBedrooms = bedrooms
        ? listing.numBedrooms === parseInt(bedrooms)
        : true;
      const matchesRentRange =
        listing.rent >= rentRange[0] && listing.rent <= rentRange[1];

      return matchesBedrooms && matchesRentRange;
    });
    setDisplayedListings(filteredListings);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginTop: 2, fontWeight: "bold" }}
          >
            Properties for Rent
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setFilterDialogOpen(true)}
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
            Filter
          </Button>
        </Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <Typography variant="h6" color="error">
              No Listings Found
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {displayedListings.map((listing) => (
              <PropertyCard
                key={listing._id}
                property={listing}
                onEdit={false}
                onDelete={false}
              />
            ))}
          </Box>
        )}
      </Container>

      <Dialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Filter Listings</DialogTitle>
        <DialogContent sx={{ minHeight: "300px" }}>
          <TextField
            label="Number of Bedrooms"
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography gutterBottom>Rent Range</Typography>
          <Slider
            value={rentRange}
            onChange={(e, newValue) => setRentRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            step={100}
            marks={[
              { value: 0, label: "0" },
              { value: 5000, label: "5000" },
              { value: 10000, label: "10000" },
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setFilterDialogOpen(false)}
            sx={{
              backgroundColor: "darkred",
              fontWeight: "bold",
              borderRadius: "20px",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(139, 0, 0, 0.5)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFilterChange}
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
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListingsPage;
