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
  typingStarted: "typing now",
  typingStopped: "typing stopped",
};

module.exports = { socketActions, socketEmissions };
