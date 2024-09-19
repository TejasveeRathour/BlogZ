require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");
const connectDB = require("./db/connect");

// middleware
app.use(cors());
app.use(express.json());

// connecting with database
const connect = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Database is Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on Port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connect();
