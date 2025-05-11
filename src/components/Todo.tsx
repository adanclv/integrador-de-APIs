import { useState } from "react"
import { type TodoId, type Todo as TodoType } from "../types/todo"

interface Props extends TodoType {
    onCompletedTodo: ({ id, title, completed }: TodoType) => void,
    onRemoveTodo: ({ id }: TodoId) => void
    onEditingTodo: ({id, title, completed}: TodoType) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onCompletedTodo, onRemoveTodo, onEditingTodo }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(title)
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onCompletedTodo({
            id, title, completed: event.target.checked
        })
    }

    const handleOnDoubleClick = (): void => {
        setIsEditing(true)
    }

    const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newTitle = event.target.value
        setEditedTitle(newTitle)
    }

    const handleOnBlur = ():void => {
        onEditingTodo({id, title: editedTitle, completed})
        setIsEditing(false)
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        onEditingTodo({id, title: editedTitle, completed})
        setIsEditing(false)
    }

    return (
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={(event) => { handleOnChange(event) }}
            />
            {
                isEditing
                    ?
                    <form onSubmit={handleOnSubmit}>
                        <input
                            type="text"
                            className="new-todo"
                            value={editedTitle}
                            onChange={(e) => handleOnChangeTitle(e)}
                            onBlur={handleOnBlur}
                            autoFocus
                        />
                    </form>
                    : <label
                        onDoubleClick={handleOnDoubleClick}
                        className={isEditing ? 'edit' : ''}
                    >
                        {title}
                    </label>
            }

            <button
                className="destroy"
                onClick={() => { onRemoveTodo({ id }) }}
            />
        </div>
    )
}