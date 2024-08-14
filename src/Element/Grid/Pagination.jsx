import { useTableContext } from "./TableContext";

export const Pagination = () => {
    const { state, dispatch } = useTableContext();
    const { data, currentPage, itemsPerPage } = state;
    const startIndex = (currentPage - 1) * itemsPerPage;
   
  
    const handlePageChange=(page)=>{
        dispatch({type: 'SET_PAGE', payload: page});
    }

    const handleItemPerPage = (e)=>{
        dispatch({type: 'SET_ITEMS_PER_PAGE', payload: e.target.value})
    }
    return (
        <div className="table__toolbar">
            <div className="item_per_page">
                <select value={itemsPerPage} onChange={(e)=> handleItemPerPage(e)}>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <span>of {data.length}</span>
            </div>

            <div className="pagination">
                <button className="item" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>
                <div className="currentPage item">{currentPage}</div>
                <button className="item" onClick={() => handlePageChange(currentPage + 1)} disabled={startIndex + itemsPerPage >= data.length}>
                    Next
                </button>
            </div>
        </div>

    )
}