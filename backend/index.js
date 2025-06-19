const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const ProductRouter = require("./Routes/ProductRoute");
const connectToMongodb = require("./Database/db");

const PORT=process.env.PORT;

app.use(cors());
app.use("/products",ProductRouter);

app.listen(PORT, async () => {
    try{
        await connectToMongodb();
        console.log(`This app is running on port number ${PORT}`);
    }catch(error){
        console.log(`Failed to connect to MongoDB: `+error.message)
    }
  
});
