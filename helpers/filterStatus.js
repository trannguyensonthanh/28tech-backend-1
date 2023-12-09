module.exports = (req) => {
    let filterStatus = [
        {
       name: "Tất cả",
       status: "",
       class: "",
       check: false
        },
        {
        name: "Hoạt động",
        status: "active",
        class: "",
        check: false
        },
        {
        name: "Dừng hoạt động",
        status: "inactive",
        class: "",
        check: false
        }
      ]
      
      if (req.query.status) {
        const index = filterStatus.findIndex(item => 
          item.status == req.query.status
        );
        filterStatus[index].class = "active";
        filterStatus[index].check = true;
       }
       else {
        const index = filterStatus.findIndex(item => 
           item.status == ""
        )
        filterStatus[index].class = "active";
        filterStatus[index].check = true;
       }
       return filterStatus;
}