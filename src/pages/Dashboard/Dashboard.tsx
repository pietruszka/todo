import React from "react";
import { TodoListPanel } from "./TodoListPanel.tsx";

export function Dashboard() {
	return (
		<div className="page">
			<TodoListPanel />
		</div>
	);
}
