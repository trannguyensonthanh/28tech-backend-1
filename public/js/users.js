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


// chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("refuse");
      const userId = button.getAttribute("btn-refuse-friend");
      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    })
  }) 
}
// end chức năng từ chối kết bạn

// chức năng chấ nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("accepted");
      const userId = button.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    })
  }) 
}
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
