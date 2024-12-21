import React, { useEffect, useState } from "react"
import Button from "../../Element/Button"
import { ErrorPopup } from "../../common/ErrorPopup/ErrorPopup"
import apiService from "../../axios"
import Spinner from "../../Element/Spinner"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { fetchItems, setItemRefresh } from "../../store/actions/item.action"

const formLabel = {
    eprice: "Expected price",
    model: 'Model',
    name: 'Name',
    price: 'Price',
    stock: 'Stock'
}

export const AddEditItem = () => {
    const [loading, setLoading] = useState(false); 
    const {id} = useParams();
    const [item, setItem] = useState({
        eprice: 0,
        model: '',
        name: '',
        price: 0,
        stock: 0
    })
    const [mode, setMode] = useState('ADD');
    const navigate = useNavigate();
    const [formError, setFormError] = useState({});
    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const validateFields = () => {
        const error = {};

        if (!item.name.trim()) {
            error.name = "Name is required";
        }
        if (!item.model.trim()) {
            error.name = "Name is required";
        }
        if (!item.eprice) {
            error.eprice = "Expected price is required";
        }
        if (!item.price) {
            error.age = "Price is required";
        }
        if (!item.stock) {
            error.stock = "Stock is required";
        }
        return error;
    };

    useEffect(()=>{
        if (id) {
          apiService
            .get(`product/${id}/details`)
            .then((res) => {
                 setMode('EDIT')
                 setItem({
                    eprice: res.eprice,
                    model: res.model,
                    name: res.name,
                    price: res.price,
                    stock: res.stock
                 })
            })
            .catch((error) => {
              console.log(error);
            });
        }
    },[id])

    const updateValue = (e) => {
        const { name, value } = e.target;
        setItem(prevFormData => ({ ...prevFormData, [name]: value }));
        setFormError(prevError => ({
            ...prevError,
            [name]: value === '' ? `${formLabel[name]} is required` : ''
        }));
    }

    const handleItemSubmit = () => {
        const error = validateFields();
        setFormError(error);
        if (Object.keys(error).length === 0) {
            setLoading(true);
            apiService.post(`product/create`, item)
                .then(
                    (response)=>{
                       // dispatch(setItemRefresh());
                        dispatch(fetchItems())
                        setLoading(false);
                        toast.success(`Item has been added successfully`);
                        navigate('/items');
                    }
                ).catch(error=>{
                    setLoading(false);
                    if(error.status === 404){
                        toast.error('Resource Not Found')
                    }else{
                        toast.error(error.error)
                    }
                })
        } else {
            console.log("Validation failed", error);
            setErrors(Object.values(error));
            setShowError(true);
        }
    }

    const updateItem = ()=>{
        setLoading(true);
        apiService.put(`product/${id}/update`, item).then(
            (response)=>{
                toast.success("Item updated successfully");
                setLoading(false);
                navigate('/items')
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error(error.error.msg);
                setLoading(false);
            }
        )
    }

    return (
        <React.Fragment>
            {loading ? <Spinner />: null}
            <fieldset>
                <legend>{
                    mode == 'ADD' ? 'Add Item' : 'Update Item'    
                }</legend>
                <div className="row">
                    <div className="col-xs-4">
                        <label>Item Name</label>
                        <input type="text"
                            value={item.name}
                            placeholder="Enter Product Name"
                            onChange={e => updateValue(e)}
                            name="name"
                        />
                    </div>
                    <div className="col-xs-4">
                        <label>Model</label>
                        <input type="text"
                            name="model"
                            value={item.model}
                            onChange={e => updateValue(e)}
                            placeholder="Enter Model Name" />
                    </div>
                    <div className="col-xs-4">
                        <label>Stock</label>
                        <input type="number"
                            name="stock"
                            value={item.stock}
                            disabled={mode == 'EDIT'}
                            onChange={e => updateValue(e)}
                            placeholder="Enter Stock" />
                    </div>
                    <div className="col-xs-4">
                        <label>Price</label>
                        <input type="number"
                            name="price"
                            value={item.price}
                            onChange={e => updateValue(e)}
                            placeholder="Enter Price" />
                    </div>
                    <div className="col-xs-4">
                        <label>Expected Selling Price</label>
                        <input type="number"
                            name="eprice"
                            value={item.eprice}
                            onChange={e => updateValue(e)}
                            placeholder="Enter Selling Price" />
                    </div>
                </div>
                <div className="btn-container">
                    {
                        mode == 'ADD' &&  <Button className={`btn-primary`} onClick={handleItemSubmit}>Add Item</Button>
                    }
                    {
                        mode == 'EDIT' &&  <Button className={`btn-primary`} onClick={updateItem}>Update Item</Button>
                    }
                   
                </div>
            </fieldset>
            {showError && <ErrorPopup errors={errors} onClose={() => setShowError(false)} />}
        </React.Fragment>

    )
}