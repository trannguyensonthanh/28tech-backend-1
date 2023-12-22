const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
    user_id: String,
    room_chat_id: String,
    content: String,
    images: Array,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
}, {
  timestamps: true
});

const Chat = mongoose.model("Chat", chatSchema, "chats"); //Role là tên của model này, roleSchema là tên của định dạng,  roles là tên trong mongodb

module.exports = Chat;  // chỉ export cái thằng Role 
