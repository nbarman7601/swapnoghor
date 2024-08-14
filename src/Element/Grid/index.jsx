// src/Grid.js
import React, { useState } from 'react';
import './index.css';
const Grid = ({ data, totalPages, totalCount, pageChange, currentPage, columns, itemsPerPage, sortChange, sortKey, sortOrder, perPageChange }) => {

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
        let direction = sortOrder == 'asc' ? 'desc' : 'asc';
        sortChange({ key, direction });
    };

    const setCurrentPage = (page) => {
        //
        pageChange(page);
    }

    const setItemPerPage = (e) => {
        perPageChange(e.target.value)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.columnKey} onClick={() => handleSort(column.columnKey)}>
                                {column.desc} {sortKey === column.columnKey ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            {columns.map((column, index) => (
                                <td key={index}>{item[column.columnKey]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='grid_toolbar'>
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
            </div>

        </div>
    );
};

export default Grid;
