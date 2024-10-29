import { OVERDUE_REQUEST_START, OVERDUE_SUCCESS_RESPONSE, SET_OVERDUE_CURRENT_PAGE, SET_OVERDUE_ENDDATE, SET_OVERDUE_PER_PAGE_ITEM, SET_OVERDUE_STARTDATE } from "../actions/overdue.action"

const initialState = {
    loading: false,
    data: [],
    startDate: '',
    endDate: '',
    currentPage: 1,
    itemsPerPage: 25,
    totalCount: 0,
    totalPages: 0,
    needRefresh: true
}

export const overdueReducer = (state = initialState, action)=>{
    switch( action.type ){
        case OVERDUE_REQUEST_START: 
            return {
                ...state,
                loading: true
            }
        case SET_OVERDUE_STARTDATE:
            return {
                ...state,
                startDate: action.payload,
                needRefresh: true
            };
        case SET_OVERDUE_ENDDATE:
            return {
                ...state,
                endDate: action.payload,
                needRefresh: true
            }
        case OVERDUE_SUCCESS_RESPONSE:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                totalCount: action.payload.totalCount,
                totalPages: action.payload.totalPages,
                needRefresh: false
            }
        case 'stop/loader':
            return {
                ...state,
                loading: false,
                needRefresh: false
            }
        case SET_OVERDUE_PER_PAGE_ITEM:
            return {  
                ...state, 
                itemsPerPage: action.payload, 
                needRefresh: true
            }
        case SET_OVERDUE_CURRENT_PAGE:
            return { 
                ...state, 
                currentPage: action.payload, 
                needRefresh: true 
            };
        default:
            return state;
    }
}