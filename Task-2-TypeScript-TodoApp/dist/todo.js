"use strict";
const addTaskBtn = document.getElementById("add-task");
const inputField = document.querySelector("input");
const tasksContainer = document.getElementById("tasks");
addTaskBtn === null || addTaskBtn === void 0 ? void 0 : addTaskBtn.addEventListener("click", () => addTask());
let tasks = fetchTasks();
function fetchTasks() {
    let storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    return tasks;
}
function addTask() {
    let task = inputField === null || inputField === void 0 ? void 0 : inputField.value;
    if (typeof task === "undefined") {
        alert("Please provide a valid task description");
        return;
    }
    let taskId = localStorage.getItem("taskId") || "0";
    localStorage.setItem("taskId", (parseInt(taskId) + 1).toString());
    let newTask = {
        id: taskId,
        description: task,
        isFinished: false,
    };
    if (inputField) {
        inputField.value = "";
    }
    tasks.push(newTask);
    updateStorage();
    displayTasks();
}
function editTask(event) {
    var _a;
    const updatedTask = prompt("Task description");
    if (updatedTask === "") {
        editTask(event);
    }
    else if (updatedTask) {
        let id = (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.id;
        for (let t of tasks) {
            if (t.id === id) {
                t.description = updatedTask;
                break;
            }
        }
        updateStorage();
        displayTasks();
    }
}
function deleteTask(event) {
    let taskContainer = event.target.parentElement;
    let id = taskContainer === null || taskContainer === void 0 ? void 0 : taskContainer.id;
    for (let t of tasks) {
        if (t.id === id) {
            t.isFinished = true;
            if (taskContainer === null || taskContainer === void 0 ? void 0 : taskContainer.classList.contains("finished")) {
                tasks = tasks.filter((e) => e.id !== id);
            }
            break;
        }
    }
    updateStorage();
    displayTasks();
}
function updateStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function displayTasks() {
    const completedTasks = [];
    const activeTasks = [];
    for (let task of tasks) {
        const taskItem = document.createElement("div");
        const taskDetail = document.createElement("div");
        const taskEdit = document.createElement("button");
        const taskDelete = document.createElement("button");
        taskItem.id = task.id.toString();
        if (task.isFinished) {
            taskItem.classList = "task-item finished";
        }
        else {
            taskItem.className = "task-item";
        }
        taskDetail.textContent = task.description;
        taskDetail.className = "task-detail";
        taskEdit.className = "edit-task";
        taskEdit.textContent = "📝";
        taskEdit.addEventListener("click", (e) => editTask(e));
        taskDelete.className = "delete-task";
        taskDelete.textContent = "X";
        taskDelete.addEventListener("click", (e) => deleteTask(e));
        taskItem.appendChild(taskDetail);
        taskItem.appendChild(taskEdit);
        taskItem.appendChild(taskDelete);
        if (task.isFinished) {
            completedTasks.push(taskItem);
        }
        else {
            activeTasks.push(taskItem);
        }
    }
    tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.replaceChildren();
    const title1 = document.createElement("h2");
    title1.textContent = "Available Tasks";
    tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.appendChild(title1);
    for (let task of activeTasks) {
        tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.appendChild(task);
    }
    const title2 = document.createElement("h2");
    title2.textContent = "Completed Tasks";
    tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.appendChild(title2);
    for (let task of completedTasks) {
        tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.appendChild(task);
    }
}
displayTasks();
//# sourceMappingURL=todo.js.map