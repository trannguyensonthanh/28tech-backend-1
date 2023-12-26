// chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");
      const userId = button.getAttribute("btn-add-friend");
      socket.emit("CLIENT_ADD_FRIEND", userId);
    })
  }) 
}
// end chức năng gửi yêu cầu

// chức năng hủy yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");
      const userId = button.getAttribute("btn-cancel-friend");
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    })
  }) 
}
// end chức năng hủy yêu cầu

// hàm từ chối lời mời kết bạn
const refuseFriend = (listBtnRefuseFriend) => {
  if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("refuse");
      const userId = button.getAttribute("btn-refuse-friend");
      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    })
  }) 
}

}

// end hàm từ chối lời mời kết bạn

// hàm chấp nhận lời mời
const acceptFriend = (acceptFriends) => {
  if (acceptFriends.length > 0) {
    acceptFriends.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("accepted");
      const userId = button.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    })
  }) 
}
}


// end hàm chấp nhận lời mời

// chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
refuseFriend(listBtnRefuseFriend);
// end chức năng từ chối kết bạn

// chức năng chấ nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
acceptFriend(listBtnAcceptFriend);
// end chức năng chấp nhận kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
  socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgeUserAccept = document.querySelector("[badge-users-accept]");
    const userId = badgeUserAccept.getAttribute("badge-users-accept")
    if (userId == data.userId) {
          badgeUserAccept.innerHTML = data.lengthAcceptFriends;
    }

  });

// END SERVER_RETURN_LENGTH_ACCEPT_FRIEND


//SERVER_RETURN_INFO_ACCEPT_FRIEND
 socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {

    const dataUsersAccept = document.querySelector("[data-users-accept]");
    const userId = dataUsersAccept.getAttribute("data-users-accept")
    if (userId == data.userId) {

      // vẽ user ra giao diện
      const newBoxUser = document.createElement("div");
      newBoxUser.classList.add("col-6");
      newBoxUser.innerHTML = `
      <div class="box-user">
      <div class="inner-avatar">
        <img src=${data.infoUserA.avatar ? data.infoUserA.avatar  : "https://i.pinimg.com/236x/e5/bf/a2/e5bfa2feb7d65537aa684ef60f177de1.jpg"} alt=${data.infoUserA.fullName}>
      </div>
  <div class="inner-info">
  <div class="inner-name">${data.infoUserA.fullName}</div>
  <div class="inner-buttons">
  <button
   class="btn btn-sm btn-primary mr-1" 
   btn-accept-friend=${data.infoUserA._id}
   >
   Chấp nhận
   </button>
  <button
   class="btn btn-sm btn-secondary mr-1" 
   btn-refuse-friend=${data.infoUserA._id}
   >Xóa
   </button>
  <button 
    class="btn btn-sm btn-secondary mr-1" 
    btn-deleted-friend="btn-deleted-friend" 
    disabled="disabled"
  >Đã xóa
  </button>
  <button class="btn btn-sm btn-secondary mr-1" btn-accepted-friend="btn-accepted-friend" disabled="disabled">Đã chấp nhận</button>
  </div>
  </div>
  </div>
      `
      dataUsersAccept.appendChild(newBoxUser);
// hết vẽ giao diện

// xóa lời mời kết bạn
const btnRefuseFriend = newBoxUser.querySelectorAll("[btn-refuse-friend]");
refuseFriend(btnRefuseFriend);
// end xóa lời mời kết bạn

// chấp nhận lời mời kết bạn
const btnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
acceptFriend(btnAcceptFriend);


// end chấp nhận lời mời kết bạn 

    }
   
  });

//END SERVER_RETURN_INFO_ACCEPT_FRIEND


