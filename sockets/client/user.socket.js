const RoomChat = require("../../models/room-chat.model");
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

  // Lấy độ dài acceptFiends của B và trả về cho b
  const infoUserB = await User.findOne({
    _id: userId
  }); 

  const lengthAcceptFriends = infoUserB.acceptFriends.length;
  socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
    userId: userId,
    lengthAcceptFriends: lengthAcceptFriends
  });

// lấy thông tin của A trả về cho B
const infoUserA = await User.findOne({
  _id: myUserId,
}).select("id avatar fullName")
socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
  userId: userId,
  infoUserA: infoUserA
});



    });

     
    // người dùng hủy gửi yêu cầu kết bạn
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
  //     console.log(myUserId); // accept cuả userId (B)
  // console.log(userId);  // request của myUserid (A)

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

   // Lấy độ dài acceptFiends của B và trả về cho b
   const infoUserB = await User.findOne({
    _id: userId
  }); 

  const lengthAcceptFriends = infoUserB.acceptFriends.length;
  socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
    userId: userId,
    lengthAcceptFriends: lengthAcceptFriends
  });

// lấy userId A về cho B

socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
  userId: userId,
  userIdA: myUserId
});

    })


    // người dùng từ chối kết bạn
    socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
  //     console.log(myUserId); // accept cuả MyuserId (A)
  // console.log(userId);  // request của userid (B)
  // xóa lời mời của B trong accept của A
  const existUserBInA = await User.findOne({
    _id: myUserId,
    acceptFriends: userId
  });

  if(existUserBInA){
    await User.updateOne({
      _id: myUserId
    }, {
      $pull: {acceptFriends: userId}
    });
  }

  // xóa request của B gửi cho A
  const existUserAInB = await User.findOne({
    _id: userId,
    requestFriends: myUserId
  });

  if(existUserAInB){
    await User.updateOne({
      _id: userId 
    }, {
      $pull: {requestFriends: myUserId }
    });
  }
    })


    // người dùng chấp nhận kết bạn
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
  //     console.log(myUserId); // accept cuả MyuserId (A)
  // console.log(userId);  // request của userid (B)

// lấy ra user đã tồn tại trong nhiều trường hợp
  const existUserBInA = await User.findOne({
    _id: myUserId,
    acceptFriends: userId
  });

  const existUserAInB = await User.findOne({
    _id: userId,
    requestFriends: myUserId
  });

let roomChat;

// tạo một phòng chat
if(existUserBInA && existUserAInB){
roomChat = new RoomChat({
  typeRoom: "friend",
  users: [
    {
      user_id: userId,
      role: "superAdmin"
    },
    {
      user_id: myUserId,
      role: "superAdmin"
    }
],
})
await roomChat.save();
}


// thêm {user_id, room_chat_id} của B vào friendList của A
  // xóa lời mời của B trong accept của A
  if(existUserBInA){
    await User.updateOne({
      _id: myUserId
    }, {
      $push: {
        friendList: 
          {
            user_id: userId,
            room_chat_id: roomChat.id
          }
      },
      $pull: {acceptFriends: userId}
    });
  }

  // thêm {user_id, room_chat_id} của A vào friendList của B
  // xóa request của B gửi cho A
 

  if(existUserAInB){
    await User.updateOne({
      _id: userId 
    }, {
      $push: {
        friendList: 
          {
            user_id: myUserId,
            room_chat_id: roomChat.id 
          }
      },
      $pull: {requestFriends: myUserId }
    });
  }
    })
  });

}