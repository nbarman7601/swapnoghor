import { useId } from "react"
import { useTableContext } from "./TableContext";

export const Theader = ({ columnKey, desc }) => {
 
    const { state, dispatch } = useTableContext();
    const { sortField, sortOrder } = state;

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch({ type: 'SET_SORT', payload: { field, order } });
    };
    return (
        // <th onClick={sortData}>{desc} <span className="sort-icon">⇅</span></th>
        <th onClick={() => handleSort(columnKey)}>{desc} 
        { (sortField === columnKey && sortOrder === 'asc') ? '▲' : 
        (sortField === columnKey && sortOrder === 'desc') ? '▼' : '' }
       </th>
    )
}