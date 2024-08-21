import { EMPLOYEE_REQ_SUCCESS, FETCH_EMPLOYEE_LIST_REQUEST, SET_EMP_SEARCHQUERY, SET_EMP_SORT, SET_EMPLOYEE_SUCCESS_DATA } from "../actions/employee.action"

const initialState = {
    employees: [],
    status: 'active',
    error: null,
    searchQuery: '',
    sortKey: 'firstName',
    sortOrder: 'asc',
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 25,
    totalCount: 0,
    needRefresh: true,
    loading: true
}

export const employeeReducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_EMPLOYEE_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SET_EMPLOYEE_SUCCESS_DATA:
            return {
                ...state,
                employees: action.payload.data,
                totalCount: action.payload.totalCount,
                totalPages: action.payload.totalPages,
                loading: false,
                needRefresh: false
            }
        case SET_EMP_SEARCHQUERY:
            return {
                ...state,
                searchQuery: action.payload,
                needRefresh: true
            }
        case SET_EMP_SORT:
            return {
                ...state,
                sortKey: action.payload.key,
                sortOrder: action.payload.direction,
                needRefresh: true
            }
        default:
            return state;
    }
}