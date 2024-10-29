import DatePicker from "react-datepicker";
import classes from "./due.module.css";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOverDueList,
  setOverdueCurrentPage,
  setOverdueEndDate,
  setOverduePerPageItem,
  setOverdueStartDate,
} from "../../store/actions/overdue.action";
import Grid from "../../Element/Grid";
import DateFormatter from "../../common/DateFormatter";
import CurrencyFormatter from "../../common/CurrencyFormatter";
import { createPortal } from "react-dom";
import Spinner from "../../Element/Spinner";
import { Link } from "react-router-dom";
import Button from "../../Element/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import apiService from "../../axios";
import { toast } from "react-toastify";
const Overdue = () => {
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        columnKey: "customer",
        desc: "Customer",
        display: function (item) {
          return <span>{item.loanId.customer.name}</span>;
        },
      },
      {
        columnKey: "guardian",
        desc: "Guardian",
        display: function (item) {
          return <span>{item.loanId.customer.guardian}</span>;
        },
      },
      {
        columnKey: "group",
        desc: "Group",
        display: function (item) {
          return <span>{item.loanId.customer.group.name}</span>;
        },
      },
      {
        columnKey: "address",
        desc: "Address",
        display: function (item) {
          return <span>{item.loanId.customer.address}</span>;
        },
      },
      {
        columnKey: "Phone",
        desc: "Phone",
        display: function (item) {
          return <span>{item.loanId.customer.phone}</span>;
        },
      },
      {
        columnKey: "amount",
        desc: "Amount",
        display: function (item) {
          return <CurrencyFormatter amount={item.installmentAmt} />;
        },
      },
      {
        columnKey: "emino",
        desc: "EMI No",
        display: function (item) {
          return <span>{item.installmentNo}</span>;
        },
      },
      {
        columnKey: "emidate",
        desc: "EMI Date",
        display: function (item) {
          return <DateFormatter date={item.installment_date} />;
        },
      },
      {
        columnKey: "actions",
        desc: "Actions",
        display: function (item) {
          return <Link to={`/loan/${item.loanId._id}/detail`}>View Loan</Link>;
        },
      },
    ],
    []
  );
  const {
    loading,
    startDate,
    endDate,
    data,
    currentPage,
    itemsPerPage,
    totalCount,
    totalPages,
    needRefresh,
  } = useSelector((state) => state.overdue);

  useEffect(() => {
    if (needRefresh) {
      dispatch(fetchOverDueList());
    }
  }, [dispatch, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    dispatch(setOverdueCurrentPage(page));
  };

  const handlePerPageItem = (item) => {
    dispatch(setOverduePerPageItem(item));
  };

  const searchOverdue = () => {
    dispatch(fetchOverDueList());
  };

  const downLoadToExcel = async () => {
    try {
      toast.info('Download Started')
      const response = await apiService.getWithParams(
        "/loan/overdue/download",
        {
          startDate: startDate,
          endDate: endDate,
        },
        "blob"
      );

      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a link element to trigger a download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "overdue_installments.xlsx"; // Name of the downloaded file
      document.body.appendChild(link);
      link.click();
      toast.success('Download Completed')
      // Clean up by removing the link
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
    }
  };
  const today = new Date().toISOString().split('T')[0];
  return (
    <React.Fragment>
      <div className={classes.pageContainer}>
        <div className={classes.filter}>
          <div className={classes.left_filter_option}>
            <div className="item">
              <span>From</span>
              <input
                type="date"
                onChange={(e) => dispatch(setOverdueStartDate(e.target.value))}
                value={startDate}
                max={today}
              />
            </div>
            <div className="item">
              <span>To</span>
              <input
                type="date"
                onChange={(e) => dispatch(setOverdueEndDate(e.target.value))}
                value={endDate}
                max={today}
              />
            </div>
            <div className={classes.overdue_search}>
              <button onClick={searchOverdue}>Search</button>
            </div>
          </div>
          <div className={classes.right_tool}>
            <Button onClick={downLoadToExcel} title="Download to Excel">
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </div>
        </div>
        <div className="table-container">
          <Grid
            data={data}
            columns={columns}
            itemsPerPage={itemsPerPage}
            totalCount={totalCount}
            totalPages={totalPages}
            currentPage={currentPage}
            pageChange={handlePageChange}
            perPageChange={handlePerPageItem}
            pagination={true}
          />
        </div>
      </div>
      {loading && createPortal(<Spinner />, document.body)}
    </React.Fragment>
  );
};
export default Overdue;
