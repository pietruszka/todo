import React from "react";
import { TaskInputPanel } from "../../components/TaskInputPanel.tsx";
import { TaskList } from "../../components/TaskList.tsx";
import { useTodoStore } from "../../lib/TodoStore.tsx";
import "./TaskListPanel.css";
import { useAddTodos } from "../../lib/mutations/useAddTodos.ts";
import { useTodos } from "../../lib/queries/useTodos.tsx";

export function TodoListPanel() {
	const { markComplete, deleteTodo } = useTodoStore();
	const todos = useTodos();
	const addTodo = useAddTodos();
	const error = todos.error || addTodo.error;

	return (
		<div>
			{error && <ErrorMessage error={error} />}
			<div className="task-list-panel">
				<TaskList>
					{todos.isLoading ? (
						<div>Loading...</div>
					) : (
						todos.data.map((todo) => (
							<TaskList.Item
								key={todo.id}
								item={todo}
								onClick={() => markComplete(todo.id)}
								onRemove={() => deleteTodo(todo.id)}
							/>
						))
					)}
				</TaskList>
				<TaskInputPanel
					disable={addTodo.isLoading || todos.isLoading}
					onAdd={(title) => addTodo.mutate(title)}
				/>
			</div>
		</div>
	);
}

function ErrorMessage({ error }: { error: string }) {
	return <div className="error-message">{error}</div>;
}
