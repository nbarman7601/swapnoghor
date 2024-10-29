import apiService from "../../axios";
import { setGlobalError } from "./global.action";

export const SET_OVERDUE_STARTDATE = 'SET_OVERDUE_STARTDATE';
export const SET_OVERDUE_ENDDATE = 'SET_OVERDUE_ENDDATE';
export const OVERDUE_REQUEST_START = 'OVERDUE_REQUEST_START';
export const OVERDUE_SUCCESS_RESPONSE = 'OVERDUE_SUCCESS_RESPONSE';
export const SET_OVERDUE_CURRENT_PAGE = 'SET_OVERDUE_CURRENT_PAGE';
export const SET_OVERDUE_PER_PAGE_ITEM = 'SET_OVERDUE_PER_PAGE_ITEM';
export const setOverdueStartDate = (date)=>({ type: SET_OVERDUE_STARTDATE, payload: date });
export const setOverdueEndDate = (date)=>({ type: SET_OVERDUE_ENDDATE, payload: date });
export const requestOverdue = ()=>({ type: OVERDUE_REQUEST_START });
export const setOverdueData = (data)=>({ type: OVERDUE_SUCCESS_RESPONSE, payload: data });
export const setOverdueCurrentPage = (page) => ({ type: SET_OVERDUE_CURRENT_PAGE, payload: page });
export const setOverduePerPageItem = (item)=> ({ type: SET_OVERDUE_PER_PAGE_ITEM, payload: item });

export const fetchOverDueList = ()=>{
    return async (dispatch, getState) => {
        const {
            startDate,
            endDate,
            currentPage,
            itemsPerPage
        } = getState().overdue;
        dispatch(requestOverdue());
        try {
            const response = await apiService.get(`loan/installment/overdue-list`, { params: {
                startDate,
                endDate,
                page: currentPage,
                limit: itemsPerPage
            }});
            dispatch(setOverdueData(response))
        } catch (error) {
            dispatch({type: 'stop/loader'})
            dispatch(setGlobalError(`Something Went Wrong. Try after sometimes`));
        }
    }
}