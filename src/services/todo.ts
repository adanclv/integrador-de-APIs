import { type Todo } from "../types/todo";

const ENDPOINT_TODO = "http://localhost:3000/api/todo";

export const fetchTodos = async () => {
    try {
        const response = await fetch(ENDPOINT_TODO);
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Error fetching todo data: " + error);
    }
}

export const createTodo = async (todo: { title: string }) => {
    try {
        const response = await fetch(ENDPOINT_TODO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Error adding todo data: " + error);
    }
}

export const updateTodoItem = async (todo: Todo) => {
    try {
        const response = await fetch(`${ENDPOINT_TODO}/${todo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Error updating todo data: " + error);
    }
}

export const deleteTodoItem = async (id: number) => {
    try {
        const response = await fetch(`${ENDPOINT_TODO}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting todo data: " + response.statusText);
        }
    } catch (error) {
        throw new Error("Error deleting todo data: " + error);
    }
}