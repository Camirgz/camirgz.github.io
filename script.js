const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    let taskText = inputBox.value.trim(); // Eliminar espacios en blanco al principio y al final

    if (taskText === "") {
        alert("You must write something!");
        return; // Salir de la función si la entrada está vacía
    }

    let li = document.createElement("li");
    li.textContent = taskText; // Usar textContent para evitar problemas de seguridad con HTML
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        let confirmation = confirm("Are you sure you want to delete this task?");
        if (confirmation) {
            e.target.parentElement.remove();
            saveData();
        }
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
