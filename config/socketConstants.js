const socketActions = {
  connection: "connection",
  setup: "setup",
  joinChat: "join chat",
  newMsg: "new message",
  startTyping: "typing",
  stopTyping: "typing off",
};

const socketEmissions = {
  connected: "connected",
  msgReceived: "message received",
  startTyping: "typing",
  stopTyping: "typing off",
};

module.exports = { socketActions, socketEmissions };
