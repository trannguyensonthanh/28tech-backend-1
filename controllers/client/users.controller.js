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

// [get] / users/request

module.exports.request = async (req, res) => {

  // Socket
usersSocket(res);
// end Socket
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId
  });
const requestFriends = myUser.requestFriends;
 const users = await User.find({
   _id: { $in: requestFriends},
    status: "active",
    deleted: false
 }).select("id avatar fullName");
 console.log(users);
  res.render("client/pages/users/request", {
    pageTitle: "Lời mời đã gửi",
   users: users
  });
}


// [get] / users/accept
module.exports.accept = async (req, res) => {
  // Socket
usersSocket(res);
// end Socket
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId
  });
const acceptFriends = myUser.acceptFriends;
 const users = await User.find({
   _id: { $in: acceptFriends},
    status: "active",
    deleted: false
 }).select("id avatar fullName");
  res.render("client/pages/users/accept", {
    pageTitle: "Lời mời đã nhận",
   users: users
  });
}

// [get] /users/friend
// [get] / users/accept
module.exports.friends  = async (req, res) => {
  // Socket
usersSocket(res);
// end Socket
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId
  });
const friendList = myUser.friendList;
const friendListId = friendList.map(item => {
  return item.user_id
})


 const users = await User.find({
   _id: { $in: friendListId},
    status: "active",
    deleted: false
 }).select("id avatar fullName statusOnline");
  res.render("client/pages/users/friends", {
    pageTitle: "Danh sách bạn bè",
   users: users
  });
}