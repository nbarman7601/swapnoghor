import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLoanDetails } from "../../store/actions/loan.action";
import './loan.css';
import CurrencyFormatter from "../../common/CurrencyFormatter";
import DateFormatter from "../../common/DateFormatter";
import Spinner from "../../Element/Spinner";
import Button from "../../Element/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPrint } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { PayNow } from "./PayNow/PayNow";
import { ForceClose } from "./ForceClose/ForceClose";
import apiService from "../../axios";
import { toast } from "react-toastify";
export const LoanDetail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const { selectedLoan, loading } = useSelector((state) => state.loans);
    const [isPayNow, setIsPayNow] = useState(false);
    const [payItem, setPayItem] = useState(null);
    const [isForceClosePopup, setIsForceClosePopup] = useState(false);
    const outstanding = useMemo(()=>{
        return selectedLoan ? selectedLoan.installments.reduce((acc, item) => {
            return item.status == 'active' ? acc + item.installmentAmt : acc; 
        }, 0) : 0;
    }, [selectedLoan]);

    const [spinner, setSpinner] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchLoanDetails(id));
        console.log('ID', selectedLoan);
    }, [dispatch])


    const handleClick = (e)=>{
        console.log(e)
        setIsOpen(!isOpen);
    }

    const closeMenu=()=>{
        setIsOpen(false);
    }

    const forceCloseHandle = ()=>{
            setIsForceClosePopup(true);
            setIsOpen(false);
    }
    const fcApiCall = (fcAmount)=>{
        setSpinner(true);
        apiService.post('/loan/force-close', {
            loanId: id, fcAmount
        }).then((res)=>{
            toast.success('Loan Closed Successfully');
            setSpinner(false);
            setIsForceClosePopup(false);
            dispatch(fetchLoanDetails(id));
        })
    }

    const printLoan = ()=> {
        const printWindow = window.open('', '', 'height=600,width=800');
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
        .map(style => style.outerHTML)
        .join('');
        printWindow.document.write(`<html><head><title>Print</title>  ${styles}`);
        printWindow.document.write('</head><body>');
        printWindow.document.write(document.querySelector('.print-only').innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    const handlePopupClose =()=>{
        setIsPayNow(false)
    }

    const paynow = (item)=>{
        console.log(item)
        setIsPayNow(true);
        setPayItem(item);
    }

    const handlePay = ({id, actualAmt, paymentDate, loanId})=>{
        apiService.put(`/loan/installment/${id}/mark-as-paid`, { loanId, actualAmt, payment_date: paymentDate })
                .then((res)=>{
                    console.log(res);
                    toast.success(`Installment Mark Paid Successfully`);
                    dispatch(fetchLoanDetails(loanId));
                    setIsPayNow(false)
                }).catch((error)=>{
                    console.log(error);
                })
    }

    return (
        <div className="container">
            <div className="page_tool">
                <h3>Loan Detail</h3>
                <div className="tools menu-container">
                    <Button onClick={handleClick} className="custom-class">
                        More Action&nbsp;
                        <FontAwesomeIcon  icon={faEllipsisV} />
                    </Button>
                    {isOpen && (
                        <div className="menu">
                            <Button className="menu-item" onClick={printLoan}>
                                Print &nbsp;
                                <FontAwesomeIcon icon={faPrint}/>
                            </Button>
                            <Button className="menu-item" onClick={forceCloseHandle}>Force Close</Button>
                        </div>
                    )}
                </div>
            </div>

        
            {
                selectedLoan ? (
                    <div className="print-only">  
                        <fieldset>
                            <legend>Customer</legend>
                            <div className="row">
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Name:</strong> {selectedLoan.customer.name} </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Phone:</strong> {selectedLoan.customer.phone} </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Age:</strong> {selectedLoan.customer.age} </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Guardian:</strong> {selectedLoan.customer.guardian} </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Identity :</strong> {selectedLoan.customer.identityProof} </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Identity No:</strong> {selectedLoan.customer.identityNo} </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Created At:</strong> {selectedLoan.customer.createdAt} </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Address:</strong> {selectedLoan.customer.address} </span>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Loan Information</legend>
                            <div className="row">
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Total Amount:</strong>
                                        <CurrencyFormatter amount={selectedLoan.totalAmt} />
                                    </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Loan Amount:</strong>
                                        <CurrencyFormatter amount={selectedLoan.loanAmt} />
                                    </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> EMI Amount:</strong>
                                        <CurrencyFormatter amount={selectedLoan.installment_amt} />
                                    </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> EMI Cycle:</strong> {
                                        selectedLoan.installment_interval === '1M' ?
                                            'Monthly' : selectedLoan.installment_interval === '1W' ?
                                                'Weekly' : '2 Weeks'
                                    } </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Sanctioned Date:</strong>
                                        <DateFormatter date={selectedLoan.sanctioned_date} />
                                    </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Status:</strong>
                                        <strong style={{textTransform: "uppercase"}}>{selectedLoan.status}</strong> 
                                    </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification"> <strong> Close Amount:</strong>
                                        <CurrencyFormatter amount={selectedLoan.fcAmount} />
                                    </span>
                                </div>
                                <div className="col-xs-3">
                                    <span className="identification">
                                        <strong>Outstanding:</strong>
                                        <CurrencyFormatter amount={outstanding}/>
                                    </span>
                                </div>
                                
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Items</legend>
                            {
                                selectedLoan.items.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Sl No</th> 
                                                <th>Name</th>
                                                <th>Sell Price</th>
                                                <th>Quantity</th>
                                                <th>Item Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedLoan.items.map((item, index) => (
                                                    <tr key={item._id}>
                                                        <td>{(index + 1)}</td>
                                                        <td>{item.item.name}</td>
                                                        <td>
                                                            <CurrencyFormatter amount={item.unitSellPrice} />
                                                        </td>
                                                        <td>{item.qty}</td>
                                                        <td>
                                                            <CurrencyFormatter amount={item.qty * item.unitSellPrice} />
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                ) : 'No items found'
                            }
                        </fieldset>
                        <fieldset>
                            <legend>Installment</legend>
                            {
                                selectedLoan.installments.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Sl No</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Paid Amount</th>
                                                <th>Collected By</th>
                                                <th>Collected On</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedLoan.installments.map((item, index) => (
                                                    <tr key={item._id}>
                                                        <td>{(index + 1)}</td>
                                                        <td>
                                                            <DateFormatter date={item.installment_date} />
                                                        </td>
                                                        <td>
                                                            <CurrencyFormatter amount={item.installmentAmt} />
                                                        </td>
                                                        <td>{item.status}</td>
                                                        <td>
                                                          {item.actualAmt ?  <CurrencyFormatter amount={item.actualAmt} />: null}
                                                        </td>
                                                        <td>{
                                                            item.collectedBy ?
                                                                `${item.collectedBy.firstName} ${item.collectedBy.lastName}` : ''
                                                        }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.status === 'paid' ?
                                                                    <DateFormatter date={item.paymnentAt} />
                                                                    : ''
                                                            }
                                                        </td>
                                                        <td>
                                                            { 
                                                            item.status == 'active' 
                                                             && <button onClick={(e)=>paynow(item)}>Pay</button>
                                                            }
                                                            
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                ) : 'No installment found'
                            }
                        </fieldset>
                    </div>
                ) : ''
            }
            {
              isPayNow &&  createPortal(<PayNow 
                loanId={id} 
                onClose={handlePopupClose}
                installment_date={payItem.installment_date}
                installmentAmt={payItem.installmentAmt}
                id={payItem._id}
                onPay={handlePay}
                />, document.body)
            }
            {
                isForceClosePopup && createPortal(
                    <ForceClose 
                    outstanding={outstanding}
                    onSubmit={fcApiCall}
                    onClose={()=>setIsForceClosePopup(false)}/>,
                    document.body
                )
            }
            {
                loading && <Spinner />
            }
            
        </div>
    )
}