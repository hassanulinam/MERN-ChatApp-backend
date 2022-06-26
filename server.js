const express = require("express");
const app = express();
app.use(express.json());
const chats = require("./data/dummyData");

const dotenv = require("dotenv");
dotenv.config();

app.get("/", (_request, response) => {
  response.send("Connected to Server...");
});

app.get("/api/chats", (_req, response) => {
  response.send(chats);
});

app.get("/chats/:id", (request, response) => {
  const { id } = request.params;
  const data = chats.find((c) => c._id === id) || "Not Found";
  response.send(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
