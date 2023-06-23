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
const blog = require("./routes/blogRoute");
const prodcategory = require("./routes/prodcategoryRoute");
const blogcategory = require("./routes/blogcategoryRoute");
const brand = require("./routes/brandRoute");
const enquiry = require("./routes/enqRoute");

app.use("/api/v1", product);
app.use("/api/v1", item);
app.use("/api/v1", user);
app.use("/api/v1", blog);
app.use("/api/v1", prodcategory);
app.use("/api/v1", blogcategory);
app.use("/api/v1", brand);
app.use("/api/v1", enquiry);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app