import React, { useEffect, useMemo, useState } from "react";
import Card from "../../../../Element/Card/Card";
import Button from "../../../../Element/Button";
import { useFormContext } from "../FormProvider";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormatter from "../../../../common/CurrencyFormatter";
import DateFormatter from "../../../../common/DateFormatter";
import classes from './emi.module.css';
import { updateLoanInfo } from "../../../../store/actions/disburse.action";

export const EmiSelection = () => {
    const { currentStep, setCurrentStep } = useFormContext();
    const { totalAmt } = useSelector((state) => state.disburse.loanInfo);
    const dispatch = useDispatch();
    const [extra, setExtra] = useState(0);
    const [downpayment, setDownpayment] = useState(0);
    const [installmentAmt, setInstallmentAmt] = useState(100);
    const [interval, setInterval] = useState('1W');
    const [installmentStartDate, setInstallmentStartDate] = useState('');
    const [installments, setInstallments] = useState([]);
    const [sanctionDate, setSanctionDate] = useState('');

    const loanAmt = useMemo(() => (+totalAmt) + (+extra) - (downpayment), [totalAmt, downpayment, extra]);

    const noOfInstallment = useMemo(() => Math.floor(loanAmt / installmentAmt), [loanAmt, installmentAmt]);
    const excessAmt = useMemo(() => loanAmt - (noOfInstallment * installmentAmt), [loanAmt, noOfInstallment, installmentAmt]);

    useEffect(() => {
        let installments = [];
        let currentDate = new Date(installmentStartDate);
        console.log(totalAmt)
        if (installmentStartDate != '') {
            for (let i = 0; i < noOfInstallment; i++) {
                installments.push({
                    installmentNo: i + 1,
                    installment_date: new Date(currentDate), // Clone date
                    installmentAmt: Math.max(installmentAmt, 0)
                });

                switch (interval) {
                    case '1W':
                        currentDate.setDate(currentDate.getDate() + 7);
                        break;
                    case '2W':
                        currentDate.setDate(currentDate.getDate() + 15);
                        break;
                    default:
                        currentDate.setMonth(currentDate.getMonth() + 1);
                }
            }

            if (excessAmt > 0) {
                installments.push({
                    installmentNo: noOfInstallment + 1,
                    installment_date: new Date(currentDate),
                    installmentAmt: excessAmt
                });
            }

            setInstallments(installments);
        }
    }, [installmentStartDate, installmentAmt, noOfInstallment, interval, excessAmt]);

    const prev = () => setCurrentStep(2);
    const next = () => {
        let loanInfo = {
            downpayment,
            totalAmt,
            loanAmt,
            extra: extra,
            installment_duration: '1W',
            installment_interval: interval,
            installment_amt: installmentAmt,
            installment_start_date: installmentStartDate,
            noOfInstallment: noOfInstallment,
            outOfEMIAmount: excessAmt,
            sanctioned_date: sanctionDate,
            precollection_amt: 0
        }
        dispatch(updateLoanInfo({loanInfo, installments}))
        setCurrentStep(4);
    }

    return (
        <Card>
            <h3>EMI</h3>
            <div className={classes.emi__details}>
                <div className={classes.emi_info}>
                    <table className="table-installment">
                        <thead>
                            <tr><th>Key</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Amount</td>
                                <td><CurrencyFormatter amount={totalAmt}/></td>
                            </tr>
                            <tr>
                                <td>Extra Charges</td>
                                <td>
                                    <input type="number" className="input75" value={extra} onChange={(e) => setExtra(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td>Down Payment</td>
                                <td>
                                    <input type="number" value={downpayment} onChange={(e) => setDownpayment(e.target.value)} className="input75" />
                                </td>
                            </tr>
                            <tr><td>Loan Amount</td><td><CurrencyFormatter amount={loanAmt} /></td></tr>
                            <tr>
                                <td>Installment Amount</td>
                                <td>
                                    <input type="number" className="input75" value={installmentAmt} onChange={(e) => setInstallmentAmt(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td>Cycle</td>
                                <td>
                                    <select className="input75" value={interval} onChange={(e) => setInterval(e.target.value)}>
                                        <option value="1W">1 Week</option>
                                        <option value="2W">2 Week</option>
                                        <option value="1M">1 Month</option>
                                    </select>
                                </td>
                            </tr>
                            <tr><td>No Of Installments</td><td>{noOfInstallment}</td></tr>
                            <tr><td>Excess Amount</td><td><CurrencyFormatter amount={excessAmt} /></td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="emi_days_info">
                    <div className="loan__dates">
                        <div className="loan__date">
                            <label>Loan Sanctioned Date</label>
                            <input type="date" value={sanctionDate} onChange={(e) => setSanctionDate(e.target.value)} />
                        </div>
                        <div className="loan__date">
                            <label>EMI Start Date</label>
                            <input type="date" value={installmentStartDate} onChange={(e) => setInstallmentStartDate(e.target.value)} />
                        </div>
                    </div>
                    <div className={classes.tablecontainer}>
                        <table>
                            <thead>
                                <tr><th>EMI No</th><th>EMI Date</th><th>EMI Amount</th></tr>
                            </thead>
                            {installments.length > 0 && (
                                <tbody>
                                    {installments.map((inst, index) => (
                                        <tr key={index}>
                                            <td>{inst.installmentNo}</td>
                                            <td><DateFormatter date={inst.installment_date} /></td>
                                            <td><CurrencyFormatter amount={inst.installmentAmt} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
            <div className="btn-container-stepper">
                <Button onClick={prev}>Prev</Button>
                <Button onClick={next} className="next">Next</Button>
            </div>
        </Card>
    );
};
