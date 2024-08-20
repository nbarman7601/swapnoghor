export const FETCH_EMPLOYEE_LIST_REQUEST = 'FETCH_EMPLOYEE_LIST_REQUEST';
export const EMPLOYEE_REQ_SUCCESS = 'EMPLOYEE_REQ_SUCCESS';


export const requestEmpList = ()=>({type: FETCH_EMPLOYEE_LIST_REQUEST});
export const fetchEmpList =()=>{
    return async (dispath, getState)=>{
        const { 
            searchQuery, 
            sortKey,
            sortOrder,
            currentPage, 
            itemsPerPage,
        } = getState().employees;
        dispatch(fetchCustomersRequest());
        try {
          const response = await apiService.get('/customer/customerlist', {
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
        } catch(err){

        }
    }
}