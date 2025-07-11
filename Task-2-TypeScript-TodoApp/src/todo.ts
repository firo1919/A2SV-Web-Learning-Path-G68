interface Task {
	id: string;
	description: string;
	isFinished: boolean;
}

const addTaskBtn = document.getElementById("add-task");
const inputField = document.querySelector("input");
const tasksContainer = document.getElementById("tasks");

addTaskBtn?.addEventListener("click", () => addTask());

let tasks: Task[] = fetchTasks();

function fetchTasks(): Task[] {
	let storedTasks = localStorage.getItem("tasks");
	const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
	return tasks;
}

function addTask(): void {
	let task: string | undefined = inputField?.value;
	if (typeof task === "undefined") {
		alert("Please provide a valid task description");
		return;
	}

	let taskId: string = localStorage.getItem("taskId") || "0";
    localStorage.setItem("taskId",  (parseInt(taskId) + 1).toString())
	let newTask: Task = {
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

function editTask(event: MouseEvent): void {
	const updatedTask: string | null = prompt("Task description");
	if (updatedTask === "") {
		editTask(event);
	} else if (updatedTask) {
		let id = (event.target as HTMLElement).parentElement?.id;
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

function deleteTask(event: MouseEvent): void {
	let taskContainer = (event.target as HTMLElement).parentElement;
	let id = taskContainer?.id;
	for (let t of tasks) {
		if (t.id === id) {
			t.isFinished = true;
			if (taskContainer?.classList.contains("finished")) {
				tasks = tasks.filter((e) => e.id !== id);
			}
			break;
		}
	}

	updateStorage();
	displayTasks();
}

function updateStorage(): void {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(): void {
	const completedTasks: HTMLDivElement[] = [];
	const activeTasks: HTMLDivElement[] = [];

	for (let task of tasks) {
		const taskItem: HTMLDivElement = document.createElement("div");
		const taskDetail: HTMLDivElement = document.createElement("div");
		const taskEdit: HTMLButtonElement = document.createElement("button");
		const taskDelete: HTMLButtonElement = document.createElement("button");

		taskItem.id = task.id.toString();
		if (task.isFinished) {
			taskItem.classList = "task-item finished";
		} else {
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
		} else {
			activeTasks.push(taskItem);
		}
	}

	tasksContainer?.replaceChildren();

    const title1: HTMLHeadingElement = document.createElement("h2");
    title1.textContent = "Available Tasks";
    tasksContainer?.appendChild(title1);
	for (let task of activeTasks) {
		tasksContainer?.appendChild(task);
	}

    const title2: HTMLHeadingElement = document.createElement("h2");
    title2.textContent = "Completed Tasks";
    tasksContainer?.appendChild(title2);
    for (let task of completedTasks) {
        tasksContainer?.appendChild(task);
    }
}

displayTasks();
