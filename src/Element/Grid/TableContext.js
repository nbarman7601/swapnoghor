// TableContext.js
import React, { createContext, useReducer, useContext } from 'react';

const TableContext = createContext();

const initialState = {
  data: [],
  sortField: 'name',
  sortOrder: 'asc', // or 'desc'
  currentPage: 1,
  itemsPerPage: 25,
};

const tableReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_SORT':
      return { ...state, sortField: action.payload.field, sortOrder: action.payload.order };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.payload };
    default:
      return state;
  }
};

export const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tableReducer, initialState);
  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
