import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import apiService from "../../axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { fetchItems } from "../../store/actions/item.action";

const UpdateStockDialog = ({ item, open, onClose }) => {
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = () => {
     apiService.put(`product/update-stock`, {itemId: item._id, stock})
        .then(
            (response)=>{
                console.log(response);
                dispatch(fetchItems());
                onClose();
            }
        ).catch((error)=>{
            console.log(error);
        })
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Stock</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Add New Stock"
          variant="outlined"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateStockDialog.propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired, // `item` is an object with specific fields
    open: PropTypes.bool.isRequired, // `open` determines if the dialog is visible
    onClose: PropTypes.func.isRequired, // `onClose` is a callback function
};

export default UpdateStockDialog;
