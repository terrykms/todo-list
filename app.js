let tasks = []; // create an empty array of tasks 

window.onload = function() {
    tasks = retrieveFromLocalStorage();
    renderTasks(tasks);
}

/* ============= LOCAL STORAGE FUNCTIONS ============== */
function updateLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// returns "tasks" JSON Object 
function retrieveFromLocalStorage() {
    const reference = localStorage.getItem("tasks");
    if (reference) {
        return JSON.parse(reference);
    }
}

// used when the page reloads - iterates through every task saved in local storage as JSON
// function renderTask() is defined below
function renderTasks(tasks) {
    tasks.forEach(renderTask)
}

// remove an item from localstorage
function removeTaskFromLocalStorage(taskID) {
    tasks = retrieveFromLocalStorage()
    updatedTasks = tasks.filter(item => item.id != taskID)
    updateLocalStorage(updatedTasks);
}



/* ==================================
    function addTask(): 
        uses  other functions: 
            - saveTaskAsJSON()
            - updateLocalStorage()
            - renderTask()
======================================= */

function addTask() {
    var taskValue = document.getElementById("myTask").value;

    if (taskValue != "") {
        // JSON
        taskObject = saveTaskAsJSON(taskValue, tasks);
        updateLocalStorage(tasks);

        // Add task into HTML 
        renderTask(taskObject);

        // clear input
        document.getElementById("myTask").value = "";
    }
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


function createButton(className) {
    var button = document.createElement("span");
    button.setAttribute("class", className)
    textNode = document.createTextNode("\u2573");
    button.appendChild(textNode);

    // create function to remove task when clicked
    button.addEventListener("click", function() {
        this.parentNode.remove();
        
        var data_id = this.parentNode.id;
        removeTaskFromLocalStorage(data_id)

    })

    return button;
}



/* ================ EVENT HANDLERS ===================== */

var ul = document.querySelector("ul");
ul.addEventListener("click", function(element) {
    if (element.target.tagName == "LI" ) {
        element.target.classList.toggle("checked");

        // ADD FUNCTION TO UPDATE "CHECKED" BOOLEAN VALUE IN JSON OBJECT
        tasks = retrieveFromLocalStorage();
    }
})

var addButton = document.getElementById("submitTask");
addButton.addEventListener("click", addTask);

// clear task in HTML DOM and localStorage
document.getElementById("clrLocalStorage").addEventListener("click", function() {
    // clear screen 
    currentTasks = document.querySelectorAll(".item");
    console.log(currentTasks);

    currentTasks.forEach(function(item) {
        item.remove();
    })

    // clear data in localStorage
    localStorage.clear();
})