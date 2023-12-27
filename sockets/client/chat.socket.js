const Chat = require("../../models/chat.model");
const User = require("../../models/user.model")
const uploadToCloudinary = require("../../helpers/uploadToCloudinary")
module.exports = async (req) => {
  const roomChatId = req.params.roomChatId;
  _io.once("connection", (socket) => {
socket.join(roomChatId); // nhiều người sẽ vô cùng một phòng nếu họ có cùng roomchatId

    socket.on("CLIENT_SEND_MESSAGE", async (data) => {

let images = [];
for(const imageBuffer of data.images){
  const link = await uploadToCloudinary.uploadToCloudinary(imageBuffer);
  images.push(link);
}
 
      const userSend = await User.findOne({
        _id: data.userId
      })
      // luu vao database
      const chat = new Chat({
        room_chat_id: roomChatId,
        user_id: data.userId,
        content: data.content,
        images: images
      });
      await chat.save();
// trả data về client

 _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
  userId: data.userId,
  fullName: userSend.fullName,
  content: data.content,
  images: images
 })

    });

    socket.on("CLIENT_SEND_TYPING", async (type) => {
      const userTyping = await User.findOne({
        _id: type.userIdTyping
      })
        socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
        userId: type.userIdTyping,
        fullName: userTyping.fullName,
        type: type.show,
       })
    })
  });

}