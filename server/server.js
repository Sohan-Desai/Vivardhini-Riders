const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./database/database");

// Handling uncaught exceptions
process.on("uncaughtException", (err)=>{

    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

// Config
dotenv.config({path:"server/config/config.env"});

// Connecting to database
connectDatabase();

// Connecting to cloundinary server
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled promise rejection
process.on("unhandledRejection", err => {

    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
})
