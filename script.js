const morningInputBox = document.getElementById("morning-input-box");
const morningListContainer = document.getElementById("morning-list-container");

const afternoonInputBox = document.getElementById("afternoon-input-box");
const afternoonListContainer = document.getElementById("afternoon-list-container");

const nightInputBox = document.getElementById("night-input-box");
const nightListContainer = document.getElementById("night-list-container");

function addTask(period) {
    let inputBox, listContainer;
    switch(period) {
        case 'morning':
            inputBox = morningInputBox;
            listContainer = morningListContainer;
            break;
        case 'afternoon':
            inputBox = afternoonInputBox;
            listContainer = afternoonListContainer;
            break;
        case 'night':
            inputBox = nightInputBox;
            listContainer = nightListContainer;
            break;
        default:
            return;
    }

    let taskText = inputBox.value.trim(); 
    if (taskText === "") {
        alert("You must write something!");
        return; 
    }

    let li = document.createElement("li");
    li.textContent = taskText;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);

    inputBox.value = "";
    saveData();
}

const listContainers = [morningListContainer, afternoonListContainer, nightListContainer];

listContainers.forEach(listContainer => {
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
});

function saveData() {
    listContainers.forEach((listContainer, index) => {
        localStorage.setItem(`data_${index}`, listContainer.innerHTML);
    });
}

function showTask() {
    listContainers.forEach((listContainer, index) => {
        listContainer.innerHTML = localStorage.getItem(`data_${index}`);
    });
}
showTask();
