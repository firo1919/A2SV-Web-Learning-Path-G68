import type { Todo } from "../types/todo";

const LOCAL_STORAGE_KEY = "todos";

const TodoService = {

    // Get all todos
    getTodos: () : Todo[] => {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        const todos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
        return todos;
    },

    // Add a todo
    addTodo: (description: string) : Todo => {
        const todos: Todo[] = TodoService.getTodos();
        const todoId: string = localStorage.getItem("todoId") || "0";
        localStorage.setItem("todoId",  (parseInt(todoId) + 1).toString())
        const date = new Date();
        const currentTime = date.getMonth() +"/" + date.getDay() + "/" + date.getFullYear();
        
        const newTodo: Todo = {
            id: parseInt(todoId),
            description: description,
            isFinished: false,
            time: currentTime
        };

        todos.push(newTodo);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));

        return newTodo
    },

    // Update a todo
    updateTodo: (todo: Todo) : Todo | null => {
        const todos: Todo[] = TodoService.getTodos();

        const updatedTodos = todos.map((t) => (t.id === todo.id ? todo: t))
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));

        return todo;
    },

    // Remove a todo
    deleteTodo: (id: number) : void => {
        const todos: Todo[] = TodoService.getTodos();

        const updatedTodos = todos.filter(t => (t.id !== id))
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    }
}

export default TodoService