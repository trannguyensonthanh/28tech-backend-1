const User = require("../../models/user.model")

// [get] /users/not-friend
module.exports.notFriend = async (req, res) => {
const userId = res.locals.user.id;

const users = await User.find({
  _id: { $ne: userId },
  status: "active",
  deleted: false
}).select("avatar fullName")

   res.render("client/pages/users/not-friend.pug", {
    pageTitle: "Danh sách người dùng",
      users: users 
   })
}