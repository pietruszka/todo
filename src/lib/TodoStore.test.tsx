import { renderHook } from "@testing-library/react";
import { act } from "react";
import { TodoProvider, useTodoStore } from "./TodoStore.tsx";

describe("TodoStore", () => {
	describe("when initialized", () => {
		it("should have an empty list", () => {
			const storeContext = setupContext();

			expect(storeContext.result.current.todos).toEqual([]);
		});
	});

	describe("when adding a todo", () => {
		it("should add the todo to the list", async () => {
			const storeContext = setupContext();

			await act(() => {
				storeContext.result.current.addTodo({
					id: 1,
					completed: false,
					title: "My first task",
				});
			});

			expect(storeContext.result.current.todos).toEqual([
				{ id: 1, completed: false, title: "My first task" },
			]);
		});
	});

	describe("when marking a todo as completed", () => {
		it("should update the todo", async () => {
			const storeContext = setupContext();

			await act(() => {
				storeContext.result.current.setTodos([
					{ id: 1, completed: false, title: "My first task" },
				]);
			});

			expect(storeContext.result.current.todos).toEqual([
				{ id: 1, completed: false, title: "My first task" },
			]);

			await act(() => {
				storeContext.result.current.markComplete(1);
			});

			expect(storeContext.result.current.todos).toEqual([
				{ id: 1, completed: true, title: "My first task" },
			]);
		});
	});

	describe("when deleting a todo", () => {
		it("should remove the todo from the list", async () => {
			const storeContext = setupContext();

			await act(() => {
				storeContext.result.current.setTodos([
					{ id: 1, completed: false, title: "My first task" },
					{ id: 2, completed: false, title: "My second task" },
				]);
			});

			await act(() => {
				storeContext.result.current.deleteTodo(1);
			});

			expect(storeContext.result.current.todos).toEqual([
				{ id: 2, completed: false, title: "My second task" },
			]);
		});
	});
});

function setupContext() {
	return renderHook(() => useTodoStore(), {
		wrapper: TodoProvider,
	});
}
