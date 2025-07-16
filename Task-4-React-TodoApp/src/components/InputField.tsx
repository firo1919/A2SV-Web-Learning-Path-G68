import type { Dispatch, SetStateAction } from "react";
import { useState, type ChangeEvent } from "react";
import TodoService from "../services/todoservice";
import type { Todo } from "../types/todo";

interface Props {
	readonly setTodos: Dispatch<SetStateAction<Todo[]>>;
}

function InputField({ setTodos }: Props) {
    const [value, setValue] = useState("");

    function handleClick(){
        let newTodo: Todo | null = null;
        if(value){
            newTodo = TodoService.addTodo(value);
        }
        if(newTodo){
            setTodos(prevTodos => ([...prevTodos, newTodo]));
        }
        setValue("");
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const newValue = event.currentTarget.value;
        setValue(newValue);
    }

	return (
		<div className="input-field">
			<input value={value} onChange={(e) => handleInputChange(e)} type="text" placeholder="what needs to be done?" />
			<button onClick={handleClick} className="input-button"><span className="add">+</span>Add</button>
		</div>
	);
}
export default InputField;
