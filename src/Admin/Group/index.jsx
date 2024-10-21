import React, { useEffect, useMemo, useRef, useState } from 'react';
import './group.css';
import { connect } from 'react-redux';
import { fetchGroupApiCall, resetGroupData, setGroupCurrentPage, setGroupItemPerPage, setGroupSearchQuery, setGroupTableSort } from '../../store/actions/group.action';
import Grid from '../../Element/Grid';
import Spinner from '../../Element/Spinner';
import { SelectedCustomer } from './SelectedCustomer';
import Button from '../../Element/Button';
import { AddEditGroup } from './AddEditGroup/AddEditGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
const Group = ({
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
    setCurrentPage,
    resetGroup,
    needRefresh
}) => {
    const [mode, setMode] = useState('EDIT');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showAddEditGroup, setShowAddEditGroup] = useState(false);
    useEffect(() => {
        if (needRefresh) {
            fetchGroup();
        }
    }, [needRefresh, sortKey, sortOrder, currentPage, itemsPerPage]);

    const columns = useMemo(() => [
        {
            columnKey: 'name',
            desc: 'Name',
            display: (item) => (
                <span className='pointer' onClick={() => viewCustomers(item)}>
                    {item.name}
                </span>
            ),
        },
        {
            columnKey: 'weekday',
            desc: 'Weekday',
            display: (item) => (
                <span className='pointer' onClick={() => viewCustomers(item)}>
                    {item.weekday}
                </span>
            ),
        },
        {
            columnKey: 'lo',
            desc: 'Loan Officer',
            display: (item) => (
                <span className='pointer' onClick={() => viewCustomers(item)}>
                    {item.lo}
                </span>
            ),
        },
        {
            columnKey: 'customers',
            desc: 'No of Customer',
            display: (item) => (
                <span className='pointer' onClick={() => viewCustomers(item)}>
                    {item.customers.length}
                </span>
            ),
        },
        {
            columnKey: 'actions',
            desc: 'Action',
            display: (item) => (
                <button onClick={() => editGroup(item)}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            ),
        },
    ], []);



    const viewCustomers = (item) => {
        console.log(item);
        setSelectedGroup((prevGroup) => item);
    }

    const handlePageChange = (e) => {
        console.log(e)
        setCurrentPage(e)
    };

    const handlePerPageItem = (e) => {
        setItemPerPage(e)
    }
    const handleSort = (e) => {
        sortGroup(e);
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setGroupSearch(value)
        setTimeout(() => {
            fetchGroup();
        }, 1000)

    }

    const gotoAddNewGroup = () => {
        setSelectedGroup((prevGroup) => ({
            name: '',
            weekday: 'Sunday',
            lo: ''
        }));
        setMode('ADD');
        setShowAddEditGroup(true);
    }

    const editGroup = (item) => {
        const selectedItm = {
            lo: item.lo?._id,
            name: item.name,
            _id: item._id,
            customers: item.customers,
            weekday: item.weekday
        }
        setSelectedGroup(selectedItm);
        setShowAddEditGroup(true);
    }

    const onClose = (isAction) =>{ 
        if(isAction){
            fetchGroup();
        }
        setShowAddEditGroup(false); 
    }

    const clearAll = () => {
        resetGroup();
    }
    return (
        <React.Fragment>
            <div className="container">
                {loading ? <Spinner /> : ''}
                <div className="page_tool">
                    <div className="page_info">
                        <h3>Group</h3>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e)}
                            placeholder={`Search Customer`}
                            className="search__input" />
                        <Button onClick={clearAll}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </Button>
                    </div>
                    <div className="right_toolbar">
                        <Button onClick={gotoAddNewGroup}>Add New Group</Button>
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
                                    <SelectedCustomer customers={selectedGroup.customers} />
                                </>
                            ) : ''
                        }
                    </div>
                </div>
            </div>
            {showAddEditGroup ?
                <AddEditGroup
                    group={selectedGroup}
                    onClose={onClose}
                    mode={mode}
                /> : null}
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
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
        loading,
        needRefresh
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
        loading,
        needRefresh
    }
}
const matDispatchToProps = (dispath) => ({
    fetchGroup: () => dispath(fetchGroupApiCall()),
    sortGroup: (e) => dispath(setGroupTableSort(e)),
    setGroupSearch: (value) => dispath(setGroupSearchQuery(value)),
    setItemPerPage: (noOfItem) => dispath(setGroupItemPerPage(noOfItem)),
    setCurrentPage: (page) => dispath(setGroupCurrentPage(page)),
    resetGroup: () => dispath(resetGroupData())
})
export default connect(mapStateToProps, matDispatchToProps)(Group)