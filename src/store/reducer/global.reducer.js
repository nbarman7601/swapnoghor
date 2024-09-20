import { RESET_GLOBAL_ERROR, SET_GLOBAL_ERROR } from "../actions/global.action"

const initialState = {
    error: '',
    display: false
}

export const globalReducer = (state = initialState, {type, payload})=>{
    switch(type){
        case SET_GLOBAL_ERROR: 
            return {
                ...state,
                error: payload,
                display: true
            };
        case RESET_GLOBAL_ERROR: 
            return {
                ...state,
                display: false
            }
        default: 
            return state;
    }
}