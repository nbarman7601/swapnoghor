import React, { useEffect, useState } from "react"
import './customer.css'
import apiService from "../../axios";
import AutoComplete from "../../Element/AutoComplete/AutoComplete";
import Button from "../../Element/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorPopup } from "../../common/ErrorPopup/ErrorPopup";
import Spinner from "../../Element/Spinner";
import { useDispatch } from "react-redux";
import {  resetCustomerState } from "../../store/actions/customer.action";

const formLabel = {
    name: 'Customer Name',
    guardian: 'Guardian',
    age: 'Age',
    group: 'Group',
    phone: 'Phone',
    address: 'Address',
    identityProof: 'Identity Proof',
    identityNo: 'ID No'
}

export const AddCustomer = () => {
    const [mode, setMode] = useState('ADD');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        guardian: '',
        age: '',
        group: '',
        phone: '',
        address: '',
        identityProof: 'Adhaar',
        identityNo: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const [groupQuery, setGroupQuery] = useState('');
    const [formError, setFormError] = useState({});
    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            setMode('EDIT');
            setLoading(true);
            apiService.get(`customer/${id}`)
                .then((response) => {
                    console.log(response.customer);
                    setFormData((prevFormData)=>({
                        name: response.customer.name,
                        guardian: response.customer.guardian,
                        age: response.customer.age,
                        group: response.customer?.group?._id,
                        phone: response.customer.phone,
                        address: response.customer.address,
                        identityProof: response.customer.identityProof,
                        identityNo: response.customer.identityNo
                    }));
                    setGroupQuery((prevgroupQuery)=>response.customer?.group?.name)
                    setLoading(false);
                }
                ).catch(
                    (err) => {
                        setLoading(false);
                    }
                )
        }
    }, [id])

    const fetchSuggestions = async (query) => {
        const response =  await apiService.get('/group/list', {
            params: {
                search: query,
                sortBy: 'name',
                sort: 'asc',
                page: 1,
                limit: 25,
                status: 'active',
                searchBy: 'GROUP'
            },
        })
        return response.data.map((item) => ({ _id: item._id, name: item.name }));
    };

    const validateFields = () => {
        const error = {};

        if (!formData.name.trim()) {
            error.name = "Customer name is required";
        }
        if (!formData.guardian.trim()) {
            error.guardian = "Guardian is required";
        }
        if (!formData.age) {
            error.age = "Age is required";
        }
        if (!formData.phone) {
            error.phone = "Phone is required";
        }
        if (!formData.group.trim()) {
            error.group = "Group is required";
        }
        if (!formData.address.trim()) {
            error.address = "Age is required";
        }
        if (!formData.identityNo) {
            error.identityNo = "ID No is required";
        }

        return error;
    };

    const handleCustomerSubmit = () => {
        const error = validateFields();
        setFormError(error);

        if (Object.keys(error).length === 0) {
            console.log("Form submitted successfully", formData);
            setLoading(true);
            const url = mode === 'EDIT' ? `customer/${id}/update-customer` : `/customer/create`;
            if(mode === 'EDIT'){
                apiService.put(url, formData)
                    .then(
                        (response) => {
                            setLoading(false);
                            dispatch(resetCustomerState());
                            // dispatch(fetchCustomers())
                            toast.success("Customer has been updated successfully")
                            navigate('/customer')
                        }
                    ).catch((error) => {
                        setLoading(false);
                        // console.log(error)
                        setErrors([error.data.error]);
                        setShowError(true);
                    })
            }else{
                apiService.post(url, formData)
                .then(
                    (response) => {
                        setLoading(false);
                        toast.success("Customer has been added successfully")
                        navigate('/customer')
                    }
                ).catch((error) => {
                    setLoading(false);
                    // console.log(error)
                    setErrors([error.data.error]);
                    setShowError(true);
                })
            }
        } else {
            console.log("Validation failed", error);
            setErrors(Object.values(error));
            setShowError(true);
        }
    }

    const updateValue = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setFormError(prevError => ({
            ...prevError,
            [name]: value === '' ? `${formLabel[name]} is required` : ''
        }));

    }

    const handleSelect = (item) => {
        if (item) {
            setFormData((prevFormData) => ({ ...prevFormData, group: item._id }))
        }
    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> : null}
            <fieldset>
                <legend data-testid="customerdetail">Customer Detail</legend>
                <div className="row">
                    <div className="col-xs-4 col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="outlinedInput" className="htmlForm-label">* Name</label>
                            <input
                                type="text"
                                className="htmlForm-control"
                                name="name"
                                value={formData.name}
                                onChange={(e) => updateValue(e)}
                                placeholder="Customer Name" />
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="outlinedInput" className="htmlForm-label">* Guardian</label>
                            <input
                                type="text"
                                className="htmlForm-control"
                                name="guardian"
                                onChange={(e) => updateValue(e)}
                                value={formData.guardian}
                                placeholder="Guardian Name" />
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="outlinedInput" className="htmlForm-label">* Age</label>
                            <input
                                type="text"
                                className="htmlForm-control"
                                name="age"
                                onChange={(e) => updateValue(e)}
                                value={formData.age}
                                placeholder="Age" />
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="outlinedInput" className="htmlForm-label">* Group</label>
                            <AutoComplete
                                fetchSuggestions={fetchSuggestions} 
                                initialQuery={groupQuery}
                                onSelect={handleSelect} />
                            {/* <input type="text" className="htmlForm-control"  placeholder="Enter Group" /> */}
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="outlinedInput" className="htmlForm-label">* Phone</label>
                            <input
                                type="text"
                                className="htmlForm-control"
                                name="phone"
                                onChange={(e) => updateValue(e)}
                                value={formData.phone}
                                placeholder="(+91) 99978..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4 col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="outlinedInput" className="htmlForm-label">* Identy Proof</label>
                            <select
                                name="identityProof"
                                onChange={(e) => updateValue(e)}
                                value={formData.identityProof}>
                                <option value={`Adhaar`}>Adhaar</option>
                                <option value={`Voter`}>Voter</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-xs-4 col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="outlinedInput" className="htmlForm-label">* ID No</label>
                            <input
                                type="text"
                                onChange={(e) => updateValue(e)}
                                className="htmlForm-control"
                                name={`identityNo`}
                                value={formData.identityNo}
                                placeholder="ID No" />
                        </div>
                    </div>

                    <div className="col-xs-4 col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="outlinedInput" className="htmlForm-label">* Address</label>
                            <textarea
                                onChange={(e) => updateValue(e)}
                                value={formData.address}
                                name='address'
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="btn-container">
                    <Button onClick={handleCustomerSubmit}>
                        {mode === 'EDIT' ? 'Update Customer': 'Add Customer'} 
                    </Button>
                </div>
            </fieldset>
            {showError && <ErrorPopup errors={errors} onClose={() => setShowError(false)} />}
        </React.Fragment>
    )
}