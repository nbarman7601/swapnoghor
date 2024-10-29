import React, { useEffect, useState } from "react";
import classes from "./MyProfile.module.css";
import { NavLink } from "react-router-dom";
import Button from "../../Element/Button";
import Spinner from "../../Element/Spinner";
import apiService from "../../axios";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { fetchLoans } from "../../store/actions/loan.action";
import { fetchCustomers } from "../../store/actions/customer.action";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [mode, setMode] = useState("PROFILE");
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_info"));
    console.log(user);
    setProfile((prev) => user);
  }, []);

  const handleChange = (e) => {
    const updateProfile = {
      ...profile,
      [e.target.name]: e.target.value,
    };
    setProfile((prevProfile) => updateProfile);
  };

  const chnageMode = (md) => setMode(md);

  const showError = (title, listArr) => {
    const errorList = listArr.map((err, index) => <li key={index}>{err}</li>);

    toast(
      <div>
        <h3>{title}</h3>
        <ul>{errorList}</ul>
      </div>,
      {
        autoClose: true,
        dangerouslyAllowHtml: true,
        type: "error",
      }
    );
  };

  const updateUser = () => {
    const payload = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
    };
    setErrors([]);
    let profileErrors = [];
    if (payload.firstName == "") {
      profileErrors.push("First Name");
    }
    if (payload.lastName == "") {
      profileErrors.push("Last Name");
    }
    if (payload.email == "") {
      profileErrors.push("Email");
    }
    if (payload.phone == "") {
      profileErrors.push("Phone");
    }
    if (profileErrors.length == 0) {
      setSpinner(true);
      apiService
        .put(`user/${profile._id}/update`, payload)
        .then((response) => {
          console.log(response);
          setSpinner(false);
          toast.success(`Your Profile Has Been Updated Successfully. Please Logout & Login Again `);
        })
        .catch((error) => {
          setSpinner(false);
          toast.error(`Something Went Wrong. Please Try After Sometimes`);
        });
    } else {
      setErrors(profileErrors);
      showError("The following are required", profileErrors);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.pageContainer}>
        <div className={classes.sidebar}>
          <ul className={classes.nav}>
            <li
              className={classes.navItem}
              onClick={() => chnageMode("PROFILE")}
            >
              Basic Details
            </li>
            <li
              className={classes.navItem}
              onClick={() => chnageMode("PASSWORD")}
            >
              Change Password
            </li>
            <li
              className={classes.navItem}
              onClick={() => chnageMode("SCHEDULE")}
            >
             Sheduler
            </li>
          </ul>
        </div>
        <div className={classes.profileContainer}>
          {mode == "PROFILE" && profile && (
            <div className={classes.profileForm}>
              <div className={classes.item}>
                <span>First Name</span>
                <input
                  type="text"
                  value={profile.firstName}
                  className={`${
                    errors.includes("First Name") ? classes.error : ""
                  }`}
                  name={`firstName`}
                  placeholder="Enter First Name"
                  onChange={handleChange}
                />
              </div>
              <div className={classes.item}>
                <span>Last Name</span>
                <input
                  type="text"
                  value={profile.lastName}
                  placeholder="Enter Last Name"
                  className={`${
                    errors.includes("Last Name") ? classes.error : ""
                  }`}
                  name={`lastName`}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.item}>
                <span>Date Of Birth</span>
                <input
                  type="date"
                  value={profile.dob}
                  name={`dob`}
                  disabled
                  className={`${errors.includes("dob") ? classes.error : ""}`}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.item}>
                <span>Gender</span>
                <select
                  name="gender"
                  className={`${
                    errors.includes("Gender") ? classes.error : ""
                  }`}
                  onChange={handleChange}
                >
                  <option value={`male`}>Male</option>
                  <option value={`female`}>Female</option>
                </select>
              </div>
              <div className={classes.item}>
                <span>Phone</span>
                <input
                  type="text"
                  value={profile.phone}
                  name={`phone`}
                  placeholder="(+91) 937876365"
                  className={`${errors.includes("Phone") ? classes.error : ""}`}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.item}>
                <span>Email</span>
                <input
                  type="email"
                  value={profile.email}
                  placeholder="test@hafta.com"
                  name={`email`}
                  className={`${errors.includes("Email") ? classes.error : ""}`}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.itemBtn}>
                <Button onClick={updateUser}>Update</Button>
              </div>
            </div>
          )}
          {mode === "PASSWORD" && <ChangePassword />}
          { mode === 'SCHEDULE' && <Schedule/> }
        </div>
      </div>
      {spinner && <Spinner />}
    </React.Fragment>
  );
};

