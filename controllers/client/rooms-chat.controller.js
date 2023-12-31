const User = require("../../models/user.model")
const RoomChat = require("../../models/room-chat.model")
// [get] /rooms-chat/
module.exports.index = async (req, res) => {
const myUserId = res.locals.user.id;
  const listRoomChat = await RoomChat.find({
    deleted: false,
    "users.user_id": myUserId
  });

  for (const room of listRoomChat) {
    if(room.typeRoom == "friend"){
       const user = room.users.find(item => {
      return item.user_id != myUserId;  
    })
      const nameRoom = await User.findOne({
        _id: user.user_id
      }).select("fullName")
    room.nameRoom = nameRoom.fullName;
    }
   
   
  }

    res.render("client/pages/rooms-chat/index", {
  pageTitle: "Danh sách phòng",
  listRoomChat: listRoomChat
 })
  

 
}

// [get] /rooms-chat/create
module.exports.create = async (req, res) => {
const friendList = res.locals.user.friendList;
for (const friend of friendList) {
  const infoUser = await User.findOne({
    _id: friend.user_id,
  }).select("fullName avatar")

  friend.infoFriend = infoUser;
}

 res.render("client/pages/rooms-chat/create", {
  pageTitle: "Tạo phòng",
  friendList: friendList
 })
}

// [post] /rooms-chat/createPost
module.exports.createPost = async (req, res) => {
const title = req.body.title;
const userId = req.body.usersId;
const userIdA = res.locals.user.id;
console.log(title)
console.log(userId);
let dataChat = {
  title: title,
typeRoom: "group",
users: [],
};
userId.forEach(userId => {
  dataChat.users.push({
    user_id: userId,
    role: "user"
  });
});

dataChat.users.push({
  user_id: userIdA,
  role: "superAdmin"
});
const room = new RoomChat(dataChat);
await room.save();

res.redirect(`/chat/${room.id}`)
}

