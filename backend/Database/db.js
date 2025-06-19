const mongoose=require("mongoose");
const mongoDbURL=process.env.MONGO_URI;

const connectToMongodb=async()=>{
     try{
         await mongoose.connect(mongoDbURL);
          console.log("MongoDb connected Successfully!!!")
     }catch(error){
        console.error("MongoDB connection error:", error.message);
        throw error;
     }
}
module.exports=connectToMongodb

