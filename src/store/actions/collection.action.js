import apiService from "../../axios";
import { setGlobalError } from "./global.action";

export const LOAD_COLLECTION_SUCCESS = 'LOAD_COLLECTION_SUCCESS';
export const COLLECTION_REQUEST = 'COLLECTION_REQUEST';
export const RESPONSE_COLECTION_ERROR = 'RESPONSE_COLECTION_ERROR';
export const SET_COLLECTION_FILTER = 'SET_COLLECTION_FILTER';
export const SET_COLLECTION_FROM_DATE = 'SET_COLLECTION_FROM_DATE';
export const SET_COLLECTION_FROM_TO = 'SET_COLLECTION_FROM_TO';

export const fetchCollectionRequest = ()=>({type: COLLECTION_REQUEST});
export const setCollectionData = (data)=> ({type: LOAD_COLLECTION_SUCCESS, payload: data})

export const setCollectionFilter = (filterData)=>({ type: SET_COLLECTION_FILTER, payload: filterData });

export const setFromDate = (fromDate)=>({type: SET_COLLECTION_FROM_DATE, payload: fromDate})
export const setToDate =(toDate)=>({type: SET_COLLECTION_FROM_TO, payload: toDate});

export const fetchCollection = ()=>{
    return async (dispatch, getState)=>{
        const {
            collectedBy,
            from,
            to
        } = getState().collection;
        dispatch(fetchCollectionRequest())
        try {
            const response = await apiService.post(`calculation/get-collection`, {
                collectedBy,
                from,
                to
            });
            const totalCollection = response.reduce((sum, item) => sum + item.totalCollection, 0)
            dispatch(setCollectionData({data: response, totalCollection}));
        } catch (error) {
            dispatch(setGlobalError(`Something Went Wrong. Please try after sometimes`));
        }

    }
}