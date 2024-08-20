import apiService from "../../axios";
import * as moment from 'moment';

export const FETCH_LOAN_REQUEST = 'FETCH_LOAN_REQUEST';
export const SET_LOAN_DATA = 'SET_LOAN_DATA';
export const SET_LOAN_REQUEST_FAILURE = 'SET_LOAN_REQUEST_FAILURE';
export const SET_SELECTED_LOAN = 'SET_SELECTED_LOAN';
export const SET_LOAN_SORT = 'SET_LOAN_SORT';
export const SET_LOAN_ITEM_PER_PAGE = 'SET_LOAN_ITEM_PER_PAGE';
export const SET_LOAN_ITEM_PAGE_NO = 'SET_LOAN_ITEM_PAGE_NO';

export const fetchLoanRequest = () => ({ type: FETCH_LOAN_REQUEST });
export const fetchLoans = ()=>{
    return async (dispatch, getState)=>{
        const { 
            searchQuery, 
            sortKey,
            sortOrder,
            currentPage, 
            itemsPerPage,
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
                  status: 'active',
                  searchBy: 'GROUP'
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
