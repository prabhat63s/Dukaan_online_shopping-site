import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true); 

    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${conn.connection.host}`.blue
    );
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

export default connectDB;
