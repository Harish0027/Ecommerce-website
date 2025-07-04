const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const ProductRouter = require("./Routes/ProductRoute");
const qs = require("qs");
const connectToMongodb = require("./Database/db");
const ErrorHandler=require("./utils/ErrorHandler");
const UserRouter = require("./Routes/UserRouter");
const cookieParser=require("cookie-parser");
const OrderRouter = require("./Routes/OrderRouter");
const cloudinary=require("cloudinary").v2
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// handling unCaught 

//It catches sync errors as soon as the app starts.
//If you put it after code that throws, the error will happen before the handler is ready — and crash your app.

process.on("uncaughtException",(error)=>{
    console.log("Error "+error.message);
    process.exit(1);
})

const PORT=process.env.PORT;

//middlewares
app.use(cors({
    origin: 'http://localhost:5173', // your React frontend
  credentials: true, // <== critical
}));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(fileUpload({ useTempFiles: true }));

//routes
app.use("/api/v1/products",ProductRouter);
app.use("/api/v1/user",UserRouter);
app.use("/api/v1/Order",OrderRouter);

//Error handler
app.use(ErrorHandler)

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRETE_KEY
})

const server=app.listen(PORT, async () => {
    try{
        await connectToMongodb();
        console.log(`This app is running on port number ${PORT}`);
    }catch(error){
        console.log(`Failed to connect to MongoDB: `+error.message)
    }
  
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
  
    server.close(() => {
      process.exit(1);  // Exit the process with failure code
    });
});
