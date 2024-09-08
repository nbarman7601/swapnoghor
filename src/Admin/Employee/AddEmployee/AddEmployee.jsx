import React, { useState, useEffect } from "react";
import Card from "../../../Element/Card/Card";
import Button from "../../../Element/Button";
import './AddEmployee.css';
import { ErrorPopup } from "../../../common/ErrorPopup/ErrorPopup";
import apiService from "../../../axios";
import Spinner from "../../../Element/Spinner";
import { ToastContainer, toast  } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const formLabel = {
    firstName: 'First Name',
    lastName: 'Last Name',
    role: 'Role',
    gender: 'Gender',
    phone: 'Phone',
    dob: 'Date of Birth',
    password: 'Password',
    email: 'Email',
    confirmedPassword: 'Confirm Password'
}

export const AddEmployee = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: 'Loan Officer',
        gender: 'male',
        dob: '',
        password: '',
        email: '',
        phone: '',
        confirmedPassword: ''
    });

    const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const [formError, setFormError] = useState({});
    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
            console.log(id)
    }, [id])

    const validateFields = () => {
        const error = {};

        if (!formData.firstName.trim()) {
            error.firstName = "First Name is required";
        }
        if (!formData.lastName.trim()) {
            error.lastName = "Last Name is required";
        }
        if (!formData.dob) {
            error.dob = "Date of Birth is required";
        }
        if (!formData.phone) {
            error.phone = "Phone is required";
        }
        if (!formData.email.trim()) {
            error.email = "Email is required";
        } else if (!emailPattern.test(formData.email)) {
            error.email = "Email is invalid";
        }
        if (!formData.password.trim()) {
            error.password = "Password is required";
        }
        if (!formData.confirmedPassword.trim()) {
            error.confirmedPassword = "Confirmed Password is required";
        } else if (formData.password!== formData.confirmedPassword) {
            error.confirmedPassword = "Passwords do not match";
        }
        return error;
    };

    const handleEmployeeSubmit = () => {
        const error = validateFields();
        setFormError(error);

        if (Object.keys(error).length === 0) {
            console.log("Form submitted successfully", formData);
            setLoading(true);
            apiService.post(`/user/create`, formData)
                .then(
                    (response)=>{
                        setLoading(false);
                        toast.success("User has been added successfully")
                        navigate('/employee')
                    }
                ).catch((error)=>{
                    setLoading(false);
                   // console.log(error)
                    setErrors([error.data.error]);
                    setShowError(true);
                })
            
        } else {
            console.log("Validation failed", error);
            setErrors(Object.values(error));
            setShowError(true);
        }
    }

    const updateValue = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));

        if (name === 'email') {
            setFormError(prevError => ({
                ...prevError,
                email: value === '' ? 'Email is required' : (!emailPattern.test(value) ? 'Email is invalid' : '')
            }));
        } else {
            setFormError(prevError => ({
                ...prevError,
                [name]: value === '' ? `${formLabel[name]} is required` : ''
            }));
        }
    }

    return (
        <React.Fragment>
            {loading ? <Spinner />: null}
            <Card className={`add_customer_card`}>
                <div className="page_tool">
                    <div className="page_info">
                        <h3>Add Employee</h3>
                    </div>
                    <div className="right_toolbar"></div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <label>* First Name</label>
                        <input type="text"
                            autoComplete="off"
                            onChange={updateValue}
                            name="firstName"
                            className={formError.firstName ? 'invalid_field' : ''}
                            value={formData.firstName}
                            placeholder="First Name" />
                    </div>
                    <div className="col-xs-4">
                        <label>* Last Name</label>
                        <input type="text"
                            autoComplete="off"
                            name="lastName"
                            onChange={updateValue}
                            className={formError.lastName ? 'invalid_field' : ''}
                            placeholder="Last Name"
                            value={formData.lastName}
                        />
                    </div>
                    <div className="col-xs-4">
                        <label>* Role</label>
                        <select name="role"
                            value={formData.role}
                            className={formError.role ? 'invalid_field' : ''}
                            onChange={updateValue}>
                            <option value="Loan Officer">Loan Officer</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="col-xs-4">
                        <label>* Date of Birth</label>
                        <input type="date"
                            value={formData.dob}
                            onChange={updateValue}
                            className={formError.dob ? 'invalid_field' : ''}
                            name="dob"
                            placeholder="Date of Birth" />
                    </div>
                    <div className="col-xs-4">
                        <label>* Email</label>
                        <input type="email"
                            value={formData.email}
                            onChange={updateValue}
                            name="email"
                            className={formError.email ? 'invalid_field' : ''}
                            placeholder="Email" />
                    </div>
                </div>

                <div className="row">
                <div className="col-xs-4">
                        <label>* Phone</label>
                        <input type="text"
                            value={formData.phone}
                            onChange={updateValue}
                            name="phone"
                            className={formError.phone ? 'invalid_field' : ''}
                            placeholder="Phone" />
                    </div>
                    <div className="col-xs-4">
                        <label>* Gender</label>
                        <select name="gender"
                            className={formError.gender ? 'invalid_field' : ''}
                            value={formData.gender}
                            onChange={updateValue}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="col-xs-4">
                        <label>* Password</label>
                        <input type="password"
                            className={formError.password ? 'invalid_field' : ''}
                            onChange={updateValue}
                            name="password"
                            autoComplete="off"
                            value={formData.password}
                            placeholder="Enter Password" />
                    </div>
                    <div className="col-xs-4">
                        <label>* Confirmed Password</label>
                        <input type="password"
                            autoComplete="off"
                            onChange={updateValue}
                            className={formError.confirmedPassword ? 'invalid_field' : ''}
                            name="confirmedPassword"
                            placeholder="Enter Password Again"
                            value={formData.confirmedPassword}
                        />
                    </div>
                </div>
                <div className="btn-container">
                    <Button onClick={handleEmployeeSubmit} className="primary-save-btn">Save</Button>
                </div>
            </Card>
            {showError && <ErrorPopup errors={errors} onClose={() => setShowError(false)} />}
        </React.Fragment>
    );
}