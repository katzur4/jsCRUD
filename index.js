let selectedRow = null;

//show alerts
function showAlert(message, className){
    const div  = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

//clearFields
function clearFields(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#enrollNo").value = "";
}

//add Data
document.querySelector("#studentForm").addEventListener("submit", e => {
    e.preventDefault();

    //get values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const enrollNo = document.querySelector("#enrollNo").value;

    //check if blank
    if(firstName === "" || lastName === "" || enrollNo === ""){
        showAlert("Please fill out all fields", "danger");
    }
    else{
        if(selectedRow === null){
            const list = document.querySelector(".studentList");
            const row = document.createElement("tr");
            
            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${enrollNo}</td>
            <td>
            <a href="#" class="btn btn-warning m-2 edit">Edit</a>
            <a href="#" class="btn btn-danger m-2 delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Data Added", "success")
        }else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = enrollNo;
            selectedRow = null;
            showAlert("Student data edited","info");
        }
    
        clearFields();
    }

});


// edit Data
document.querySelector('.studentList').addEventListener("click", e => {
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#enrollNo").value = selectedRow.children[2].textContent;
    };
});

//Delete Data
document.querySelector('.studentList').addEventListener("click", e => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student data deleted", "danger");
    };
});