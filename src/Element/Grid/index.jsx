// src/Grid.js
import React, { useState } from 'react';
import './index.css';
import PropTypes from 'prop-types';
const Grid = ({ data, totalPages, totalCount, pageChange,
     currentPage, columns, itemsPerPage, sortChange, 
     sort = false, pagination = false,
     sortKey, sortOrder, perPageChange ,
     showIndex = true,
     onContextMenu
    }) => {

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
        if(sort){
            let direction = sortOrder === 'asc' ? 'desc' : 'asc';
            sortChange({ key, direction });
        }
    };

    const setCurrentPage = (page) => {
        pageChange(page);
    }

    const setItemPerPage = (e) => {
        perPageChange(e.target.value)
    }
    const handleContextMenu = (e, item)=>{
        if(onContextMenu){
            e.preventDefault();
            onContextMenu(e, item)
        }
    }

    return (
        <div>
            <table className='grid_table'>
                <thead>
                    <tr>
                        {showIndex ? <th>Sl No</th> : null}
                        {columns.map((column) => (
                            <th key={column.columnKey} onClick={() => handleSort(column.columnKey)}>
                               <span>{column.desc} </span> <span>{sortKey === column.columnKey ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</span>
                            </th>
                        ))}
                    </tr>
                </thead>
                {
                    data ?
                        (<tbody>
                            {data.map((item, index) => (
                                <tr key={item._id} onContextMenu={(e)=> handleContextMenu(e, item)}>
                                    {showIndex ? <td> {pagination ? (index + 1) + ((currentPage - 1) * itemsPerPage) : (index + 1)} </td> : ''}
                                    {columns.map((column, index) => (
                                        <td key={index}>
                                            {
                                                column.display ? column.display(item)
                                                    : item[column.columnKey]
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>)
                        : (<span>No Data Found</span>)
                }
            </table>
               {
                  pagination ?
                    (<div className='grid_toolbar'>
                        <div className='item_per_page'>
                            <select value={itemsPerPage} onChange={setItemPerPage}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            of {totalCount}
                        </div>
                        <div className="pagination">
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                Prev
                            </button>
                            {currentPage}
                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    </div>) 
                    : ''
                }

        </div>
    );
};
Grid.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalPages: PropTypes.number,
    totalCount: PropTypes.number,
    pageChange: PropTypes.func,
    currentPage: PropTypes.number,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            columnKey: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            display: PropTypes.func
        })
    ).isRequired,
    itemsPerPage: PropTypes.number,
    sortChange: PropTypes.func,
    sortKey: PropTypes.string,
    sortOrder: PropTypes.oneOf(['asc', 'desc']),
    perPageChange: PropTypes.func,
    sort: PropTypes.bool,
    pagination: PropTypes.bool
};

// Grid.defaultProps = {
//     sortKey: null,
//     sortOrder: 'asc',
//     sort: false,
//     pagination: false
// };

export default Grid;
