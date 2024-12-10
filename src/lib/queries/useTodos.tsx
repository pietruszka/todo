import { useEffect, useState } from "react";
import { useTodoStore } from "../TodoStore.tsx";
import { request } from "../request.ts";
import type { Todo } from "../types.ts";

export function useTodos() {
	const { setTodos, todos } = useTodoStore();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		request
			.get<Todo[]>("/todos")
			.then((response) => {
				setTodos(response.data);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
				setError("Failed to fetch todos");
			});
	}, [setTodos]);

	return {
		data: todos,
		isLoading,
		error,
	};
}
