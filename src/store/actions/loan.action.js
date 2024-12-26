import apiService from "../../axios";
import * as moment from 'moment';

export const FETCH_LOAN_REQUEST = 'FETCH_LOAN_REQUEST';
export const SET_LOAN_DATA = 'SET_LOAN_DATA';
export const SET_LOAN_REQUEST_FAILURE = 'SET_LOAN_REQUEST_FAILURE';
export const SET_SELECTED_LOAN = 'SET_SELECTED_LOAN';
export const SET_LOAN_SORT = 'SET_LOAN_SORT';
export const SET_LOAN_ITEM_PER_PAGE = 'SET_LOAN_ITEM_PER_PAGE';
export const SET_LOAN_ITEM_PAGE_NO = 'SET_LOAN_ITEM_PAGE_NO';
export const SET_LOAN_SEARCH_QUERY = 'SET_LOAN_SEARCH_QUERY';
export const UPDATE_LOAN_STATUS = 'UPDATE_LOAN_STATUS';
export const UPDATE_LOAN_INTERVAL_FILTER = 'UPDATE_LOAN_INTERVAL_FILTER';
export const UPDATE_SNC_DATE_FILTER = 'UPDATE_SNC_DATE_FILTER';
export const fetchLoanRequest = () => ({ type: FETCH_LOAN_REQUEST });

export const UPDATE_LOAN_SEARCHBY = 'UPDATE_LOAN_SEARCHBY';

export const updateLoanSearchBy = (value)=> ({type: UPDATE_LOAN_SEARCHBY, payload: value});

export const updateLoanSearchQuery = (value)=>({type: SET_LOAN_SEARCH_QUERY, payload: value});

export const fetchLoans = ()=>{
    return async (dispatch, getState)=>{
        const { 
            searchQuery, 
            sortKey,
            sortOrder,
            currentPage, 
            itemsPerPage,
            searchBy,
            status,
            interval,
            groupId,
            from,
            to,
            lo,
            weekday
        } = getState().loans;

        dispatch(fetchLoanRequest());
        try {
            const response = await apiService.get('/loan/loan-list', {
                params: {
                  search: searchQuery,
                  sortBy: sortKey, 
                  sort: sortOrder, 
                  page: currentPage,
                  limit: itemsPerPage,
                  status: status,
                  searchBy: searchBy,
                  groupId: groupId,
                  interval: interval,
                  from: from,
                  to: to,
                  weekday: weekday,
                  lo: lo
                },
              });
              dispatch(fetchLoanSuccess({ ...response  }));
        } catch (error) {
            dispatch(setLoanRequestError(error))
        }
    }
}

export const fetchLoanSuccess = (data)=>({type: SET_LOAN_DATA, payload: data });
export const setLoanRequestError = (error)=> ({ type: SET_LOAN_REQUEST_FAILURE, payload: error});
export const setLoanOfficerFilter = (lo)=>({type: 'loan/setLoanFilter', payload: lo});

export const fetchLoanDetails = (id)=>{
    return async (dispatch, getState)=>{
         try {
            dispatch(fetchLoanRequest());
            let response = await apiService.get(`loan/${id}/details`);
            dispatch(setLoanDetail({ 
                ...response, 
                customer: {
                    ...response.customer,
                    createdAt: moment(response.customer.createdAt).format('DD MMM yyyy') 
                }
            }))
         } catch (error) { 
            dispatch(setLoanRequestError(error))
         }
    }
}

export const setLoanSort=({key, direction})=>({type: SET_LOAN_SORT, payload: {key, direction}})

export const setLoanDetail = (data)=>({type: SET_SELECTED_LOAN, payload: data});
export const setLoanItemPageNumber = (data)=>({type: SET_LOAN_ITEM_PER_PAGE, payload: data});
export const setLoanPageNumber = (data)=>({type: SET_LOAN_ITEM_PAGE_NO, payload: data});
export const updateLoanFilterStatus = (data)=>({type: UPDATE_LOAN_STATUS, payload: data});
export const updateLoanIntervalFilter = (filter)=>({type: UPDATE_LOAN_INTERVAL_FILTER, payload: filter})

export const updateSanctionDateFiltr = (data)=>({type: UPDATE_SNC_DATE_FILTER, payload: data});

export const setWeekday = (day)=>({ type: 'loan/weekday', payload: day });

export const resetLoan=()=>({type: 'loan/reset'});
