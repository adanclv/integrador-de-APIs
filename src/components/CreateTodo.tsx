import { useState } from "react"
import { type TodoTitle } from "../types/todo"

interface Props {
    saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    const [inputValue, setInputValue] = useState('')

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        saveTodo({ title: inputValue })
        setInputValue('')
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value
        setInputValue(newValue)
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <input
                className="new-todo"
                value={inputValue}
                onChange={(e) => handleOnChange(e)}
                placeholder="¿Qué quieres hacer?"
                autoFocus
            />
        </form>

    )
}