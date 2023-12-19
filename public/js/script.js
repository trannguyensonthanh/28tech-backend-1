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

// back button
const buttonsGoback = document.querySelectorAll("[button-go-back]");

if(buttonsGoback.length > 0){
    buttonsGoback.forEach(button => {
      button.addEventListener("click", (e) => {
        history.back();
      });
    })
    
}

//end backbutton