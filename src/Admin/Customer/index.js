import React, { useCallback, useEffect, useRef, useState } from "react";
import Grid from "../../Element/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  setCurrentPage,
  setCustomerStatus,
  setPerPageItem,
  setSearchQuery,
  setSort,
  setSortKey,
} from "../../store/actions/customer.action";
import Spinner from "../../Element/Spinner";
import "./customer.css";
import HighlightText from "../../common/HighlightText";
import { Link, Outlet, useLocation } from "react-router-dom";
import Button from "../../Element/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileDownload,
  faPlus,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import TruncateText from "../../common/TruncateText";

export const Customer = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const isDetailPage =
    location.pathname.includes("/customer/detail") ||
    location.pathname.includes("/add-customer") ||
    location.pathname.includes("/edit-customer");
  const {
    loading,
    customers,
    status,
    error,
    searchQuery,
    sortKey,
    sortOrder,
    currentPage,
    totalPages,
    totalCount,
    itemsPerPage,
    needRefresh,
  } = useSelector((state) => state.customers);
  const columns = [
    {
      columnKey: "name",
      desc: "Name",
      display: function (item) {
        return (
          <Link to={`/customer/detail/${item._id}/`}>
            <HighlightText text={item.name} searchInput={searchQuery} />
          </Link>
        );
      },
    },
    {
      columnKey: "guardian",
      desc: "Guardian",
      display: function (item) {
        return <span>{item.guardian}</span>;
      },
    },
    {
      columnKey: "group",
      desc: "Group",
      display: function (item) {
        return (
          <HighlightText
            text={item.group ? item.group.name : ""}
            searchInput={searchQuery}
          />
        );
      },
    },
    {
      columnKey: "phone",
      desc: "Phone",
      display: function (item) {
        return <span>{item.phone}</span>;
      },
    },
    {
      columnKey: "age",
      desc: "Age",
      display: function (item) {
        return <span>{item.age}</span>;
      },
    },
    {
      columnKey: "identityProof",
      desc: "Proof",
      display: function (item) {
        return <span>{item.identityProof}</span>;
      },
    },
    {
      columnKey: "identityNo",
      desc: "ID No",
      display: function (item) {
        return <span>{item.identityNo}</span>;
      },
    },
    {
      columnKey: "address",
      desc: "Address",
      display: function (item) {
        return <TruncateText text={item.address} />;
      },
    },
  ];
  useEffect(() => {
    if (needRefresh) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, status, sortKey, sortOrder, currentPage, itemsPerPage]);

  const handleSort = (e) => {
    dispatch(setSort(e));
  };

  const debounceTimeout = useRef(null);
  const searchCustomer = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Set a new timeout for debouncing the API call
    debounceTimeout.current = setTimeout(() => {
      dispatch(fetchCustomers(value)); // Dispatch the async action to fetch data
    }, 500);
  };

  const handlePageChange = (page) => {
    console.log(page);
    dispatch(setCurrentPage(page));
  };

  const handlePerPageItem = (item) => {
    console.log(item);
    dispatch(setPerPageItem(item));
  };

  const handleStatus = (e) => {
     dispatch(setCustomerStatus(e.target.value))
  };

  return (
    <React.Fragment>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="container">
          {loading && <Spinner /> }
          <div className="page_tool">
            <div className="page_info">
              <div className="filterItem">
                <span>Status</span>
                <select value={status} onChange={handleStatus}>
                  <option value={`active`}>Active</option>
                  <option value={`in-active`}>In-active</option>
                </select>
              </div>
              <div className="filterItem">
                <label>
                  {" "}
                  Customer
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder={`Search Customer`}
                    onChange={searchCustomer}
                    data-testid={`search`}
                    className="search__input"
                  />
                </label>
              </div>
            </div>

            <div className="right_toolbar">
              <Link to={`/customer/add-customer`}>
                <FontAwesomeIcon title="Add Customer" icon={faPlus} />
              </Link>
            </div>
          </div>
          <Grid
            data={customers}
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
        </div>
      )}
    </React.Fragment>
  );
};
