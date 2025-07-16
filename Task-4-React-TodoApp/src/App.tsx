import { useEffect, useState } from "react";
import type { Todo } from "./types/todo";
import TodoItem from "./components/TodoItem";
import TodoService from "./services/todoservice";
import "./css/app.css";
import InputField from "./components/InputField";

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [filter, setFilter] = useState(1);
	const totalTodos = todos;
	const activeTodos = todos.filter((t) => !t.isFinished);
	const completedTodos = todos.filter((t) => t.isFinished);

	useEffect(() => {
		const t = TodoService.getTodos();
		setTodos(t);
	}, []);

	return (
		<div className="container">
			<div className="heading">
				<h1>Your Todos</h1>
				<h3>Organize your life with style</h3>
			</div>
			<InputField setTodos={setTodos} />
			<div className="summary-container">
				<div className="total-tasks summary">
					<p className="count">{totalTodos.length}</p>
					<p>Total Todos</p>
				</div>
				<div className="active-tasks summary">
					<p className="count">{activeTodos.length}</p>
					<p>Active Todos</p>
				</div>
				<div className="completed-tasks summary">
					<p className="count">{completedTodos.length}</p>
					<p>Completed Todos</p>
				</div>
			</div>
			<div className="filter">
				<button onClick={() => setFilter(1)} className={filter === 1 ? "all" : "disable-filter"}>
					All {totalTodos.length}
				</button>
				<button onClick={() => setFilter(2)} className={filter === 2 ? "active" : "disable-filter"}>
					Active {activeTodos.length}
				</button>
				<button onClick={() => setFilter(3)} className={filter === 3 ? "finished" : "disable-filter"}>
					Completed {completedTodos.length}
				</button>
			</div>
			{(filter === 1) ? 
                totalTodos.map((todo) => <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />) : (filter === 2) ? 
                activeTodos.map((todo) => <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />) : 
                completedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />)}
		</div>
	);
}
export default App;
