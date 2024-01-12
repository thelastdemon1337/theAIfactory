const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await 
    mongoose.connect(
      process.env.DATABASE_URI,
    // "mongodb://localhost/TheAIFactory-DB",
      console.log("DB connected"),
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
