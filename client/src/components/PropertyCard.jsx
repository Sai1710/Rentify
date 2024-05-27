import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BedIcon from "@mui/icons-material/Hotel";
import BathTubIcon from "@mui/icons-material/Bathtub";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";

function PropertyCard({ property, onDelete, onEdit }) {
  const { title, area, location, numBathrooms, numBedrooms, images, rent } =
    property;

  return (
    <Card sx={{ display: "flex", marginBottom: 2 }}>
      <Link
        to={`/property/${property._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          image={images[0]}
          alt={title}
          sx={{ width: 150, height: "100%", objectFit: "cover" }}
        />
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="subtitle2" color="textSecondary">
            {location}
          </Typography>
          <Typography variant="h6">{title}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
            <BedIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2" sx={{ marginRight: 2 }}>
              {numBedrooms > 1 ? `${numBedrooms} Bedrooms` : "1 Bedroom"}
            </Typography>
            <BathTubIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2">
              {numBathrooms > 1 ? `${numBathrooms} Bathrooms` : "1 Bathroom"}
            </Typography>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 1,
          }}
        >
          {onDelete && (
            <IconButton onClick={() => onDelete(property._id)} color="error">
              <DeleteIcon />
            </IconButton>
          )}
          {onEdit && (
            <IconButton onClick={() => onEdit(property._id)} color="primary">
              <EditIcon />
            </IconButton>
          )}
          <Button
            component={Link}
            to={`/property/${property._id}`}
            variant="contained"
            color="primary"
          >
            View
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default PropertyCard;
