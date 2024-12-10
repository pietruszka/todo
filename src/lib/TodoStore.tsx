import React from "react";
import type { Todo } from "./types";

interface TodoStore {
	todos: Todo[];
}

interface TodoContextStore extends TodoStore {
	setTodos: (todos: Todo[]) => void;
	addTodo: (title: Todo) => void;
	markComplete: (id: Todo["id"]) => void;
	deleteTodo: (id: Todo["id"]) => void;
}

const initialContext: TodoContextStore = {
	todos: [],
	setTodos: () => {},
	addTodo: () => {},
	markComplete: () => {},
	deleteTodo: () => {},
};

const Context = React.createContext<TodoContextStore>(initialContext);

export function useTodoStore() {
	return React.useContext(Context);
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
	const [todos, setTodos] = React.useState<Todo[]>([]);

	return (
		<Context.Provider
			value={{
				todos,
				setTodos,
				addTodo,
				markComplete,
				deleteTodo,
			}}
		>
			{children}
		</Context.Provider>
	);

	function addTodo(todo: Todo) {
		setTodos((prev) => [...prev, todo]);
	}

	function markComplete(id: Todo["id"]) {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	}

	function deleteTodo(id: Todo["id"]) {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	}
}
