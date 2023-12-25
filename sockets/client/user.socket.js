const User = require("../../models/user.model")

module.exports = async (res) => {
  _io.once("connection", (socket) => {
    // người dùng gửi yêu cầu kết bạn
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
//       console.log(myUserId); // accept cuả userId (B)
//  console.log(userId);  // request của myUserid (A)

  // thêm bản thân (A) vào accept của đối phương(B)
  const existUserAInB = await User.findOne({
    _id: userId,
    acceptFriends: myUserId
  });

  if(!existUserAInB){
    await User.updateOne({
      _id: userId
    }, {
      $push: {acceptFriends: myUserId}
    })
  }

  // thêm đối phương(B) vào request của bản thân(A)
  const existUserBInA = await User.findOne({
    _id: myUserId,
    requestFriends: userId
  });

  if(!existUserBInA){
    await User.updateOne({
      _id: myUserId
    }, {
      $push: {requestFriends: userId }
    });
  }

    })

     
    // người dùng hủy gửi yêu cầu kết bạn
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      console.log(myUserId); // accept cuả userId (B)
  console.log(userId);  // request của myUserid (A)

  // xóa bản thân (A) trong accept của đối phương(B)
  const existUserAInB = await User.findOne({
    _id: userId,
    acceptFriends: myUserId
  });

  if(existUserAInB){
    await User.updateOne({
      _id: userId
    }, {
      $pull: {acceptFriends: myUserId}
    });
  }

  // xóa đối phương(B) trong request của bản thân(A)
  const existUserBInA = await User.findOne({
    _id: myUserId,
    requestFriends: userId
  });

  if(existUserBInA){
    await User.updateOne({
      _id: myUserId 
    }, {
      $pull: {requestFriends: userId }
    });
  }

    })
  });

}