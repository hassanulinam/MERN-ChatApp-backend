const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { socketActions, socketEmissions } = require("./config/socketConstants");
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
const server = app.listen(PORT, () =>
  console.log(`Listening on Port: ${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
  pintTimeout: 6000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on(socketActions.connection, (socket) => {
  console.log("socket.io connection established".white.underline);
  socket.on(socketActions.setup, (userData) => {
    socket.join(userData._id);
    socket.emit(socketEmissions.connected);
  });

  // when others join the chat
  socket.on(socketActions.joinChat, (room) => {
    socket.join(room);
  });

  // typing indication functionality
  socket.on(socketActions.startTyping, (room) =>
    socket.in(room).emit(socketEmissions.startTyping)
  );
  socket.on(socketActions.stopTyping, (room) =>
    socket.in(room).emit(socketEmissions.stopTyping)
  );

  // when new message is sent, push it to the receivers.
  socket.on(socketActions.newMsg, (newMsgReceived) => {
    var chat = newMsgReceived.chat;

    if (!chat.users) return console.log("chat.users is not defined".red.bold);

    chat.users.forEach((user) => {
      if (user._id === newMsgReceived.sender._id) return;
      socket.in(user._id).emit(socketEmissions.msgReceived, newMsgReceived);
    });
  });

  socket.off(socketActions.setup, () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
