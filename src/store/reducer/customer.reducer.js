// src/reducers/CUSTOMERSReducer.js
import {
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_CUSTOMERS_FAILURE,
    SET_SEARCH_QUERY,
    SET_SORT_KEY,
    SET_SORT_ORDER,
    SET_CURRENT_PAGE,
    SET_SORT,
    SET_CUSTOMER_PER_PAGE_ITEM,
  } from '../actions/customer.action';
  
  const initialState = {
    customers: [],
    status: 'active',
    error: null,
    searchQuery: '',
    sortKey: 'sanctioned_date',
    sortOrder: 'asc',
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 25,
    totalCount: 0
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CUSTOMERS_REQUEST:
        return { ...state, status: 'loading' };
      case FETCH_CUSTOMERS_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          customers: action.payload.data,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          totalCount: action.payload.totalCount
        };
      case FETCH_CUSTOMERS_FAILURE:
        return { ...state, status: 'failed', error: action.payload };
      case SET_SEARCH_QUERY:
        return { ...state, searchQuery: action.payload };
      case SET_SORT_KEY:
        return { ...state, sortKey: action.payload };
      case SET_SORT_ORDER:
        return { ...state, sortOrder: action.payload };
      case SET_CURRENT_PAGE:
        return { ...state, currentPage: action.payload };
      case SET_SORT:
        return {...state, sortKey: action.payload.key, sortOrder: action.payload.direction };
      case SET_CUSTOMER_PER_PAGE_ITEM:
        return {  ...state, itemsPerPage: action.payload}
      default:
        return state;
    }
  };
  
  export default customerReducer;
  