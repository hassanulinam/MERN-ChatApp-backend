const express = require("express");
const { accessChat, fetchChats } = require("../controllers/chatControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect);
router.route("/grouprename").put(protect);
router.route("/groupremove").put(protect);
router.route("/groupadd").put(protect);

module.exports = router;
