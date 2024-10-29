import React, { useEffect, useState } from "react";
import apiService from "../../axios";
import { useDispatch } from "react-redux";
import { setGlobalError } from "../../store/actions/global.action";
import CurrencyFormatter from "../../common/CurrencyFormatter";
import { createPortal } from "react-dom";
import { PayNow } from "../Loan/PayNow/PayNow";
import { toast } from "react-toastify";
import Spinner from "../../Element/Spinner";
import classes from './due.module.css';
import Button from "../../Element/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
const Today = () => {
    const [installments, setInstallments] = useState([]);
    const [isPayNow, setIsPayNow] = useState(false);
    const [payItem, setPayItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(1);
    const [status, setStatus] = useState('')
    const dispatch = useDispatch();
    
    useEffect(() => {
        setLoading(true);
        apiService.get(`loan/installment/today?status=${status}`)
            .then((response) => {
                setInstallments(response.data);
                setLoading(false);
            }).catch((error) => {
                dispatch(setGlobalError('Something went wrong. Please try after sometimes'))
                setInstallments([]);
                setLoading(false);
            })
    }, [counter, status])

    const handleClose = () => {
        setIsPayNow(false);
    }

    const handleClickPay = (item)=>{
        setPayItem(item);
        setIsPayNow(true);
    }

    const handlePay = ({ id, actualAmt, paymentDate, loanId }) => {
        apiService.put(`/loan/installment/${id}/mark-as-paid`, { loanId, actualAmt, payment_date: paymentDate })
            .then((res) => {
                console.log(res);
                toast.success(`Installment Mark Paid Successfully`);
                setIsPayNow(false);
                setCounter(prev=> prev +1)
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <React.Fragment>
            <div className="content">
                <div className={classes.page__tool}>
                    <div className={classes.left_side_tool}>
                        <h2>Today's Due</h2>
                        <div >
                            <select value={status} onChange={(e)=> setStatus(e.target.value)}>
                                <option value={``}>--Select Status--</option>
                                <option value={`active`}>Active</option>
                                <option value={`OIP`}>In-Process</option>
                                <option value={`FC`}>Force Closed</option>
                            </select>
                        </div>
                    </div>
                    <div className={classes.right_tool}>
                        <Button title="Print">
                            <FontAwesomeIcon icon={faPrint}/>
                        </Button>
                    </div>
                </div>
               
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Group</th>
                                <th>Address</th>
                                <th>EMI Amount</th>
                                <th>Loan Officer</th>
                                <th>Status</th>
                              
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            installments.length > 0 &&
                            (
                                <tbody>
                                    {
                                        installments.map((installment) => (
                                            <tr key={installment._id}>
                                                <td>{installment.customer.name}</td>
                                                <td>{installment.group.name}</td>
                                                <td>{installment.customer.address}</td>
                                                <td>
                                                    <CurrencyFormatter amount={installment.installmentAmt} />
                                                </td>
                                                <td>
                                                    {installment.lo.firstName} &nbsp; {installment.lo.lastName}
                                                </td>
                                                <td>
                                                    <FormattedStatus status={installment.status}/>
                                                </td>
                                              
                                                <td>
                                                    {
                                                        installment.status == 'active' && <button onClick={()=>handleClickPay(installment)}>Pay</button>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            )
                        }
                    </table>
                </div>
            </div>
            {
                isPayNow && createPortal(
                    <PayNow
                        id={payItem._id}
                        loanId={payItem.loan._id}
                        onClose={handleClose}
                        installment_date={payItem.installment_date}
                        installmentAmt={payItem.installmentAmt}
                        onPay={handlePay}
                    />,
                    document.body
                )
            }
            {
                loading && <Spinner/>
            }
        </React.Fragment>
    )
}
export default Today;

const FormattedStatus = ({ status }) => {
    const getFormattedStatus = (status) => {
      switch (status) {
        case 'active':
          return 'Active';
        case 'OIP':
          return 'In-Process';
        default:
          return 'Force Closed';
      }
    };
  
    return (
      <span>{getFormattedStatus(status)}</span>
    );
};