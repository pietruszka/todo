import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import React from "react";
import { TodoProvider } from "../../lib/TodoStore.tsx";
import {
	clearAllMocks,
	mockGetRequest,
	mockPostRequest,
} from "../../lib/mockUtils";
import type { Todo } from "../../lib/types";
import { TodoListPanel } from "./TodoListPanel";

describe("TodoListPanel", () => {
	beforeEach(() => {
		clearAllMocks();
	});

	it("should render a list", async () => {
		mockGetRequest("/todos", [
			{ id: 1, completed: false, title: "My first task" },
			{ id: 2, completed: true, title: "My second task" },
		] as Todo[]);

		await setupComponent();

		expect(screen.getAllByTestId("task-list-item")).toHaveLength(2);
		expect(screen.getByText("My first task")).toBeInTheDocument();
		expect(screen.getByText("My second task")).toBeInTheDocument();
	});

	describe("when added a new todo", () => {
		it("should update the list", async () => {
			mockGetRequest<Todo[]>("/todos", [
				{ id: 1, completed: false, title: "My first task" },
				{ id: 2, completed: true, title: "My second task" },
			]);

			mockPostRequest("/todos", {
				id: 3,
				completed: false,
				title: "My third task",
			});

			await setupComponent();
			await act(async () =>
				userEvent.type(
					screen.getByPlaceholderText("Add a task"),
					"My third task",
				),
			);
			await act(async () => userEvent.click(screen.getByText("Add")));

			expect(screen.getAllByTestId("task-list-item")).toHaveLength(3);
			expect(screen.getByText("My third task")).toBeInTheDocument();
		});
	});
});

function setupComponent() {
	return act(async () => render(<TodoListPanel />, { wrapper: TodoProvider }));
}
