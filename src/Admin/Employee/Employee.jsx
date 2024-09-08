import React, { useEffect, useRef, useState } from "react";
import Grid from "../../Element/Grid";
import apiService from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchEmpList, setEmployeeSearchQuery, setEmployeeTableSort } from "../../store/actions/employee.action";
import { Link, Outlet, useLocation } from "react-router-dom";
import Spinner from "../../Element/Spinner";
const columns = [
  {
    columnKey: '_id',
    desc: 'ID',
    display: (item)=> <Link to={`/employee/detail/${item._id}`}>{item._id}</Link>
  },
  {
    columnKey: 'firstName',
    desc: 'Name',
    display: (item)=> (`${item.firstName} ${item.lastName}`)
  },
  {
    columnKey: 'role',
    desc: 'Role'
  },
  {
    columnKey: 'email',
    desc: 'Email'
  },
  {
    columnKey: 'phone',
    desc: 'Phone'
  }
]
const Employee = () => {
  const {
    employees,
    status,
    error,
    searchQuery,
    sortKey,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    totalCount,
    needRefresh,
    loading
  } = useSelector((state) => state.employee)
  const dispatch = useDispatch();
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/employee/detail') || location.pathname.includes('/add-employee');
  useEffect(() => {
    if (needRefresh) {
      dispatch(fetchEmpList());
    }
  }, [dispatch, sortKey, sortOrder, currentPage, itemsPerPage]);

  const handleSort = (e) => {
      dispatch(setEmployeeTableSort(e))
  };

  const debounceTimeout = useRef(null);
  const searchCustomer = (e) => {
    const value = e.target.value;
    dispatch(setEmployeeSearchQuery(value));
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      dispatch(fetchEmpList());  // Dispatch the async action to fetch data
    }, 500);
  }

  const handlePageChange = (page) => {
    //dispatch(setCurrentPage(page));
  }

  const handlePerPageItem = (item) => {
    //dispatch(setPerPageItem(item))
  }

  const gotoAddCustomer = () => {

  }

  return (
    <React.Fragment>
      {isDetailPage ? <Outlet /> :
        (<div className="container">
          {status === 'loading' ? <Spinner /> : ''}
          <div className="page_tool">
            <div className="page_info">
              <h3>Customer</h3>
              <input
                type="text"
                value={searchQuery}
                placeholder={`Search Customer`}
                onChange={searchCustomer}
                className="search__input" />
            </div>
            <div className="right_toolbar">
              <Link to={`/employee/add-employee`} >
                <FontAwesomeIcon title="Add Employee" icon={faPlus} />&nbsp; Add Employee
              </Link>
            </div>
          </div>
          <Grid
            data={employees}
            columns={columns}
            itemsPerPage={itemsPerPage}
            sortChange={handleSort}
            totalCount={totalCount}
            totalPages={totalPages}
            currentPage={currentPage}
            sortKey={sortKey}
            sortOrder={sortOrder}
            pageChange={handlePageChange}
            perPageChange={handlePerPageItem}
            sort={true}
            pagination={true}
          />
        </div>)
      }
      {loading && <Spinner /> }
    </React.Fragment>
  )
}

export default Employee;