import apiService from "../../axios";

export const FETCH_GROUP_REQUEST = 'FETCH_GROUP_REQUEST';
export const SET_GROUP_RESPONSE = 'SET_GROUP_RESPONSE';
export const SET_GROUP_ERROR = 'SET_GROUP_ERROR';
export const SET_GROUP_SORT = 'SET_GROUP_SORT';
export const SET_GROUP_SEARCH_QUERY = 'SET_GROUP_SEARCH_QUERY';
export const SET_GROUP_ITEM_PER_PAGE = 'SET_GROUP_ITEM_PER_PAGE';
export const SET_GROUP_PAGE = 'SET_GROUP_PAGE';
export const fetchGroupRequest = ()=>({type: FETCH_GROUP_REQUEST})
export const fetchGroupRequestFailure = (error)=>({type: SET_GROUP_ERROR, payload: error})
export const setGroupRequestSuccess = (data)=>({type: SET_GROUP_RESPONSE, payload: data})
export const setGroupTableSort = (e)=> ({type: SET_GROUP_SORT, payload: e});

export const setGroupSearchQuery = (value)=> ({type: SET_GROUP_SEARCH_QUERY, payload: value})

export const setGroupItemPerPage = (e)=>({type: SET_GROUP_ITEM_PER_PAGE, payload: e })

export const setGroupCurrentPage = (page)=>({type: SET_GROUP_PAGE, payload: page});

export const fetchGroupApiCall = ()=>{
     return async (dispatch, getState)=>{
        dispatch(fetchGroupRequest());
        try {
            const { 
                searchQuery, 
                sortKey,
                sortOrder,
                currentPage, 
                itemsPerPage,
            } = getState().groups;
            const response = await apiService.get(`group/list`, {
                params: {
                    search: searchQuery,
                    sortBy: sortKey, 
                    sort: sortOrder, 
                    page: currentPage,
                    limit: itemsPerPage,
                    status: 'active',
              } 
           })
           dispatch(setGroupRequestSuccess(response))
        } catch (error) {
            dispatch(fetchGroupRequestFailure(error))
        }
     }
}