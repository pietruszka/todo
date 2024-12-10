import { useState } from "react";
import "./TaskInputPanel.css";
import React from "react";

export function TaskInputPanel({ onAdd }: { onAdd: (value: string) => void }) {
	const [title, setTitle] = useState("");

	return (
		<div className="task-input-panel">
			<input
				type="text"
				value={title}
				placeholder="Add a task"
				onChange={({ target: { value } }) => setTitle(value)}
			/>
			<button disabled={!title} type="button" onClick={acceptInput}>
				Add
			</button>
		</div>
	);

	function acceptInput() {
		onAdd(title);
		setTitle("");
	}
}
