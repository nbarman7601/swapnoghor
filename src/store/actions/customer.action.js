import apiService from "../../axios";

export const FETCH_CUSTOMERS_REQUEST = 'FETCH_CUSTOMERS_REQUEST';
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_SORT_KEY = 'SET_SORT_KEY';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_SORT = 'SET_CUSTOMER_SORT';
export const SET_CUSTOMER_PER_PAGE_ITEM = 'SET_CUSTOMER_PER_PAGE_ITEM';
export const RESET_CUSTOMER_STATE = 'RESET_CUSTOMER_STATE';
export const fetchCustomersRequest = () => ({ type: FETCH_CUSTOMERS_REQUEST });
export const fetchCustomersSuccess = (data) => ({ type: FETCH_CUSTOMERS_SUCCESS, payload: data });
export const fetchCustomersFailure = (error) => ({ type: FETCH_CUSTOMERS_FAILURE, payload: error });

export const setSearchQuery = (query) => ({ type: SET_SEARCH_QUERY, payload: query });
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });
export const setSortOrder = (order) => ({ type: SET_SORT_ORDER, payload: order });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });
export const setPerPageItem = (item)=> ({type: SET_CUSTOMER_PER_PAGE_ITEM, payload: item});
export const resetCustomerState = ()=>({type: RESET_CUSTOMER_STATE})
export const setCustomerStatus = (status)=>({type: 'customer/status', payload: status});
export const fetchCustomers=()=>{
    return async (dispatch, getState) => {
        const { 
            searchQuery, 
            sortKey,
            sortOrder,
            currentPage, 
            itemsPerPage,
            status
        } = getState().customers;
        dispatch(fetchCustomersRequest());
        try {
          const response = await apiService.get('/customer/customerlist', {
            params: {
              search: searchQuery,
              sortBy: sortKey, 
              sort: sortOrder, 
              page: currentPage,
              limit: itemsPerPage,
              status: status,
              searchBy: 'GROUP'
            },
          });
          dispatch(fetchCustomersSuccess(response));
        } catch (error) {
          dispatch(fetchCustomersFailure(error.message));
        }
      };
}

