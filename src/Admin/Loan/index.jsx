import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans, setLoanItemPageNumber, setLoanPageNumber, setLoanSort } from "../../store/actions/loan.action";
import Spinner from "../../Element/Spinner";
import Grid from "../../Element/Grid";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import CurrencyFormatter from "../../common/CurrencyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Element/Button";
import { LoanFilter } from "./LoanFilter";
import { EMIInterval } from "./EMIInterval";
import DateFormatter from "../../common/DateFormatter";
import Popover from "../../Element/Popover/Popover";
import apiService from "../../axios";
import LoanService from "./LoanService";
import { toast } from "react-toastify";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";

const columns = [
    {
        columKey: 'orderNo',
        desc: 'Loan No',
        display: function(item){
               return <Link to={`/loan/${item._id}/detail`}>{item.orderNo}</Link>
        }
    },
    {
        columnKey: 'customer',
        desc: 'Name',
        display: function (item) {
            return `${item.customer}`;
        }
    },
    {
        columnKey: 'guardian',
        desc: 'Guardian'
    },
    {
        columnKey: 'phone',
        desc: 'Phone'
    },
    {
        columnKey: 'group',
        desc: 'Group'
    },
    {
        columnKey: 'lo',
        desc: 'Loan Officer',
        display: (item) => <span>{item.lo}</span>
    },
    {
        columnKey: 'sanctioned_date',
        desc: 'Snc Date',
        display: function (item) {
            return <DateFormatter date={item.sanctioned_date} />
        }
    },
    {
        columnKey: 'weekday',
        desc: 'Weekday',
        display: function (item) {
            return <span>{ item.weekday }</span>
        }
    },
    {
        columnKey: 'totalAmt',
        desc: 'Total',
        display: function (item) {
            return <CurrencyFormatter amount={item.totalAmt} />
        }
    },
    {
        columnKey: 'downpayment',
        desc: 'Advance',
        display: function (item) {
            return <CurrencyFormatter amount={item.downpayment} />
        }
    },
    {
        columnKey: 'loanAmt',
        desc: 'Loan',
        display: function (item) {
            return <CurrencyFormatter amount={item.loanAmt} />
        }
    },
    {
        columnKey: 'paidAmt',
        desc: 'Paid',
        display: function (item) {
            return <CurrencyFormatter amount={item.paidAmt} />
        }
    },
    {
        columnKey: 'totalOutstandingSum',
        desc: 'Outstanding',
        display: function (item) {
            return <CurrencyFormatter amount={item.totalOutstandingSum} />
        }
    },
    {
        columnKey: 'installment_interval',
        desc: 'Cycle',
        display: function (item) {
            return <EMIInterval interval={item.installment_interval} />
        }
    },
]
const Loan = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const regex = /\/loan\/.*\/detail/;
    const isDetailPage = regex.test(location.pathname)
        || location.pathname.includes('/disburse-loan');
    const [menu, setMenu] = useState(null);
    const {
        status,
        loans,
        sortKey,
        sortOrder,
        searchQuery,
        groupId,
        currentPage,
        totalPages,
        totalCount,
        itemsPerPage,
        loading,
        searchBy,
        interval,
        needRefresh
    } = useSelector((state) => state.loans);
    useEffect(() => {
        if (needRefresh) {
            dispatch(fetchLoans())
        }
    }, [dispatch,
         sortKey, 
         interval, 
         status, 
         groupId, 
         searchBy, 
         sortOrder, 
         currentPage, 
         itemsPerPage
        ]
    );

    const handleSort = (e) => {
        dispatch(setLoanSort(e))
    }
    const handlePageChange = (e) => {
        dispatch(setLoanPageNumber(e))
    }
    const handlePerPageItem = (e) => {
        dispatch(setLoanItemPageNumber(e))
    }

    const handleMoreAction = (event) => {
        const rect = event.target.getBoundingClientRect();
        setIsOpen(true);
        setMenu({
          x: rect.left + window.scrollX,
          y: rect.bottom + window.scrollY,
          items: [
            { label: 'Option 1', onClick: () => alert('Option 1') },
            { label: 'Option 2', onClick: () => alert('Option 2') },
            { label: 'Option 3', onClick: () => alert('Option 3') },
          ],
        });
    }

    const closeMenu = () => {
        setMenu(null);
        setIsOpen(false);
    }

    const navigateToNewLoan = () => {
        navigate(`/loan/disburse-loan`)
    }

    const download = ()=>{
        apiService.get(`loan/export-excel`, {
            params: {
                search: searchQuery,
                sortBy: sortKey, 
                sort: sortOrder, 
                page: currentPage,
                limit: itemsPerPage,
                status: status,
                searchBy: searchBy,
                groupId: groupId
            }
        }).then((blob)=>{
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Loan_list.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }).catch((error)=>{
            console.log(error)
        })
    }
    const handleDownload = async () => {
        toast.info("Download Started");
        try {
          const blob = await LoanService.downloadLoan({
            search: searchQuery,
            sortBy: sortKey, 
            sort: sortOrder, 
            page: currentPage,
            limit: itemsPerPage,
            status: status,
            searchBy: searchBy,
            groupId: groupId
        });
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Loan_list.xlsx';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          toast.success("Download Completed");
        } catch (error) {
          console.error('Download failed:', error);
        } finally {
          //setDownloadLoading(false);
        }
      };

    const uploadLoan = ()=>{

    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> : null}
            {isDetailPage ? <Outlet /> :
                <React.Fragment>
                    <div className="page_tool">
                        {/* <h3>Loan</h3> */}
                        <LoanFilter />
                        <div className="tools menu-container">
                            <Button onClick={navigateToNewLoan} title={`Disburse Loan`}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                            <Button onClick={handleDownload} title={`Download Excell`}>
                                <FontAwesomeIcon icon={faDownload}/>
                            </Button>
                            <Button onClick={uploadLoan} className="custom-class" disabled={true}>
                                Upload Loan&nbsp;
                                <FontAwesomeIcon icon={faUpload} />
                            </Button>
                            { isOpen ?
                                <Popover x={menu.x} y={menu.y} items={menu.items} onClose={closeMenu} /> : null
                            }
                        </div>
                    </div>
                    <Grid
                        data={loans}
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
                        showIndex={true}
                    />
                </React.Fragment>}
        </React.Fragment>
    )
}
export default Loan;