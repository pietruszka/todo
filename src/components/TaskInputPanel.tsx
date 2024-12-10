import { useState } from "react";
import "./TaskInputPanel.css";
import React from "react";

export function TaskInputPanel({
	disable,
	onAdd,
}: { disable: boolean; onAdd: (value: string) => void }) {
	const [title, setTitle] = useState("");

	return (
		<div className="task-input-panel">
			<input
				type="text"
				value={title}
				placeholder="Add a task"
				disabled={disable}
				onChange={({ target: { value } }) => setTitle(value)}
			/>
			<button disabled={!title || disable} type="button" onClick={acceptInput}>
				Add
			</button>
		</div>
	);

	function acceptInput() {
		onAdd(title);
		setTitle("");
	}
}
