const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notificationTitle: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  blogId: {
    type: String,
    required: true,
  }
});

const notification = mongoose.model("notification", notificationSchema);

module.exports = notification;
