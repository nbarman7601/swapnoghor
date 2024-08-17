import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans, setLoanItemPageNumber, setLoanSort } from "../../store/actions/loan.action";
import Spinner from "../../Element/Spinner";
import Grid from "../../Element/Grid";
import { Link, Outlet, useLocation } from "react-router-dom";
import CurrencyFormatter from "../../common/CurrencyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPrint } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Element/Button";

const columns = [
    {
        columnKey: 'customer',
        desc: 'Name',
        display: function (item) {
            return <Link to={`/admin/loan/${item._id}/detail`}>{item.customer}</Link>
        }
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
        columnKey: 'guardian',
        desc: 'Guardian'
    },
    {
        columnKey: 'loanAmt',
        desc: 'Loan Amount',
        display: function (item) {
            return <CurrencyFormatter amount={item.loanAmt} />
        }
    },
    {
        columnKey: 'totalOutstandingSum',
        desc: 'Outstanding',
        display: function (item) {
            return <CurrencyFormatter amount={item.totalOutstandingSum} />
        }
    }
]
const Loan = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isDetailPage = location.pathname.includes('/loan/') && location.pathname.includes('/detail');
    const {
        loans,
        status,
        error,
        searchQuery,
        sortKey,
        sortOrder,
        currentPage,
        totalPages,
        totalCount,
        itemsPerPage,
        loading
    } = useSelector((state) => state.loans);
    useEffect(() => {
        console.log('loans', loading);
        dispatch(fetchLoans())
    }, [dispatch, searchQuery, sortKey, sortOrder, currentPage, itemsPerPage]
    );

    const handleSort = (e) => {
        dispatch(setLoanSort(e))
    }
    const handlePageChange = (e) => {
        console.log(e)
    }
    const handlePerPageItem = (e) => {
        console.log(e)
        dispatch(setLoanItemPageNumber(e))
    }

    const handleMoreAction = (e) => {
        setIsOpen(!isOpen);
    }

    const printLoan = () => {

    }

    return (
        <div className="container">
            {loading ? <Spinner /> : ''}
            {!isDetailPage ? (<>
                <div className="page_tool">
                    <h3>Loan</h3>
                    <div className="tools menu-container">
                        <Button onClick={handleMoreAction} className="custom-class">
                            More Action&nbsp;
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </Button>
                        {isOpen && (
                            <div className="menu">
                                <Button className="menu-item" onClick={printLoan}>
                                    Print &nbsp;
                                    <FontAwesomeIcon icon={faPrint} />
                                </Button>

                            </div>
                        )}
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
                /> </>) :
                <Outlet />
            }
        </div>
    )
}
export default Loan;