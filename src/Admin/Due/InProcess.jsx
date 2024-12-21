import React, { useEffect, useState } from "react";
import classes from './due.module.css';
import apiService from "../../axios";
import Spinner from "../../Element/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpList } from "../../store/actions/employee.action";
import CurrencyFormatter from "../../common/CurrencyFormatter";
import DateFormatter from "../../common/DateFormatter";
import Button from "../../Element/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PayNow } from "../Loan/PayNow/PayNow";
import { toast } from "react-toastify";
import { fetchLoans } from "../../store/actions/loan.action";
import { useUserRole } from "../../common/hooks/useUserRole";
import { Link } from "react-router-dom";

const DueInProgress = () => {
    const [collector, setCollector] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [installments, setInstallments] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModify, setIsModify] = useState(false);
    const [modifyItem, setModifyItem] = useState(null);
    const [counter, setCounter] = useState(0);
    const [customer, setCustomer] = useState('');
    const [totalCollection, setTotalCollection] = useState(0);
    const role = useUserRole();
    const {
        employees,
    } = useSelector((state) => state.employee)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEmpList());
    }, [dispatch]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSpinner(true)
            apiService.get(`loan/cip-list`, {
                params: {
                    collector: collector,
                    customer: customer
                }
            }).then((res) => {
                const collectionAmt = res.reduce((prev, inst)=> prev + (inst.actualAmt || 0), 0);
                setTotalCollection(collectionAmt);
                setInstallments(res);
                setSpinner(false)
            }).catch(
                (error) => {
                    console.log(error);
                    setSpinner(false)
                }
            )
        }, 500)
        return () => clearTimeout(delayDebounceFn);
    }, [collector, counter, customer])

    const handleCheckboxChange = (id) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((itemId) => itemId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    // Handle "Select All" checkbox change
    const handleSelectAll = () => {
        if (selectedItems.length === installments.length) {
            setSelectedItems([]); // Deselect all if all are selected
        } else {
            setSelectedItems(installments.map((item) => item._id)); // Select all
        }
    };

    const remove = () => {
        const payload = {
            cipIds: [...selectedItems],
            installmentIds: installments.filter((item) => {
                return selectedItems.includes(item._id)
            }).map((item) => {
                return item.installmentId;
            })
        }
        apiService.put(`loan/cip/delete`, payload)
            .then(
                (res) => {
                    toast.success(`EMI has been removed`)
                    setSelectedItems([]);
                    setCounter((prev)=> prev+1)
                }
            ).catch((error) => {
                setSelectedItems([]);
                toast.error(`Something Went Wrong. Try after sometimes`)
            })
    }

    const modify = () => {
        const item = installments.find((installment) => selectedItems[0] === installment._id);
        console.log(`item`, item)
        setModifyItem(item);
        setIsModify(true);
    }

    const onCloseModify = () => setIsModify(false);

    const modifyPay = (payload) => {
        apiService.put(`loan/cip/modify`, {
            ...payload,
            installmentId: modifyItem.installmentId
        }).then((res)=>{
                console.log(res);
                toast.success(`EMI has been modified successfully`);
                setCounter((prev)=>prev+1);
                onCloseModify();
                setSelectedItems([]);
            }).catch((error)=>{
                console.log(error);
                setSelectedItems([]);
                toast.error(`Something Went Wrong. Please Try After Sometimes`);
                onCloseModify();
            })
    }

    const handleMarkPaid = ()=>{
        setSpinner(true);
        apiService.post(`loan/confirm-payment`, {ids: selectedItems})
            .then((res)=>{
                setSpinner(false);
                dispatch(fetchLoans())
                toast.success(`EMIs has been mark as paid successfully`);
                setCounter((prev)=> prev+1);
                setSelectedItems([])
            }).catch(
                (error)=>{
                    setSpinner(false);
                    toast.error(`Something Went Wrong. Please Try After Sometimes`);
                }
            )
    }

    return (
      <React.Fragment>
        <div className={classes.filter}>
          <div className={classes.left_filter_option}>
            <div className="item">
              <span>Loan Officer</span>
              <select
                value={collector}
                onChange={(e) => setCollector(e.target.value)}
              >
                <option value={``}>--Select Collector--</option>
                {employees.map((loItem) => (
                  <option key={loItem._id} value={loItem._id}>
                    {loItem.firstName + " " + loItem.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="item">
              <span>Customer</span>
              <input
                type="text"
                name="customer"
                onChange={(e) => setCustomer(e.target.value)}
                placeholder={`Search by customer`}
              />
            </div>
          </div>

          <div className={classes.rightMenu}>
            <div className={classes.count}>
               Total Collection: <CurrencyFormatter amount={totalCollection}/>
            </div>
            {role == "admin" && (
              <React.Fragment>
                <Button disabled={selectedItems.length != 1} onClick={modify}>
                  Modify &nbsp; <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button disabled={selectedItems.length === 0} onClick={remove}>
                  Remove &nbsp; <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                  disabled={selectedItems.length === 0}
                  onClick={handleMarkPaid}
                >
                  Mak Paid &nbsp; <FontAwesomeIcon icon={faCheckDouble} />
                </Button>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Loan Officer</th>
                <th>Customer</th>
                <th>Guardian</th>
                <th>Group</th>
                <th>Collected Amount</th>
                <th>Date</th>
                <th>
                  <span>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedItems.length === installments.length &&
                        installments.length > 0
                      }
                    />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {installments.map((installment, index) => (
                <tr key={installment._id}>
                  <td>{index + 1}</td>
                  <td>
                    {installment?.collectedBy?.firstName +
                      " " +
                      installment?.collectedBy?.lastName}
                  </td>
                  <td>
                    <Link to={`/customer/detail/${installment.loanId?.customer?._id}`}>
                         {installment.loanId?.customer?.name}
                    </Link> 
                  </td>
                  <td>
                      {installment.loanId?.customer?.guardian}
                  </td>
                  <td>
                      {installment.loanId?.customer?.group?.name}
                  </td>
                  <td>
                    <CurrencyFormatter amount={installment.actualAmt} />
                  </td>
                  <td>
                    <DateFormatter date={installment.payment_date} />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(installment._id)}
                      onChange={() => handleCheckboxChange(installment._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {spinner && <Spinner />}
        {isModify && (
          <PayNow
            id={modifyItem._id}
            loanId={modifyItem.loanId._id}
            onClose={onCloseModify}
            installment_date={modifyItem.payment_date}
            installmentAmt={modifyItem.actualAmt}
            onPay={modifyPay}
          />
        )}
      </React.Fragment>
    );
}
export default DueInProgress;