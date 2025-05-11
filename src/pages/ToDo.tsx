import { type JSX, useEffect, useState } from "react"
import { Todos } from "../components/Todos"
import { type FilterValue, type TodoTitle, type TodoId, type Todo } from "../types/todo"
import { TODO_FILTERS } from "../consts"
import { CreateTodo } from "../components/CreateTodo"
import { Filters } from "../components/Filters"
import { Header } from "../components/Header"
import '../styles/todo.css';
import useTodo from "../hooks/useTodo"

export const TodoPage = (): JSX.Element => {
    const { todos, getTodos, addTodo, updateTodo, deleteTodo } = useTodo()
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
    const filteredTodos = todos.filter(todo => {
        if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
        if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
        return todo
    })
    const activeCount = todos.filter(todo => !todo.completed).length
    const completedCount = todos.length - activeCount

    const handleRemove = ({ id }: TodoId) => {
        deleteTodo(id);
    }

    const handleCompleted = ({ id, title, completed }: Todo) => {
        updateTodo({ id, title, completed })
    }

    const handleFilterChange = (filter: FilterValue): void => {
        setFilterSelected(filter)
    }

    const handleRemoveAllCompleted = (): void => {
        // const newTodos = todos.filter(todo => !todo.completed)
        // setTodos(newTodos)
    }

    const handleEditing = ({ id, title, completed }: Todo): void => {
        updateTodo({ id, title, completed })
    }

    const handleAddTodo = ({ title }: TodoTitle): void => {
        addTodo({ title })
    }

    useEffect(() => {
        getTodos()
    }
        , [handleAddTodo, handleRemove, handleCompleted, handleEditing]);

    return (
        <>
        <Header />
            <div className="bodyTodo">
                <div className=" todoapp">
                    <header>
                        <h1>Todo</h1>
                        <CreateTodo saveTodo={handleAddTodo} />
                    </header>

                    <Todos
                        onCompletedTodo={handleCompleted}
                        onRemoveTodo={handleRemove}
                        onEditingTodo={handleEditing}
                        todos={filteredTodos} />

                    <footer className="footer">
                        <span className="todo-count">
                            <strong>{activeCount}</strong> tareas pendientes
                        </span>

                        <Filters
                            filterSelected={filterSelected}
                            onFilterChange={handleFilterChange}
                        />

                        {/* {
                            completedCount > 0 && (
                                <button
                                    className="clear-completed"
                                    onClick={handleRemoveAllCompleted}
                                >
                                    Borrar completadas
                                </button>
                            )
                        } */}
                    </footer>
                </div>
            </div>
        </>
    )
}