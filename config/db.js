const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.underline);
  } catch (err) {
    console.log(`ERROR:--> ${err.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
