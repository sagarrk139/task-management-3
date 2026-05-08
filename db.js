const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect("mongodb+srv://sushanth1723:Sushanth@1723@cluster0.mmud0si.mongodb.net/?appName=Cluster0"
    );

    console.log("MongoDB Connected");

  } catch (error) {

    console.log(error);

  }
};

module.exports = connectDB;