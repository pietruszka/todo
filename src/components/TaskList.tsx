import type { ReactNode } from "react";
import type { Todo } from "../lib/types.ts";
import "./TaskList.css";
import React from "react";
import { cn } from "../lib/utils.ts";

export const TaskList = ({
	children,
	id,
}: { children: ReactNode; id?: string }) => {
	return (
		<div id={id} className="task-list">
			{children}
		</div>
	);
};

TaskList.Item = ({
	item,
	onClick,
	onRemove,
}: { item: Todo; onClick: () => void; onRemove: () => void }) => {
	return (
		<div className="task-list-item-container" data-testid="task-list-item">
			<button
				type="button"
				className={cn("task-list-item", item.completed && "completed")}
				onClick={onClick}
			>
				{item.title}
			</button>
			<button
				type="button"
				className="task-list-item-remove"
				onClick={onRemove}
			>
				x
			</button>
		</div>
	);
};
