import React from "react"

export const LoanFilter = ()=>{
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
                <select>
                    <option value={'GROUP'}>Group</option>
                    <option value={'CUSTOMER'}>Customer</option>
                    <option value={'EMI_INTERVAL'}>EMI Interval</option>
                    <option value={'LOAN_SANCTIONED_DATE'}>Loan Sanctioned Date</option>
                </select>
            </div>
        </div>
    )
}