function Schedule(){
     const dispatch= useDispatch();
     const [loading, setLoading] = useState(false);
     const closeLoan = ()=>{
        setLoading(true);
         apiService.put(`schedule/loan-checking`, {})
              .then((res)=>{
                  setLoading(false);
                  toast.success(`Successfully Loan Mark As Closed`);
                  dispatch(fetchLoans());
              }).catch((error)=>{
                  setLoading(false);
                  toast.error(`Something Went Wrong`);
              })
     } 

     const markPaid = ()=>{
      setLoading(true);
      apiService.put(`schedule/mark-paid`, {})
           .then((res)=>{
               setLoading(false);
               toast.success(`Successfully EMI Mark As Paid`);
           }).catch((error)=>{
               setLoading(false);
               toast.error(`Something Went Wrong`);
           })
     }

     const markInactiveCustomer = ()=>{
      setLoading(true);
       apiService.put(`schedule/mark-customer-inactive`, {})
           .then((res)=>{
               setLoading(false);
               toast.success(`Customer Has Been Checked And Mark As InActive`);
               dispatch(fetchCustomers())
           }).catch((error)=>{
               setLoading(false);
               toast.error(`Something Went Wrong`);
           })
     }


     return (
      <div className={classes.flexdiv}>
        <div className={classes.btnContainer}>
            <Button onClick={closeLoan}>Check & Close Loan</Button>
            <Button onClick={markPaid}>Mark Paid</Button>
            <Button onClick={markInactiveCustomer}>Mark Customer Inactive</Button>
        </div>
        <ul>
          <li>
            <strong>Check & Close Loan: </strong><i>
            Click here to check all the active loans. If any loan has no pending due then it will mark those loan to closed
              </i>
          </li>
          <li>
            <strong>
              Mark Paid: 
            </strong>
            <i> Click here tocheck all the in-process emi and mark as paid</i>
          </li>
          <li>
            <strong>
              Mark Paid: 
            </strong>
            <i> Click here to check all the customers. If the customer has no active loan , then it will mark as in-active</i>
          </li>
        </ul>
        

          {
            loading && createPortal(<Spinner/>, document.body)
          }
      </div>
     )
}

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [spinner, setSpinner] = useState(false);

  const updatePassword = () => {
    if (
      currentPassword != "" &&
      confirmPassword != "" &&
      currentPassword != ""
    ) {
      if (newPassword === confirmPassword) {
        setSpinner(true);
        apiService.post(`user/change-password`, {
          currentPassword, newPassword
        }).then((response)=>{
            console.log(response);
            setSpinner(false)
            toast.success("Password has been changed successfully. Please Logout & Login Again")
        }).catch((error)=>{
          setSpinner(false)
        })
      } else {
        toast.error(`Password not match`);
      }
    } else {
      toast.error(`All the fields are required`);
    }
  };

  return (
    <React.Fragment>
      <div className="chnage-password">
        <h2>Change Password</h2>
        <div className={classes.profileForm}>
          <div className={classes.item}>
            <span>Password</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Current Password"
            />
          </div>
          <div className={classes.item}>
            <span>New Password</span>
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter Current Password"
            />
          </div>
          <div className={classes.item}>
            <span>Confirm Password</span>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Current Password"
            />
          </div>
          <div className={classes.itemBtn}>
            <Button onClick={updatePassword}>Update Password</Button>
          </div>
        </div>
      </div>
      {spinner && <Spinner />}
    </React.Fragment>
  );
}

export default MyProfile;
