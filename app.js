//define functions
function createCheckbox(className) {
    var checkbox = document.createElement("input");
    checkbox.setAttribute("class", className)
    checkbox.setAttribute("type", "checkbox")

    return checkbox;
}

function createButton(className, text) {
    var button = document.createElement("button");
    button.setAttribute("class", className)
    button.textContent = text;

    return button;
}


function checkTaskStatus(checkbox) {
    var row = checkbox.parentNode.parentNode
    console.log(checkbox.checked)
    if (checkbox.checked) {
        row.style.color("blue")
    }

}

function addTask() {
    var task = document.getElementById("myTask").value;
    var deadline = document.getElementById("deadline").value;

    if (task != "") {
        // creating elements to be inserted 
        var table = document.getElementById("taskTable");
        var row = table.insertRow(-1); //inserts row at the last position

        // create completed & remove buttons
        var checkboxStatus = createCheckbox("checkbox");
        var buttonRemove = createButton("remove-button", "Remove");

        row.insertCell(0).append(checkboxStatus);
        row.insertCell(1).innerHTML = task;
        row.insertCell(2).innerHTML = deadline;
        row.insertCell(3).append(buttonRemove);

        // delete task when "remove" button is clicked
        var buttonRemoveNodeList = document.querySelectorAll(".remove-button");
        var checkboxStatusNodeList = document.querySelectorAll(".checkbox");

        var counter = 0;
        while(counter < buttonRemoveNodeList.length) {

            buttonRemoveNodeList[counter].onclick = function() {
                this.parentNode.parentNode.remove(); // button -> cell -> row
            }

            checkboxStatusNodeList[counter].onclick = function() {
                if (this.checked) {
                    this.parentNode.parentNode.style.backgroundColor = "green";
                }
                else {
                    this.parentNode.parentNode.style.backgroundColor = "white";
                }

            }
            counter++
        }
        
        // mark as completed if task is done

        



        // save task into local storage
        //saveTask(task);

        document.getElementById("myTask").value = "";
    }
}





// Event Handlers
let addButton = document.getElementById("submitTask");

addButton.addEventListener("click", addTask);
