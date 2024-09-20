import React from "react"
import Card from "../../../../Element/Card/Card"
import Button from "../../../../Element/Button"
import { useFormContext } from "../FormProvider";
import { useSelector } from "react-redux";

export const EmiSelection = () => {
    const { currentStep, setCurrentStep, updateFormData } = useFormContext();
    const {
        downpayment,
        totalAmt,
        loanAmt,
        extra,
        installment_duration,
        installment_interval,
        installment_amt,
        installment_start_date,
        noOfInstallment,
        outOfEMIAmount,
        sanctioned_date,
        precollection_amt
    } = useSelector((state)=> state.disburse.loanInfo);
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
                                                483783
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Extra Changes</td>
                                            <td>
                                                <input type="number"
                                                 className="input75"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Down Payment</td>
                                            <td>
                                                <input type="number"
                                                 className="input75"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Loan Amount</td>
                                            <td>
                                                <input type="number"
                                                 className="input75"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Installment Amount</td>
                                            <td>
                                                <input type="number"
                                                 className="input75"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Cycle</td>
                                            <td>
                                                <input type="number"
                                                 className="input75"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>No Of Installment</td>
                                            <td>
                                               6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Out of EMI Amount(Excess Amount)</td>
                                            <td>
                                               6
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="emi_days_info">

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