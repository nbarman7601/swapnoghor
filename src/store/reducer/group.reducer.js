import { FETCH_GROUP_REQUEST,
     SET_GROUP_PAGE, 
     SET_GROUP_RESPONSE, 
     SET_GROUP_SEARCH_QUERY, 
     SET_GROUP_SORT ,
     SET_GROUP_ITEM_PER_PAGE
    } from "../actions/group.action"

const initialState = {
    groups:[],
    status: 'active',
    error: null,
    searchQuery: '',
    sortKey: 'name',
    sortOrder: 'asc',
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 25,
    totalCount: 0,
    loading: false
}

export const groupReducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_GROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SET_GROUP_RESPONSE:
            return {
                ...state,
                groups: action.payload.data,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
                loading: false
            }
        case SET_GROUP_SORT:
            return {
                ...state,
                sortKey: action.payload.key,
                sortOrder: action.payload.direction
            }
        case SET_GROUP_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            }
        case SET_GROUP_ITEM_PER_PAGE:
            return {
                ...state,
                itemsPerPage: action.payload
            }
        case SET_GROUP_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state;
    }
}