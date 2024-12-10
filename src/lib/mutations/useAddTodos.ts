import { useState } from "react";
import { useTodoStore } from "../TodoStore.tsx";
import { request } from "../request.ts";
import type { Todo } from "../types.ts";

export function useAddTodos() {
	const { addTodo } = useTodoStore();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	return {
		isLoading,
		error,
		mutate,
	};

	function mutate(title: Todo["title"]) {
		setIsLoading(true);

		request
			.post<Todo>("/todos", { title, completed: false })
			.then((response) => {
				addTodo(response.data);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
				setError("Failed to add todo");
			});
	}
}
