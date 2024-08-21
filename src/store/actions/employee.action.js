import apiService from "../../axios";

export const FETCH_EMPLOYEE_LIST_REQUEST = 'FETCH_EMPLOYEE_LIST_REQUEST';
export const EMPLOYEE_REQ_SUCCESS = 'EMPLOYEE_REQ_SUCCESS';
export const SET_EMPLOYEE_SUCCESS_DATA = 'SET_EMPLOYEE_SUCCESS_DATA';
export const SET_EMPLOYEE_ERROR = 'SET_EMPLOYEE_ERROR';
export const SET_EMP_SEARCHQUERY = 'SET_EMP_SEARCHQUERY';
export const SET_EMP_SORT = 'SET_EMP_SORT';
export const fetchEmployeeRequest = ()=>({type: FETCH_EMPLOYEE_LIST_REQUEST});
export const setEmpListData = (response)=>({type: SET_EMPLOYEE_SUCCESS_DATA, payload: response});
export const setEmpError = (error)=> ({type: SET_EMPLOYEE_ERROR, payload: error});
export const setEmployeeSearchQuery=(data)=>({type: SET_EMP_SEARCHQUERY, payload: data});
export const setEmployeeTableSort=(sortInfo)=>({type: SET_EMP_SORT, payload: sortInfo})
export const fetchEmpList =()=>{
    return async (dispatch, getState)=>{
        const { 
            searchQuery, 
            sortKey,
            sortOrder,
            currentPage, 
            itemsPerPage,
        } = getState().employee;
        dispatch(fetchEmployeeRequest());
        try {
          const response = await apiService.get('/user/userlist', {
            params: {
              search: searchQuery,
              sortBy: sortKey, 
              sort: sortOrder, 
              page: currentPage,
              limit: itemsPerPage,
              status: 'active',
              searchBy: ''
            },
          });
          dispatch(setEmpListData(response));
        } catch(err){
          dispatch(setEmpError(err))
        }
    }
}