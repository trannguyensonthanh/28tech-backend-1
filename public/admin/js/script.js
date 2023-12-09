const buttonStatus = document.querySelectorAll("[button-status");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href); // tạo một url mới từ url ban đầu và ko gây ảnh hưởng đến url 

buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
        const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status); // nếu chưa có status thì nó tự tạo , còn có rồi thì nó sẽ cập nhật
      }
      else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href
    })
    
})

}


// search

const formSearch = document.querySelector("#form-search")
if(formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
  e.preventDefault();

  const search = e.target.elements.keyword.value;
  if (search){
    url.searchParams.set("keyword", search );
  }
  else {
    url.searchParams.delete("keyword");
  }
  window.location.href = url.href
})
}

// pagination

const Pagination = document.querySelectorAll(".page-link")
if (Pagination.length > 0){
  let url = new URL(window.location.href);
  Pagination.forEach(button => {
     button.addEventListener("click", () => {
   const pages = button.getAttribute("button-pagination");
   if (pages){
     url.searchParams.set("page", pages);
   }
   else {
    url.searchParams.delete("page");
   }
   window.location.href = url.href
  })
  })
 
}

//check box Multi
 const checkboxMulti = document.querySelector("[checkbox-multi]");
 if (checkboxMulti){
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
inputCheckAll.addEventListener("click", () => {
  if (inputCheckAll.checked){
       inputsId.forEach(input => {
        input.checked = true;
       })
  } else {
    inputsId.forEach(input => {
      input.checked = false;
     })
  }
  inputsId.forEach(input => {
    input.addEventListener("click" , () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
      if (countChecked == inputsId.length){
        inputCheckAll.checked =true;
      }
      else {
        inputCheckAll.checked = false; 
      }
    })
  })
})
 }//end checkbox multi


// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti){
  formChangeMulti.addEventListener("submit", (e) => {
e.preventDefault();
const checkboxMulti = document.querySelector("[checkbox-multi]");
const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")


const typeChange = e.target.elements.type.value;
if (typeChange == "delete-all"){
  const isConfirm = confirm("chac chan xoa khong");
  if (!isConfirm) {
    return;
  }
}

  if(inputsChecked.length > 0){
let ids = [];
const inputIds = formChangeMulti.querySelector("input[name='ids']");
 inputsChecked.forEach(input => {
  const id = input.value;
  if (typeChange == "change-position") {
      const position = input.closest("tr").querySelector("input[name='position']").value;
      ids.push(`${id}-${position}`);
  }
  else {
     ids.push(id);
  }
 
});
inputIds.value= ids.join(", ");
formChangeMulti.submit();
  } else {
    alert("chon ngu nhu cc")
  }
  })
}
//end form change multi
 
// show alert
const showAlert = document.querySelector("[show-alert]");
const closeAlert = document.querySelector("[close-alert]")
if (showAlert){
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time); 
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })
}
//end show alert 


// Upload image
const uploadImage = document.querySelector("[upload-image]");

if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]")
  const uploadImagePreview = document.querySelector("[upload-image-preview]")
  
 uploadImageInput.addEventListener("change", (e) => {
  console.log(e);
  const file = e.target.files[0];
  if (file) {
    uploadImagePreview.src = URL.createObjectURL(file);
  }
  
 });
}
//end upload image
