// permission
const tablePermissions = document.querySelector("[table-permissions]");

if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked == true) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    if (permissions.length > 0){
      const formChangePermissions = document.querySelector("#form-change-permissions");
      const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
      inputPermissions.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  });
} 
// end permission

// permission data default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords){
  const values = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");
 values.forEach((value, index) => {
  value.permissions.forEach(item => {
       const row = tablePermissions.querySelector(`[data-name="${item}"]`);
       const inputs = row.querySelectorAll("input")[index];
       inputs.checked = true;
  });
 })
}


//end permission data default
