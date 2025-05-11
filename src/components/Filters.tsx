import { type FilterValue } from '../types/todo'
import { FILTERS_BUTTONS } from '../consts'

interface Props {
    filterSelected: FilterValue,
    onFilterChange: (filter: FilterValue) => void
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {    
    return (
        <ul className='filters'>
            {
                Object.entries(FILTERS_BUTTONS).map(([key, {literal, href}]) => {
                    const isSelected = key === filterSelected
                    const clase = isSelected ? 'selected' : ''
                    
                    return (
                        <li key={key}>
                            <a
                                href={href}
                                className={clase}
                                onClick={(event) => {
                                    event.preventDefault()
                                    onFilterChange(key as FilterValue)
                                }}
                            >
                                {literal}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}