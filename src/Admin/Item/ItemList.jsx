import React, { useEffect, useMemo, useRef, useState } from "react";
import Grid from "../../Element/Grid";
import apiService from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import Spinner from "../../Element/Spinner";
import { fetchItems, setItemSearchQuery, setItemTableSort } from "../../store/actions/item.action";

const ItemList = () => {
  const {
    items,
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
  } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const location = useLocation();
  const columns = useMemo(()=>[
    {
      columnKey: '_id',
      desc: 'ID',
      display: (item)=> <Link to={`/item/edit/${item._id}`}>{item._id}</Link>
    },
    {
      columnKey: 'name',
      desc: 'Name',
    },
     {
      columnKey: 'model',
      desc: 'Model',
    },
    {
      columnKey: 'eprice',
      desc: 'Expected Sell Price'
    },
    {
      columnKey: 'price',
      desc: 'Price'
    },
    {
      columnKey: 'stock',
      desc: 'In Stock'
    }
  ],[])
  const isDetailPage = location.pathname.includes('/items/edit') || location.pathname.includes('/add-item');
  useEffect(() => {
    if (needRefresh) {
      dispatch(fetchItems());
    }
  }, [dispatch, sortKey, sortOrder, currentPage, itemsPerPage]);

  const handleSort = (e) => {
      dispatch(setItemTableSort(e))
  };

  const debounceTimeout = useRef(null);
  const searchItem = (e) => {
    const value = e.target.value;
    dispatch(setItemSearchQuery(value));
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      dispatch(fetchItems());  // Dispatch the async action to fetch data
    }, 500);
  }

  const handlePageChange = (page) => {
    //dispatch(setCurrentPage(page));
  }

  const handlePerPageItem = (item) => {
    //dispatch(setPerPageItem(item))
  }



  return (
    <React.Fragment>
      {isDetailPage ? <Outlet /> :
        (<div className="container">
          <div className="page_tool">
            <div className="page_info">
              <h3>Item</h3>
              <input
                type="text"
                value={searchQuery}
                placeholder={`Search Item`}
                onChange={searchItem}
                className="search__input" />
            </div>
            <div className="right_toolbar">
              <Link to={`/items/add-item`} >
                <FontAwesomeIcon title="Add Employee" icon={faPlus} />&nbsp; Add Item
              </Link>
            </div>
          </div>
          <Grid
            data={items}
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
    { loading ? <Spinner /> : ''}
    </React.Fragment>
  )
}

export default ItemList;