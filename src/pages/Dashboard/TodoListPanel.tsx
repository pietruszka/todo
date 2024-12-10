import React from "react";
import { TaskInputPanel } from "../../components/TaskInputPanel.tsx";
import { TaskList } from "../../components/TaskList.tsx";
import { useTodoStore } from "../../lib/TodoStore.tsx";
import "./TaskListPanel.css";
import { useTodos } from "../../lib/queries/useTodos.tsx";

export function TodoListPanel() {
	const { markComplete, deleteTodo, addTodo } = useTodoStore();
	const todos = useTodos();

	return (
		<div>
			{todos.error && <div className="error-message">{todos.error}</div>}
			<div className="task-list-panel">
				<TaskList>
					{todos.data.map((todo) => (
						<TaskList.Item
							key={todo.id}
							item={todo}
							onClick={() => markComplete(todo.id)}
							onRemove={() => deleteTodo(todo.id)}
						/>
					))}
				</TaskList>
				<TaskInputPanel
					onAdd={(title) => {
						addTodo({ id: todos.data.length + 1, title, completed: false });
					}}
				/>
			</div>
		</div>
	);
}
