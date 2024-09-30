import React, { useEffect, useState } from "react"
import Card from "../../../../Element/Card/Card"
import Button from "../../../../Element/Button"
import { useFormContext } from "../FormProvider";
import { useSelector } from "react-redux";
import CurrencyFormatter from "../../../../common/CurrencyFormatter";

export const EmiSelection = () => {
    const { currentStep, setCurrentStep, updateFormData } = useFormContext();
    const {
        totalAmt
    } = useSelector((state) => state.disburse.loanInfo);
    const [extra, setExtra] = useState(0);
    const [downpayment, setDownpayment] = useState(0);
    const [loanAmt, setLoanAmt] = useState(0);
    const [installment_amt, setInstament_amt] = useState(100);
    const [interval, setInterval] = useState('1W');
    const [noOfInstallment, setNoOfInstallment] = useState(0);
    const [excessAmt, setExcessAmt] = useState(0);
    useEffect(() => {
        const loanAmount = (+totalAmt) + (+extra) - (downpayment);
        setLoanAmt((prevLoanAmt) => loanAmount);
    }, [totalAmt, downpayment, extra]);

    useEffect(() => {
        const loanAmount = (+totalAmt) + (+extra) - (downpayment);
        const noOfIns = Math.floor(loanAmount / installment_amt);
        const eamt = loanAmt - (noOfIns * installment_amt);
        setNoOfInstallment(noOfIns);
        setExcessAmt(eamt);
    }, [installment_amt])

    const prev = () => {
        setCurrentStep(2)
    }

    const next = () => {
        setCurrentStep(3)
    }
    return (
        <React.Fragment>
            {
                currentStep === 3 ? (
                    <Card>
                        <h3>EMI</h3>
                        <div className="emi__deatils">
                            <div className="emi_info">
                                <table className="table-installment">
                                    <thead>
                                        <tr>
                                            <th>Key</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Total Amount</td>
                                            <td>
                                                <CurrencyFormatter amount={totalAmt} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Extra Changes</td>
                                            <td>
                                                <input type="number"
                                                    className="input75"
                                                    value={extra}
                                                    onChange={(e) => setExtra(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Down Payment</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={downpayment}
                                                    onChange={(e) => setDownpayment(e.target.value)}
                                                    className="input75"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Loan Amount</td>
                                            <td>
                                                <CurrencyFormatter amount={loanAmt} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Installment Amount</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="input75"
                                                    value={installment_amt}
                                                    onChange={(e) => setInstament_amt(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Cycle</td>
                                            <td>
                                                <select
                                                    className="input75"
                                                    value={interval}
                                                    onChange={(e) => setInterval(e.target.value)}
                                                >
                                                    <option value={`1W`}>1 Week</option>
                                                    <option value={`2W`}>2 Week</option>
                                                    <option value={`1M`}>1 Month</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>No Of Installment</td>
                                            <td>
                                                {noOfInstallment}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Out of EMI Amount(Excess Amount)</td>
                                            <td>
                                                <CurrencyFormatter amount={excessAmt} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="emi_days_info">
                                <div className="loan__dates">
                                    <div className="loan__date">
                                        <label>Loan Sanctioned Date</label>
                                        <input type="date" />
                                    </div>
                                    <div className="loan__date">
                                        <label>EMI Start Date</label>
                                        <input type="date" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="btn-container-stepper">
                            <Button onClick={prev}>Prev</Button>
                            <Button onClick={next} className={`next`}>Next</Button>
                        </div>
                    </Card>
                ) : null
            }
        </React.Fragment>
    )
}