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
    RESET_CUSTOMER_STATE,
  } from '../actions/customer.action';
  
  const initialState = {
    customers: [],
    status: 'active',
    error: null,
    searchQuery: '',
    sortKey: 'name',
    sortOrder: 'asc',
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 25,
    totalCount: 0,
    needRefresh: true
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CUSTOMERS_REQUEST:
        return { ...state, status: 'loading' };
      case FETCH_CUSTOMERS_SUCCESS:
        return {
          ...state,
          status: 'active',
          customers: action.payload.data,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          totalCount: action.payload.totalCount,
          needRefresh: false
        };
      case FETCH_CUSTOMERS_FAILURE:
        return { ...state, status: 'failed', error: action.payload, needRefresh: false };
      case SET_SEARCH_QUERY:
        return { ...state, searchQuery: action.payload,  needRefresh: true };
      case SET_SORT_KEY:
        return { ...state, sortKey: action.payload, needRefresh: true };
      case SET_SORT_ORDER:
        return { ...state, sortOrder: action.payload, needRefresh: true };
      case SET_CURRENT_PAGE:
        return { ...state, currentPage: action.payload, needRefresh: true };
      case SET_SORT:
        return {...state, sortKey: action.payload.key, sortOrder: action.payload.direction, needRefresh: true };
      case SET_CUSTOMER_PER_PAGE_ITEM:
        return {  
          ...state, 
          itemsPerPage: action.payload, 
          needRefresh: true
        }
      case RESET_CUSTOMER_STATE:
        return initialState;
      default:
        return state;
    }
  };
  
  export default customerReducer;
  