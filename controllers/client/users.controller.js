const { Socket } = require("socket.io");
const User = require("../../models/user.model")

const usersSocket = require("../../sockets/client/user.socket")

// [get] /users/not-friend
module.exports.notFriend = async (req, res) => {

// Socket
usersSocket(res);
// end Socket

const userId = res.locals.user.id;

const myUser = await User.findOne({
  _id: userId
})

const requestFriends = myUser.requestFriends; 
const acceptFriends = myUser.acceptFriends;
const users = await User.find({
 $and: [
  {  _id: { $ne: userId }},
  { _id: {$nin: requestFriends}},
  { _id: {$nin: acceptFriends }}
 ],
//  _id: { $ne: userId , $nin: requestFriends },
  status: "active",
  deleted: false
}).select("avatar fullName")

   res.render("client/pages/users/not-friend.pug", {
    pageTitle: "Danh sách người dùng",
      users: users 
   })
}