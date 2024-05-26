const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
connectDb();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
