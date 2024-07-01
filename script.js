var selectedRow = null;

//show alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//clear all fields

function clearFields(){
    document.querySelector("#first_name").value = "";
    document.querySelector("#last_name").value = "";
    document.querySelector("#email").value = "";
}

//add data

document.querySelector("#employee-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //get form values
    const first_name = document.querySelector("#first_name").value;
    const last_name = document.querySelector("#last_name").value;
    const email = document.querySelector("#email").value;

    //validate
    if(first_name == "" || last_name == "" || email == ""){
        showAlert("Please fill in all fields", "danger");
    } else {
        if(selectedRow == null){
            const list = document.querySelector("#employee-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${first_name}</td>
            <td>${last_name}</td>
            <td>${email}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Employee Added", "success");
        } else {
            selectedRow.children[0].textContent = first_name;
            selectedRow.children[1].textContent = last_name;
            selectedRow.children[2].textContent = email;
            selectedRow = null;
            showAlert("Employee info updated", "info");
        }
        clearFields();
    }
});

//update data

document.querySelector("#employee-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#first_name").value = selectedRow.children[0].textContent;
        document.querySelector("#last_name").value = selectedRow.children[1].textContent;
        document.querySelector("#email").value = selectedRow.children[2].textContent;
    }
})

//delete data

document.querySelector("#employee-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Employee Data Deleted", "danger");
    }
});