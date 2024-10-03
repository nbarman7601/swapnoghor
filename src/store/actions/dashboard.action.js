import apiService from "../../axios";
import { setGlobalError } from "./global.action";

export const FETCH_DASHBOARD_COUNT_REQUEST = 'dashboard/countRequest';
export const SET_DASHBOARD_COUNT = 'dashboard/setCount';
export const SET_DASHBOARD_ERROR = 'dashboard/countError';

export const fetchCountRequest = ()=>({type: FETCH_DASHBOARD_COUNT_REQUEST})
export const setDashboardCount = (data)=>({type: SET_DASHBOARD_COUNT, payload: data });
export const setDashboardError = (error)=> ({ type: SET_DASHBOARD_ERROR, payload: error })
export const fetchDashboardCount = ()=>{
    return async (dispatch, getState)=>{
        dispatch(fetchCountRequest());
        try {
            const response = await apiService(`/calculation/dashboard`);
            dispatch(setDashboardCount(response));
        } catch (error) {
           dispatch(setDashboardError(error));
           dispatch(setGlobalError(error)) 
        }
    }
}