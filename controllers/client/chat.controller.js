const Chat = require("../../models/chat.model");
const User = require("../../models/user.model")
//[get] /chat/
module.exports.index = async (req, res) => {
  // let userId = res.locals.user.id;


  // socket io
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      const userSend = await User.findOne({
        _id: content.userId
      })
      // luu vao database
      const chat = new Chat({
        user_id: content.userId,
        content: content.content,
      });
      await chat.save();
// trả data về client

 _io.emit("SERVER_RETURN_MESSAGE", {
  userId: content.userId,
  fullName: userSend.fullName,
  content: content.content
 })

    });

    socket.on("CLIENT_SEND_TYPING", async (type) => {
      const userTyping = await User.findOne({
        _id: type.userIdTyping
      })
      console.log(type);
        socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: type.userIdTyping,
        fullName: userTyping.fullName,
        type: type.show,
       })
    })
  });

  // end socket io

  // lấy ra data
  const chats = await Chat.find({
    deleted: false
  });

for (const chat of chats){
  const infoUser = await User.findOne({
    _id: chat.user_id
  }).select("fullName");
  chat.infoUser = infoUser;
}


  
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats : chats
  });
};
