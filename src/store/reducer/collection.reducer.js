import { COLLECTION_REQUEST, LOAD_COLLECTION_SUCCESS, SET_COLLECTION_FILTER, SET_COLLECTION_FROM_DATE, SET_COLLECTION_FROM_TO } from "../actions/collection.action";

const initialState = {
    loading: false,
    refreshNeeded: true,
    collectedBy: "",
    from: "",
    to: "",
    data: [],
}

export const collectionReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOAD_COLLECTION_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
                refreshNeeded: false,
                totalCollection: action.payload.totalCollection
            }
        case COLLECTION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SET_COLLECTION_FILTER:
            return {
                ...state,
                collectedBy: action.payload,
                refreshNeeded: true
            }
        case SET_COLLECTION_FROM_DATE:
            return {
                ...state,
                from: action.payload,
                refreshNeeded: true
            }
        case SET_COLLECTION_FROM_TO:
            return {
                ...state,
                to: action.payload,
                refreshNeeded: true
            }
        default: 
            return state;
    }
}