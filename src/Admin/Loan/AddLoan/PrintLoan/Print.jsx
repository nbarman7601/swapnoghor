import classes from './success.module.css'
import CurrencyFormatter from "../../../../common/CurrencyFormatter";
import DateFormatter from "../../../../common/DateFormatter";
import React,{ useSelector } from 'react-redux';

const Print = () => {
    const disburse = useSelector((state) => state.disburse);
    return (
        <div className="preview">
            <div className={classes.loanPreview}>
                <fieldset className={classes.loanCustomerInfo}>
                    <legend>Customer Details</legend>
                    <div className={classes.customerInfo}>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Name:
                            </div>
                            <div className={classes.valueobj}>
                                {disburse.customer.name}
                            </div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Phone:
                            </div>
                            <div className={classes.valueobj}>
                                {disburse.customer.phone}
                            </div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Address:
                            </div>
                            <div className={classes.valueobj}>
                                {disburse.customer.address}
                            </div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Guardian:
                            </div>
                            <div className={classes.valueobj}>
                                {disburse.customer.guardian}
                            </div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Group:
                            </div>
                            <div className={classes.valueobj}>
                                {disburse.group}
                            </div>
                        </div>
                    </div>
                    <div className={classes.loanInfo}>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Loan Sanction Date:
                            </div>
                            <div className={classes.valueobj}>
                                <DateFormatter date={disburse.loanInfo.sanctioned_date} />
                            </div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                EMI Start Date:
                            </div>
                            <div className={classes.valueobj}>
                                <DateFormatter date={disburse.loanInfo.installment_start_date} />
                            </div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Total Installment:
                            </div>
                            <div className={classes.valueobj}>
                                {disburse.loanInfo.noOfInstallment}
                            </div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Total Amount:
                            </div>
                            <div className={classes.valueobj}>
                               <CurrencyFormatter amount={disburse.loanInfo.totalAmt} />
                            </div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Down Payment:
                            </div>
                            <div className={classes.valueobj}>
                               <CurrencyFormatter amount={disburse.loanInfo.downpayment} />
                            </div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.keyname}>
                                Loan Amount:
                            </div>
                            <div className={classes.valueobj}>
                               <CurrencyFormatter amount={disburse.loanInfo.loanAmt} />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className={classes.cartItems}>
                    <legend>Items</legend>
                    <table className={classes.itemContainer}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Total Unit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                disburse.cartItems.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>
                                            <CurrencyFormatter
                                                amount={item.unitSellPrice} />
                                        </td>
                                        <td>{item.qty}</td>
                                        <td>
                                            <CurrencyFormatter amount={item.unitSellPrice * item.qty} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </fieldset>
                <fieldset>
                    <legend>Installment</legend>
                    <table className={classes.installmenttable}>
                            <thead>
                                <tr>
                                    <th>EMI No</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            {
                                disburse.installments.length > 0 && (
                                    <tbody>
                                        {
                                            disburse.installments.map((inst, index)=>(
                                                <tr key={index}>
                                                    <td>{inst.installmentNo}</td>
                                                    <td>
                                                        <DateFormatter date={inst.installment_date} /> 
                                                    </td>
                                                    <td>
                                                        <CurrencyFormatter amount={inst.installmentAmt}/>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                )
                            }
                    </table>
                </fieldset>
            </div>
        </div>
    )
}

export default Print;