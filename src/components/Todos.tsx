import { type TodoEdite, type TodoId, type ListOfTodos, type TodoToggleComplete } from "../types/todo"
import { Todo } from "./Todo"

interface Props  {
    todos: ListOfTodos,
    onCompletedTodo: ({ id, completed }: TodoToggleComplete) => void,
    onRemoveTodo: ({id}: TodoId) => void,
    onEditingTodo: ({id, title}: TodoEdite) => void
}

export const Todos: React.FC<Props> = ({ todos, onCompletedTodo, onRemoveTodo, onEditingTodo }) => {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
                    <Todo
                        key={todo.id} 
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onCompletedTodo={onCompletedTodo}
                        onRemoveTodo={onRemoveTodo}
                        onEditingTodo={onEditingTodo}
                    />
                </li>
            ))}
        </ul>
    )
}