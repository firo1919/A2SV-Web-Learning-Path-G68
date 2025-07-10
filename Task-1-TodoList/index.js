const inputField = document.querySelector("input");
const tasks = document.getElementById("tasks")
let taskList = localStorage.getItem("tasks") ? localStorage.getItem("tasks").split(",") : []
console.log(taskList)

function addTask(){
    const task = inputField.value
    if(task === ""){
        alert("Please provide a task decription")
        return
    }
    taskList.push(task)
    localStorage.setItem("tasks", taskList)

    const taskElement = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const taskContainer = document.createElement("div");

    taskElement.textContent = task;
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-task";
    taskElement.className = "task-detail";
    taskContainer.className = "task-item";

    deleteBtn.addEventListener("click", (e) => removeTask(e))
    taskElement.addEventListener("click", (e) => editTask(e))

    taskContainer.appendChild(taskElement);
    taskContainer.appendChild(deleteBtn);
    tasks.appendChild(taskContainer);

    inputField.value = "";
}

function removeTask(event){
    const task = event.target.parentElement;
    task.remove();
    taskList = [];
    for(const t of tasks.children){
        taskList.push(t.firstChild.textContent)
    }
    localStorage.setItem("tasks", taskList)
}

function editTask(event){
    const task = event.target;
    const updatedTask = prompt("Task description");
    if(updatedTask === ""){
        editTask(event)
    }
    else if(updatedTask === null){
        return
    }
    else{
        task.textContent = updatedTask;
        taskList = [];
        for(const t of tasks.children){
            taskList.push(t.firstChild.textContent)
        }
        localStorage.setItem("tasks", taskList)
    }
}

function displayTasks(){
    for(const task of taskList){
        const taskElement = document.createElement("div");
        const deleteBtn = document.createElement("button");
        const taskContainer = document.createElement("div");

        taskElement.textContent = task;
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete-task";
        taskElement.className = "task-detail";
        taskContainer.className = "task-item";

        deleteBtn.addEventListener("click", (e) => removeTask(e))
        taskElement.addEventListener("click", (e) => editTask(e))

        taskContainer.appendChild(taskElement);
        taskContainer.appendChild(deleteBtn);
        tasks.appendChild(taskContainer);
    }
}

displayTasks()