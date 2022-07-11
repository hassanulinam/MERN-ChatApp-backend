const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (_request, response) => {
  response.send("Connected to Server..., API is running.");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`.yellow.bold));
