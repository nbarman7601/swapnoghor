import React, { useEffect, useMemo, useRef, useState } from "react";
import Grid from "../../Element/Grid";
import apiService from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked, faPenAlt, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import Spinner from "../../Element/Spinner";
import {
  fetchItems,
  setItemSearchQuery,
  setItemTableSort,
} from "../../store/actions/item.action";
import Button from "../../Element/Button";
import { deleteItemApi } from "../ajax";
import { setGlobalError } from "../../store/actions/global.action";
import { Box, MenuItem, Popover, Typography } from "@mui/material";
import ConfirmationDialog from "../../common/ConfirmationDialog/ConfirmationDialog";
import UpdateStockDialog from "./UpdateStock";

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
    loading,
  } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const location = useLocation();
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [targetItem, setTargetItem] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showStockDialog, setShowStockDialog] = useState(false);

  const columns = useMemo(
    () => [
      {
        columnKey: "name",
        desc: "Item Name",
        display: (item) => (
          <Link to={`/items/detail/${item._id}`}>{item.name}</Link>
        ),
      },
      {
        columnKey: "model",
        desc: "Model",
      },
      {
        columnKey: "eprice",
        desc: "Expected Sell Price",
      },
      {
        columnKey: "price",
        desc: "Price",
      },
      {
        columnKey: "stock",
        desc: "Stock",
        display: function (item) {
          return item.stock;
        },
      },
      {
        columnKey: "action",
        desc: "Action",
        display: (item) => {
          return (
            <div style={{ display: "flex", columnGap: "20px" }}>
              <Link to={`/items/edit/${item._id}`}>
                <FontAwesomeIcon icon={faPenAlt} />
              </Link>
              <button onClick={(e) =>{  setTargetItem(item); handleDelete() }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const isDetailPage =
    location.pathname.includes("/items/edit") ||
    location.pathname.includes("/items/detail") ||
    location.pathname.includes("/add-item");
  useEffect(() => {
    if (needRefresh) {
      dispatch(fetchItems());
    }
  }, [dispatch, sortKey, sortOrder, currentPage, itemsPerPage]);

  const handleSort = (e) => {
    dispatch(setItemTableSort(e));
  };

  const debounceTimeout = useRef(null);
  const searchItem = (e) => {
    const value = e.target.value;
    dispatch(setItemSearchQuery(value));
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      dispatch(fetchItems()); // Dispatch the async action to fetch data
    }, 500);
  };

  const handlePageChange = (page) => {
    //dispatch(setCurrentPage(page));
  };

  const handlePerPageItem = (item) => {
    //dispatch(setPerPageItem(item))
  };

  const deleteItem = async (item) => {
    try {
      handleClose();
      setShowDeleteConfirmation(false);
      const itemDeleted = await deleteItemApi(item._id);
      if (itemDeleted) {
        dispatch(fetchItems());
      }
    } catch (error) {
      dispatch(setGlobalError(error));
    }
  };

  const handleClose = ()=>{
    setShowRightMenu(false);
    setAnchorPosition(null)
  }

  const updateStock = ()=>{
    handleClose();
  }

  const handleDelete = ()=>{
     handleClose();
     setShowDeleteConfirmation(true);
  }


  const showContextMenu = () => {
    return (
      <Popover
        open={Boolean(anchorPosition)}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          anchorPosition
            ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX }
            : undefined
        }
        PaperProps={{ style: { padding: "10px", minWidth: "150px" } }}
      >
        <Box>
           <MenuItem onClick={addStock}>
              <FontAwesomeIcon icon={faBoxesStacked}/>
              &nbsp; Add Stock
           </MenuItem>
           <MenuItem>
              <Link to={`/items/edit/${targetItem._id}`}  onClick={handleClose}>
                  <FontAwesomeIcon icon={faPenAlt}/> &nbsp;
                  Modify Item
              </Link>
           </MenuItem>
           <MenuItem onClick={()=> handleDelete()}>
              <FontAwesomeIcon icon={faTrash}/> &nbsp;
              Delete Item
           </MenuItem>
        </Box>
      </Popover>
    );
  };


  const handleContextMenu = (event, item)=>{
      setAnchorPosition({
        mouseX: event.clientX,
        mouseY: event.clientY,
      });
      setTargetItem(item);
      setShowRightMenu(true)
  }
  const deleteCancel = ()=>{
     setTargetItem(null);
     setShowDeleteConfirmation(false)
  }

  const addStock = ()=>{
      handleClose();
      setShowStockDialog(true)
  }

  return (
    <React.Fragment>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="container">
          <div className="page_tool">
            <div className="page_info">
              <h3>Item</h3>
              <input
                type="text"
                value={searchQuery}
                placeholder={`Search Item`}
                onChange={searchItem}
                className="search__input"
              />
            </div>
            <div className="right_toolbar">
              <Link to={`/items/add-item`}>
                <FontAwesomeIcon title="Add Employee" icon={faPlus} />
                &nbsp; Add Item
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
            onContextMenu={handleContextMenu}
          />
        </div>
      )}
      {loading ? <Spinner /> : ""}
      {
        showRightMenu && showContextMenu()
      }
      {
        showDeleteConfirmation && <ConfirmationDialog 
          open={showDeleteConfirmation}
          onCancel={deleteCancel}
          onConfirm={()=>deleteItem(targetItem)}
          title={`Confirmation`}
          message={`Are you sure want to delete this item?`}
        />
      }
      {
        showStockDialog && <UpdateStockDialog   
        open={showStockDialog}
        onClose={()=> setShowStockDialog(false)}
        item={targetItem}/>
      }
    </React.Fragment>
  );
};

export default ItemList;
