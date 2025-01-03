import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutoComplete from "../../Element/AutoComplete/AutoComplete";
import apiService from "../../axios";
import {
  fetchLoans,
  setLoanOfficerFilter,
  setWeekday,
  updateLoanFilterStatus,
  updateLoanIntervalFilter,
  updateLoanSearchBy,
  updateLoanSearchQuery,
  updateSanctionDateFiltr,
} from "../../store/actions/loan.action";
import Button from "../../Element/Button";
import { toast } from "react-toastify";
import moment from "moment";
import { fetchEmpList } from "../../store/actions/employee.action";

function IntervalFilter() {
  const dispatch = useDispatch();
  const { interval } = useSelector((state) => state.loans);
  const handleIntervalChange = (e) => {
    dispatch(updateLoanIntervalFilter(e.target.value));
  };

  return (
    <div className="interval">
      <label htmlFor="Interval">Interval</label>
      <select value={interval} onChange={handleIntervalChange}>
        <option value={""}>--Select Interval--</option>
        <option value={"1W"}>1 Week</option>
        <option value={"2W"}>2 Week</option>
        <option value={"1M"}>1 Month</option>
      </select>
    </div>
  );
}

function SanctionDateFilter() {
  const dispatch = useDispatch();
  const { from, to } = useSelector((state) => state.loans);

  const handleFromDateChange = (e) => {
    let frm = e.target.value;
    dispatch(updateSanctionDateFiltr({ from: frm, to }));
  };

  const handleToDateChange = (e) => {
    let td = e.target.value;
    dispatch(updateSanctionDateFiltr({ from, to: td }));
  };

  const handleSearch = () => {
    if (from == "" || to == "") {
      toast.error("Both dates are required");
      return 0;
    }

    if (moment(from).isAfter(moment(to))) {
      toast.error("From date can not be newer than to date");
      return 0;
    }

    dispatch(fetchLoans());
  };

  return (
    <div className="_date_filter">
      <div className="from__date">
        <label>From</label>
        <input
          type="date"
          onChange={(e) => handleFromDateChange(e)}
          value={from}
        />
      </div>
      <div className="to__date">
        <label>To</label>
        <input type="date" onChange={(e) => handleToDateChange(e)} value={to} />
      </div>
      <div className="btn__search">
        <Button type="search" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}

function WeekdayFilter() {
  const dispatch = useDispatch();
  const { weekday } = useSelector((state) => state.loans);
  const searchHandle = () => {
    dispatch(fetchLoans());
  };

  return (
    <div className="filterweekday">
      <div className="filterItem">
        <span>Week Day</span>
        <select
          value={weekday}
          onChange={(e) => dispatch(setWeekday(e.target.value))}
        >
          <option value={``}>--Select Day--</option>
          <option value={`Sunday`}>Sunday</option>
          <option value={`Monday`}>Monday</option>
          <option value={`Tuesday`}>Tuesday</option>
          <option value={`Wednesday`}>Wednesday</option>
          <option value={`Thursday`}>Thursday</option>
          <option value={`Friday`}>Friday</option>
          <option value={`Saturday`}>Saturday</option>
        </select>
      </div>

      <div className="btn__search">
        <Button type="search" onClick={searchHandle}>
          Search
        </Button>
      </div>
    </div>
  );
}

function LoanOfficerFilter() {
  const { lo } = useSelector((state) => state.loans);
  const { employees = [] } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!employees.length) {
      dispatch(fetchEmpList());
    }
  }, [employees, dispatch]);

  const handleLoanOfficerChange = (event) => {
     dispatch(setLoanOfficerFilter(event.target.value))
  };

  return (
    <div className="filterLoanOfficer">
      <div className="filterItem">
        <span>Loan Officer</span>
        <select
          className="loanOfficer"
          onChange={handleLoanOfficerChange}
          value={lo}
        >
          <option value={``}>--Select Loan Officer--</option>
          {employees.map((employee) => (
            <option value={employee._id} key={employee._id}>
              {employee.firstName + " " + employee.lastName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export const LoanFilter = () => {
  const { searchBy, searchQuery, interval, status } = useSelector(
    (state) => state.loans
  );

  const dispatch = useDispatch();

  const updateSearchBy = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    dispatch(updateLoanSearchBy(value));
  };

  const fetchSuggestions = async (query) => {
    const response = await apiService.get("/group/list", {
      params: {
        search: query,
        sortBy: "name",
        sort: "asc",
        page: 1,
        limit: 25,
        status: "active",
        searchBy: "GROUP",
      },
    });
    return response.data.map((item) => ({ _id: item._id, name: item.name }));
  };

  const handleGroupSelect = (e) => {
    dispatch({ type: "UPDATE_LOAN_GROUP_ID", payload: e._id });
  };

  const updateSearchCustomer = (e) => {
    dispatch(updateLoanSearchQuery(e.target.value));
  };

  const searchHandle = () => {
    dispatch(fetchLoans());
  };

  const handleStatusChange = (e) => {
    dispatch(updateLoanFilterStatus(e.target.value));
  };

  return (
    <div className="loan_filter">
      <div className="status">
        <label htmlFor="status"> Status</label>
        <select value={status} onChange={handleStatusChange}>
          <option value={"active"}>Active</option>
          <option value={"closed"}>Closed</option>
        </select>
      </div>
      <div className="search__by">
        <label htmlFor="SearchBy">Search By</label>
        <select value={searchBy} onChange={(e) => updateSearchBy(e)}>
          <option value={"LONOFCR"}>Loan Officer</option>
          <option value={"GROUP"}>Group</option>
          <option value={"CUSTOMER"}>Customer</option>
          <option value={`WEEKDAY`}>Week Day</option>
          <option value={"INTERVAL"}>EMI Interval</option>
          <option value={"SNC_DATE"}>Loan Sanctioned Date</option>
        </select>
      </div>
      {searchBy === "GROUP" && (
        <div className="search__item">
          <label htmlFor="Group">Group</label>
          <AutoComplete
            fetchSuggestions={fetchSuggestions}
            initialQuery={""}
            onSelect={handleGroupSelect}
          />
        </div>
      )}
      {searchBy === "CUSTOMER" && (
        <React.Fragment>
          <div className="search__item">
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => updateSearchCustomer(e)}
              placeholder="Enter Customer"
            />
          </div>
          <div className="btn-section">
            <Button onClick={searchHandle}>Search</Button>
          </div>
        </React.Fragment>
      )}
      {searchBy == "INTERVAL" && <IntervalFilter />}

      {searchBy == "SNC_DATE" && <SanctionDateFilter />}
      {searchBy == "WEEKDAY" && <WeekdayFilter />}
      {searchBy === "LONOFCR" && <LoanOfficerFilter />}
    </div>
  );
};
