const mongoose = require("mongoose");
const roomChatSchema = new mongoose.Schema({
title: String,
avatar: String,
typeRoom: String,
status: String,
users: [
  {
    user_id: String,
    role: String
  }
],
deleted: {
  type: Boolean,
  default: false
},
deletedAt: Date
}, {
  timestamps: true
});

const RoomChat = mongoose.model("RoomChat", roomChatSchema, "rooms-chat"); //Role là tên của model này, roleSchema là tên của định dạng,  roles là tên trong mongodb

module.exports = RoomChat;  // chỉ export cái thằng Role 
