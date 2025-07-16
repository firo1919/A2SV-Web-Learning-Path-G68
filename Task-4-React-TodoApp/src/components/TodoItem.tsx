import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { FaCalendar, FaPen, FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import TodoService from "../services/todoservice";
import type { Todo } from "../types/todo";

interface Props {
	readonly todo: Todo;
	readonly setTodos: Dispatch<SetStateAction<Todo[]>>;
}

function TodoItem({ todo, setTodos }: Props) {
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(todo.description);

	function handleCheckClick() {
		todo.isFinished = !todo.isFinished;
		const newtodo = TodoService.updateTodo(todo);
		setTodos((prev) => prev.map((t) => (t.id === newtodo?.id ? newtodo : t)));
	}

	function handleDelete() {
		TodoService.deleteTodo(todo.id);
		setTodos((prev) => prev.filter((t) => t.id !== todo.id));
	}

	function handleAccept() {
		if (value) {
			todo.description = value;
			const newtodo = TodoService.updateTodo(todo);
			setTodos((prev) => prev.map((t) => (t.id === newtodo?.id ? newtodo : t)));
		}
		setEditing(false);
		setValue(todo.description);
	}

	function handleSkip() {
		setEditing(false);
		setValue(todo.description);
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const newValue = event.currentTarget.value;
		setValue(newValue);
	}

	return (
		<div className="todo-item">
			<input type="checkbox" checked={todo.isFinished} onClick={handleCheckClick} className="checkbox" />
			{editing ? (
				<div className="todo-editor">
					<input value={value} onChange={(e) => handleInputChange(e)} type="text" className="editor-input" />
					<button onClick={handleAccept} className="accept-edit">
						<FaCheck />
					</button>
					<button onClick={handleSkip} className="skip-edit">
						X
					</button>
				</div>
			) : (
				<>
					<div className="todo-detail">
						<div className={todo.isFinished ? "completed-todo" : ""}>{todo.description}</div>
						<div className="todo-date">
							<FaCalendar />
							{todo.time} {todo.isFinished && <span className="completed">completed</span>}
						</div>
					</div>

					<button className="pen" onClick={() => setEditing(true)}>
						<FaPen />
					</button>
					<button className="trash" onClick={handleDelete}>
						<FaRegTrashAlt />
					</button>
				</>
			)}
		</div>
	);
}
export default TodoItem;
