const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.error("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMsg = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    var msg = await Message.create(newMsg);
    msg = await msg.populate("sender", "name pic");
    msg = await msg.populate("chat");
    msg = await User.populate(msg, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: msg });
    res.json(msg);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
