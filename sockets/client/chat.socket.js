const Chat = require("../../models/chat.model");
const User = require("../../models/user.model")
const uploadToCloudinary = require("../../helpers/uploadToCloudinary")
module.exports = async () => {
  _io.once("connection", (socket) => {
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
        user_id: data.userId,
        content: data.content,
        images: images
      });
      await chat.save();
// trả data về client

 _io.emit("SERVER_RETURN_MESSAGE", {
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
        socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: type.userIdTyping,
        fullName: userTyping.fullName,
        type: type.show,
       })
    })
  });

}