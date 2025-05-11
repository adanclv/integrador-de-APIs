import { type JSX, useState } from "react"
import { Todos } from "../components/Todos"
import { type FilterValue, type TodoEdite, type TodoTitle, type TodoId, type TodoToggleComplete } from "../types/todo"
import { TODO_FILTERS } from "../consts"
import { CreateTodo } from "../components/CreateTodo"
import { Filters } from "../components/Filters"
import '../styles/todo.css';

const mockTodos = [
    {
        id: '1',
        title: 'todo 1',
        completed: true,
    },
    {
        id: '2',
        title: 'todo 2',
        completed: false,
    },
    {
        id: '3',
        title: 'todo 3',
        completed: false,
    }
]

export const TodoPage = (): JSX.Element => {
    const [todos, setTodos] = useState(mockTodos)
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
    const filteredTodos = todos.filter(todo => {
        if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
        if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
        return todo
    })
    const activeCount = todos.filter(todo => !todo.completed).length
    const completedCount = todos.length - activeCount

    const handleRemove = ({ id }: TodoId) => {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
    }

    const handleCompleted = ({ id, completed }: TodoToggleComplete) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed
                }
            }
            return todo
        })

        setTodos(newTodos)
    }

    const handleFilterChange = (filter: FilterValue): void => {
        setFilterSelected(filter)
    }

    const handleRemoveAllCompleted = (): void => {
        const newTodos = todos.filter(todo => !todo.completed)
        setTodos(newTodos)
    }

    const handleEditing = ({ id, title }: TodoEdite): void => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title
                }
            }
            return todo
        })

        setTodos(newTodos)
    }

    const handleAddTodo = ({ title }: TodoTitle): void => {
        const newTodo = {
            title,
            id: crypto.randomUUID(),
            completed: false
        }

        const newTodos = [...todos, newTodo]
        setTodos(newTodos)
    }

    return (
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

                    {
                        completedCount > 0 && (
                            <button
                                className="clear-completed"
                                onClick={handleRemoveAllCompleted}
                            >
                                Borrar completadas
                            </button>
                        )
                    }
                </footer>
            </div>
        </div>
    )
}