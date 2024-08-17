import React, { useCallback, useEffect, useRef, useState } from "react"
import Grid from "../../Element/Grid"
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, setCurrentPage, setPerPageItem, setSearchQuery, setSort, setSortKey } from "../../store/actions/customer.action";
import Spinner from "../../Element/Spinner";
import './customer.css';
import HighlightText from "../../common/HighlightText";
import { Link, Outlet, useLocation } from "react-router-dom";

export const Customer = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const isDetailPage = location.pathname.includes('/customer/') && location.pathname.includes('/detail');
    const {
        customers,
        status,
        error,
        searchQuery,
        sortKey,
        sortOrder,
        currentPage,
        totalPages,
        totalCount,
        itemsPerPage
    } = useSelector((state) => state.customers);
    const columns = [
        {
            columnKey: 'name',
            desc: 'Name',
            display: function (item) {
                return (
                    <Link to={`/admin/customer/${item._id}/detail`}>
                        <HighlightText text={item.name} searchInput={searchQuery} />
                    </Link>
                )
                
            }
        },
        {
            columnKey: 'group',
            desc: 'Group',
            display: function (item) {
                return <HighlightText text={item.group ? item.group.name : ''} searchInput={searchQuery} />
            }
        },
        {
            columnKey: 'phone',
            desc: 'Phone',
            display: function (item) {
                return <span>{item.phone}</span>;
            }
        },
        {
            columnKey: 'age',
            desc: 'Age',
            display: function (item) {
                return <span>{item.age}</span>;
            }
        },
        {
            columnKey: 'address',
            desc: 'Address',
            display: function (item) {
                return <HighlightText text={item.address} searchInput={searchQuery} />
            }
        }
    ]
    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch, sortKey, sortOrder, currentPage, itemsPerPage]);

    const handleSort = (e) => {
        dispatch(setSort(e))
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
            dispatch(fetchCustomers(value));  // Dispatch the async action to fetch data
        }, 500);
    }

    const handlePageChange = (page) => {
        console.log(page);
        dispatch(setCurrentPage(page));
    }

    const handlePerPageItem = (item) => {
        console.log(item);
        dispatch(setPerPageItem(item))
    }

    return (
        <React.Fragment>
            {isDetailPage ? <Outlet /> :
                (<div className="container">
                    {status == 'loading' ? <Spinner /> : ''}
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
                </div>)
            }
        </React.Fragment>
    )
}