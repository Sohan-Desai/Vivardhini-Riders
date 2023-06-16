const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");

// Start express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route imports
const product = require("./routes/productRoute");
const item = require("./routes/itemRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", item);
app.use("/api/v1", user);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app