import { FETCH_LOAN_REQUEST,
     SET_LOAN_DATA, 
     SET_LOAN_ITEM_PAGE_NO, 
     SET_LOAN_ITEM_PER_PAGE, 
     SET_LOAN_REQUEST_FAILURE, 
     SET_LOAN_SORT, 
     SET_SELECTED_LOAN
    
} from "../actions/loan.action"

const initialState = {
    loans: [],
    status: 'active',
    error: null,
    searchQuery: '',
    sortKey: 'sanctioned_date',
    sortOrder: 'desc',
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 25,
    totalCount: 0,
    loading: false,
    selectedLoan: null,
    needRefresh: true
}

export const loanReducer = (state = initialState, action )=>{
    switch(action.type){
        case FETCH_LOAN_REQUEST:
            return { ...state, loading: true}
        case SET_LOAN_DATA: 
            return {
                ...state, 
                loans: action.payload.data, 
                loading: false,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
                needRefresh: false
            }
        case SET_LOAN_REQUEST_FAILURE:
            return { ...state, error: action.payload, loading: false }
        case SET_SELECTED_LOAN:
            return { ...state, selectedLoan: action.payload, loading: false }
        case SET_LOAN_SORT:
            return {
                ...state,
                sortKey: action.payload.key,
                sortOrder: action.payload.direction,
                needRefresh: true
            }
        case SET_LOAN_ITEM_PER_PAGE: 
            return {
                ...state,
                itemsPerPage: action.payload,
                needRefresh: true
            }
        case SET_LOAN_ITEM_PAGE_NO:
            return {
                ...state,
                currentPage: action.payload,
                needRefresh: true
            }
        default:
            return state
    }
}