import { useState } from "react";
import { type Todo } from "../types/todo";
import { fetchTodos, createTodo, updateTodoItem, deleteTodoItem } from "../services/todo";

const useTodo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const getTodos = async () => {
        try {
            const response = await fetchTodos();
            if (response) {
                setTodos(response);
            }

        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = async (todo: { title: string }) => {
        try {
            const response = await createTodo(todo);
            const newTodo = await response.json();
            setTodos((prevTodos) => [...prevTodos, newTodo]);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const updateTodo = async (todo: Todo) => {
        try {
            const response = await updateTodoItem(todo);
            const updatedTodo = await response.json();
            setTodos((prevTodos) =>
                prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
            );
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await deleteTodoItem(id);
            // setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return { todos, getTodos, addTodo, updateTodo, deleteTodo };
};

export default useTodo;
