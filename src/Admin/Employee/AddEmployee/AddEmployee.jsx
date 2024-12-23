import React, { useState, useEffect } from "react";
import Card from "../../../Element/Card/Card";
import Button from "../../../Element/Button";
import './AddEmployee.css';
import { ErrorPopup } from "../../../common/ErrorPopup/ErrorPopup";
import apiService from "../../../axios";
import Spinner from "../../../Element/Spinner";
import { ToastContainer, toast  } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchEmpList } from "../../../store/actions/employee.action";

const formspan = {
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
    const dispatch = useDispatch();

    const [mode, setMode] = useState('ADD');

    useEffect(()=>{
        if(id){
           apiService.get(`user/${id}/details`)
                .then((res)=>{
                    const user = {
                        ...res, 
                        password: '******',
                        confirmedPassword: '******'
                    }
                    setFormData((prev)=> user);
                    setMode('EDIT')
                }).catch(
                    (error)=>{
                        console.log(error);
                    }
                )
        }
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
                [name]: value === '' ? `${formspan[name]} is required` : ''
            }));
        }
    }

    const handleEmployeeUpdate = ()=>{
        setLoading(true);
        apiService.put(`user/${id}/update`, {
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "role": formData.role,
            "gender": formData.gender,
            "dob": formData.dob,
            "phone": formData.phone,
        }).then((res)=>{
            setLoading(false);
            toast.success(`User has been updated successfully`);
            dispatch(fetchEmpList());
            navigate('/employee')
        }).catch((error)=>{
            toast.error(`Something Went Wrong.`);
            setLoading(false);
        })
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
                        <span>* First Name</span>
                        <input type="text"
                            autoComplete="off"
                            onChange={updateValue}
                            name="firstName"
                            className={formError.firstName ? 'invalid_field' : ''}
                            value={formData.firstName}
                            placeholder="First Name" />
                    </div>
                    <div className="col-xs-4">
                        <span>* Last Name</span>
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
                        <span>* Role</span>
                        <select name="role"
                            value={formData.role}
                            className={formError.role ? 'invalid_field' : ''}
                            onChange={updateValue}>
                            <option value="loan officer">Loan Officer</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="col-xs-4">
                        <span>* Date of Birth</span>
                        <input type="date"
                            value={formData.dob}
                            onChange={updateValue}
                            className={formError.dob ? 'invalid_field' : ''}
                            name="dob"
                            placeholder="Date of Birth" />
                    </div>
                    <div className="col-xs-4">
                        <span>* Email</span>
                        <input type="email"
                            value={formData.email}
                            onChange={updateValue}
                            disabled={mode == 'EDIT'}
                            name="email"
                            className={formError.email ? 'invalid_field' : ''}
                            placeholder="Email" />
                    </div>
                </div>

                <div className="row">
                <div className="col-xs-4">
                        <span>* Phone</span>
                        <input type="text"
                            value={formData.phone}
                            onChange={updateValue}
                            name="phone"
                            className={formError.phone ? 'invalid_field' : ''}
                            placeholder="Phone" />
                    </div>
                    <div className="col-xs-4">
                        <span>* Gender</span>
                        <select name="gender"
                            className={formError.gender ? 'invalid_field' : ''}
                            value={formData.gender}
                            onChange={updateValue}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="col-xs-4">
                        <span>* Password</span>
                        <input type="password"
                            className={formError.password ? 'invalid_field' : ''}
                            onChange={updateValue}
                            name="password"
                            autoComplete="off"
                            disabled={mode == 'EDIT'}
                            value={formData.password}
                            placeholder="Enter Password" />
                    </div>
                    <div className="col-xs-4">
                        <span>* Confirmed Password</span>
                        <input type="password"
                            autoComplete="off"
                            onChange={updateValue}
                            disabled={mode == 'EDIT'}
                            className={formError.confirmedPassword ? 'invalid_field' : ''}
                            name="confirmedPassword"
                            placeholder="Enter Password Again"
                            value={formData.confirmedPassword}
                        />
                    </div>
                </div>
                <div className="btn-container">
                    {
                       mode == 'EDIT' &&
                        <Button onClick={handleEmployeeUpdate} className="primary-save-btn">Update Employee</Button>
                    }
                    {
                        mode == 'ADD' &&
                        <Button onClick={handleEmployeeSubmit} className="primary-save-btn">Add Employee</Button>
                    }
                </div>
            </Card>
            {showError && <ErrorPopup errors={errors} onClose={() => setShowError(false)} />}
        </React.Fragment>
    );
}