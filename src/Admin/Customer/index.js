import { useEffect, useState } from "react"
import Grid from "../../Element/Grid"
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, setCurrentPage, setPerPageItem, setSort, setSortKey } from "../../store/actions/customer.action";
import Spinner from "../../Element/Spinner";
const columns = [
    {
        columnKey: 'customer',
        desc: 'Name'
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
        desc: 'Loan Amount'
    }
]
export const Customer = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
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
    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch, searchQuery, sortKey, sortOrder, currentPage, itemsPerPage]);

    const handleSort = (e) => {
        dispatch(setSort(e))
    };

    const handlePageChange=(page)=>{
        console.log(page);
        dispatch(setCurrentPage(page));
    }

    const handlePerPageItem = (item)=>{
        console.log(item);
        dispatch(setPerPageItem(item))
    }

    return (
        <div className="container">
           <h3>Customer</h3>
           { status == 'loading' ?  <Spinner /> : '' }
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
            />
           
        </div>
    )
}