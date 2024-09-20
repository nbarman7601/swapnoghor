export const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';
export const RESET_GLOBAL_ERROR = 'RESET_GLOBAL_ERROR';
export const setAdminError = (error)=>({type: SET_GLOBAL_ERROR, payload: error})
export const resetGlobalError = ()=> ({type: RESET_GLOBAL_ERROR})
export const setGlobalError = (error)=>{
    return async (dispatch, getState)=>{
        console.log(error);
        dispatch(setAdminError(error));
        setTimeout(()=>{
            dispatch(resetGlobalError())
        }, 10000)
    }
}

