import React from "react"
import { useDispatch, useSelector } from "react-redux"
import AutoComplete from "../../Element/AutoComplete/AutoComplete";
import apiService from "../../axios";
import { fetchLoans, updateLoanSearchBy, updateLoanSearchQuery } from "../../store/actions/loan.action";
import Button from "../../Element/Button";

export const LoanFilter = () => {
    const {
        searchBy,
        searchQuery
    } = useSelector((state) => state.loans);

    const dispatch = useDispatch();

    const updateSearchBy = (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        dispatch(updateLoanSearchBy(value))
    }

    const fetchSuggestions = async (query) => {
        const response = await await apiService.get('/group/list', {
            params: {
                search: query,
                sortBy: 'name',
                sort: 'asc',
                page: 1,
                limit: 25,
                status: 'active',
                searchBy: 'GROUP'
            },
        })
        return response.data.map((item) => ({ _id: item._id, name: item.name }));
    };

    const handleGroupSelect = (e) => {
        dispatch({ type: 'UPDATE_LOAN_GROUP_ID', payload: e._id })
    }

    const updateSearchCustomer = (e)=>{
        dispatch(updateLoanSearchQuery(e.target.value));
    }

    const searchHandle = ()=>{
        dispatch(fetchLoans());
    }

    return (
        <div className="loan_filter">
            <div className="status">
                <label>Status</label>
                <select >
                    <option value={'active'}>Active</option>
                    <option value={'closed'}>Closed</option>
                </select>
            </div>
            <div className="search__by">
                <label>Search By</label>
                <select value={searchBy} onChange={(e) => updateSearchBy(e)}>
                    <option value={'GROUP'}>Group</option>
                    <option value={'CUSTOMER'}>Customer</option>
                    <option value={'EMI_INTERVAL'}>EMI Interval</option>
                    <option value={'LOAN_SANCTIONED_DATE'}>Loan Sanctioned Date</option>
                </select>
            </div>
            {
                searchBy === 'GROUP' ? (
                    <div className="search__item">
                        <label>Group</label>
                        <AutoComplete
                            fetchSuggestions={fetchSuggestions}
                            initialQuery={''}
                            onSelect={handleGroupSelect} />
                    </div>
                ) : searchBy === 'CUSTOMER' ? (
                    <>
                        <div className="search__item">
                            <label>Customer</label>
                            <input type="text" 
                            value={searchQuery}
                            onChange={(e)=> updateSearchCustomer(e)}
                            placeholder="Enter Customer" />
                        </div>
                        <div className="btn-section">
                            <Button onClick={searchHandle}>Search</Button>
                        </div>
                    </>
                ) : null
            }
        </div>
    )
}