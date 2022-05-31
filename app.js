let tasks = [];
window.onload = retrieveFromLocalStorage;
function addToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))

}

function retrieveFromLocalStorage() {
    const reference = localStorage.getItem("tasks");
    if (reference) {
        tasks = JSON.parse(reference);
        renderTasks(tasks);
    }
}


//for debugging (clear task)
document.getElementById("clrLocalStorage").addEventListener("click", function() {
    localStorage.clear();
})


//define functions

function createButton(className) {
    var button = document.createElement("span");
    button.setAttribute("class", className)
    textNode = document.createTextNode("\u2573");
    button.appendChild(textNode);

    // create function to remove task when clicked
    button.addEventListener("click", function() {
        var data_id = this.parentNode.id
        this.parentNode.remove();

        // NOT WORKING
        const reference = localStorage.getItem("tasks");
        tasks = JSON.parse(reference)
        tasks.filter(function(item) {
            key = document.getElementById(data_id);
            return key != item.id
        })

    })

    return button;
}


// adding task, uses two other functions: saveTaskAsJSON() and renderTask(). 
function addTask() {
    var taskValue = document.getElementById("myTask").value;

    if (taskValue != "") {
        // JSON
        taskObject = saveTaskAsJSON(taskValue, tasks);
        addToLocalStorage(tasks);

        // Add task into HTML 
        renderTask(taskObject);

        // clear input
        document.getElementById("myTask").value = "";
    }
}

// used when the page reloads - iterates through every task saved in local storage as JSON
function renderTasks(tasks) {
    tasks.forEach(renderTask)
}


function renderTask(taskObject) {
    taskValue = taskObject.value;

    // creating elements to be inserted
    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");  
    li.setAttribute("class", "item");
    li.setAttribute("id", taskObject.id);
    taskTextNode = document.createTextNode(taskValue);

    // create completed & remove buttons
    var buttonRemove = createButton("remove-button");

    li.appendChild(taskTextNode);
    li.appendChild(buttonRemove);
    taskList.appendChild(li);
}

function saveTaskAsJSON(taskValue, tasks) {
    // JSON
    const taskObject = {
        id: Date.now(),
        value: taskValue,
        checked: false
    }

    tasks.push(taskObject);

    return taskObject
}



// Event Handlers
var ul = document.querySelector("ul");
ul.addEventListener("click", function(element) {
    if (element.target.tagName == "LI" ) {
        element.target.classList.toggle("checked");
    }
})

var addButton = document.getElementById("submitTask");
addButton.addEventListener("click", addTask);