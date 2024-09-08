import { useEffect, useState } from "react";
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
export const LoanDetail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const { selectedLoan, loading } = useSelector((state) => state.loans);
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
                            <Button className="menu-item" onClick={closeMenu}>Force Close</Button>
                        </div>
                    )}
                </div>
            </div>

            {loading ? <Spinner /> : ''}
            {
                selectedLoan ? (
                    <div className="print-only">  
                        <fieldset>
                            <legend>Customer</legend>
                            <div className="row">
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Name:</strong> {selectedLoan.customer.name} </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Phone:</strong> {selectedLoan.customer.phone} </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Age:</strong> {selectedLoan.customer.age} </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Guardian:</strong> {selectedLoan.customer.guardian} </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Identity :</strong> {selectedLoan.customer.identityProof} </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Identity No:</strong> {selectedLoan.customer.identityNo} </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Created At:</strong> {selectedLoan.customer.createdAt} </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Address:</strong> {selectedLoan.customer.address} </label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Loan Information</legend>
                            <div className="row">
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Total Amount:</strong>
                                        <CurrencyFormatter amount={selectedLoan.totalAmt} />
                                    </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Loan Amount:</strong>
                                        <CurrencyFormatter amount={selectedLoan.loanAmt} />
                                    </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> EMI Amount:</strong>
                                        <CurrencyFormatter amount={selectedLoan.installment_amt} />
                                    </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> EMI Cycle:</strong> {
                                        selectedLoan.installment_interval === '1M' ?
                                            'Monthly' : selectedLoan.installment_interval === '1W' ?
                                                'Weekly' : '2 Weeks'
                                    } </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Sanctioned Date:</strong>
                                        <DateFormatter date={selectedLoan.sanctioned_date} />
                                    </label>
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
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Paid Amount</th>
                                                <th>Collected By</th>
                                                <th>Collected On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedLoan.installments.map((item) => (
                                                    <tr key={item._id}>
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
        </div>
    )
}