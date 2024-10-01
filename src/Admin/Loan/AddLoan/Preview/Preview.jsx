import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import classes from './preview.module.css'
import CurrencyFormatter from "../../../../common/CurrencyFormatter";
import DateFormatter from "../../../../common/DateFormatter";
import Button from "../../../../Element/Button";
import { useFormContext } from "../FormProvider";
import apiService from "../../../../axios";
import { setGlobalError } from "../../../../store/actions/global.action";


export const Preview = () => {
    const disburse = useSelector((state) => state.disburse);
    const { currentStep, setCurrentStep } = useFormContext();
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(disburse);
    }, [])

    const prev = ()=>{
        setCurrentStep(3);
    }

    const saveLoan = async ()=>{
        try {
            const loan = await apiService.post(`loan/create-loan`, disburse);
            if(loan)(
                setCurrentStep(5)
            )
        } catch (error) {
            console.log(error);
            dispatch(setGlobalError(error.error))
        }
    }

    return (
        <div className="preview">
            <h3>Preview</h3>
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
            <div className={classes.btnContainer}>
                <Button onClick={prev}>Prev</Button>
                <Button className={classes.right} onClick={saveLoan}>Create Loan</Button>
            </div>
        </div>
    )
}