import { ITEM_LIST_SET_ERROR,
     ITEM_LIST_SET_SEARCH_QUERY, 
     ITEM_LIST_SET_SORT, 
     ITEM_REQUEST_START, 
     ITEM_REQUEST_SUCCESS, 
     SET_ITEM_LIST_REFRESH 
     
} from "../actions/item.action"

const initialState = {
    items: [],
    status: 'active',
    error: null,
    searchQuery: '',
    sortKey: 'name',
    sortOrder: 'asc',
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 25,
    totalCount: 0,
    needRefresh: true,
    loading: false
}


export const itemReducer = (state = initialState, action)=>{
      switch(action.type){
        case ITEM_REQUEST_START:
            return {
                ...state,
                loading: true
            }
        case ITEM_REQUEST_SUCCESS: 
            return {
                ...state,
                loading: false,
                items: action.payload.data,
                totalPages: action.payload.totalPages,
                totalCount: action.payload.totalCount
            }
        case ITEM_LIST_SET_SORT:
            return {
                ...state,
                sortKey: action.payload.key,
                sortOrder: action.payload.direction
            }
        case ITEM_LIST_SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            }
        case ITEM_LIST_SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case SET_ITEM_LIST_REFRESH:
            return {
                ...state,
                needRefresh: true
            }
  
        default:
            return state;
      }
}