import React, { useEffect, useRef, useState } from 'react';
import './group.css';
import { connect } from 'react-redux';
import { fetchGroupApiCall, setGroupCurrentPage, setGroupItemPerPage, setGroupSearchQuery, setGroupTableSort } from '../../store/actions/group.action';
import Grid from '../../Element/Grid';
import Spinner from '../../Element/Spinner';
import { SelectedCustomer } from './SelectedCustomer';
const Group=({
    fetchGroup, 
    groups,
    status,
    error,
    searchQuery,
    sortKey,
    sortOrder,
    currentPage,
    totalPages,
    itemsPerPage,
    totalCount,
    loading,
    sortGroup,
    setGroupSearch,
    setItemPerPage,
    setCurrentPage
})=>{
    const [selectedGroup, setSelectedGroup] = useState(null) 
    useEffect(()=>{
        fetchGroup();
    }, [status,sortKey,sortOrder,currentPage,itemsPerPage])

    const columns = [
        {
            columnKey: 'name',
            desc: 'Name',
            display: function(item){
                return <span className='pointer' onClick={()=>viewCustomers(item)}>{item.name}</span>
            }
        },
        {
            columnKey: 'lo',
            desc: 'Loan Officer',
            display: function(item){
                return <span className='pointer' onClick={()=>viewCustomers(item)}>{item.lo}</span>
            }
        },
        {
            columnKey: 'customers',
            desc: 'No of Customer',
            display: function(item){
                return <span className='pointer' onClick={()=>viewCustomers(item)}>{item.customers.length}</span>
            }
        }
    ]

    const viewCustomers=(item)=>{
        console.log(item);
        setSelectedGroup((prevGroup)=> item);
    }

    const handlePageChange = (e)=>{
        console.log(e)
        setCurrentPage(e)
    };

    const handlePerPageItem = (e)=>{
        setItemPerPage(e)
    }
    const handleSort = (e)=>{
        sortGroup(e);
    }

    let timeout = useRef(null);
    const handleSearch = (e)=>{
        const value = e.target.value;
        setGroupSearch(value)
        timeout = setTimeout(()=>{
            fetchGroup();
        }, 1000)

    }

    return (
        <div className="container">
            {loading ? <Spinner /> : ''}
             <div className="page_tool">
               <div className="page_info">
                   <h3>Group</h3>
                   <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e)=> handleSearch(e)}
                   placeholder={`Search Customer`}
                   className="search__input"/>
               </div>
           </div>
           <div className='panel_row'>
                <div className='halfpanel'>
                <Grid 
                        data={groups}
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
                <div className='right_panel'>
                    {
                        selectedGroup ? (
                            <>
                            <div className='header-title'>Group: {selectedGroup.name}</div>
                            <SelectedCustomer customers={selectedGroup.customers}/>
                            </>
                        ): ''
                    }
                </div>
           </div>
         
        </div>
    )
}
const mapStateToProps = (state) =>{
    const {  
        groups,
        status,
        error,
        searchQuery,
        sortKey,
        sortOrder,
        currentPage,
        totalPages,
        itemsPerPage,
        totalCount,
        loading
      } = state.groups;
    return {
        groups,
        status,
        error,
        searchQuery,
        sortKey,
        sortOrder,
        currentPage,
        totalPages,
        itemsPerPage,
        totalCount,
        loading
    }
}
const matDispatchToProps = (dispath)=>({
    fetchGroup: ()=>dispath(fetchGroupApiCall()),
    sortGroup: (e)=> dispath(setGroupTableSort(e)),
    setGroupSearch: (value)=>dispath(setGroupSearchQuery(value)),
    setItemPerPage: (noOfItem)=> dispath(setGroupItemPerPage(noOfItem)),
    setCurrentPage: (page)=> dispath(setGroupCurrentPage(page))
})
export default connect(mapStateToProps, matDispatchToProps)(Group)