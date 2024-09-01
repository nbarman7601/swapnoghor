import apiService from "../../axios";

export const ITEM_REQUEST_START = 'ITEM_REQUEST_START';
export const ITEM_REQUEST_SUCCESS = 'ITEM_REQUEST_SUCCESS';
export const ITEM_LIST_SET_SORT = 'ITEM_LIST_SET_SORT';
export const ITEM_LIST_SET_SEARCH_QUERY = 'ITEM_LIST_SET_SEARCH_QUERY';
export const ITEM_LIST_SET_ERROR = 'ITEM_LIST_SET_ERROR';
export const SET_ITEM_LIST_REFRESH = 'SET_ITEM_LIST_REFRESH';

export const startItemRequest = ()=>({ type: ITEM_REQUEST_START });
export const setSuccessItemCall = (data)=>({ type: ITEM_REQUEST_SUCCESS, payload: data });
export const setItemTableSort=(e)=>({type: ITEM_LIST_SET_SORT, payload: e });
export const setItemSearchQuery = (data)=> ({type: ITEM_LIST_SET_SEARCH_QUERY, payload: data});
export const setItemListError = (error)=>({type: ITEM_LIST_SET_ERROR, payload: error})
export const setItemRefresh = ()=>({type: SET_ITEM_LIST_REFRESH })
export const fetchItems = ()=>{
    return async (dispatch, getState)=>{
        const {
            status,
            searchQuery,
            sortKey,
            sortOrder,
            currentPage,
            totalPages,
            itemsPerPage,
            totalCount
        } = getState().item;
        dispatch(startItemRequest())
        try {
            const response = await apiService.get('product/productlist', {
                params: {
                    search: searchQuery,
                    sortBy: sortKey, 
                    sort: sortOrder, 
                    page: currentPage,
                    limit: itemsPerPage,
                    status: status
                }
            })
            dispatch(setSuccessItemCall(response));
        } catch (error) {
            dispatch(setItemListError(error));
        }
    }
}