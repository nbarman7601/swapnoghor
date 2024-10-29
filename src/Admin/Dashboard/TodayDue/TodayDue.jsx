import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyFormatter from "../../../common/CurrencyFormatter"
import Card from "../../../Element/Card/Card"
import classes from './style.module.css';
import { faBattery, faIceCream, faLineChart, faUser } from "@fortawesome/free-solid-svg-icons";
import { faBatteryEmpty } from "@fortawesome/free-solid-svg-icons/faBatteryEmpty";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import apiService from "../../../axios";
import { useNavigate } from "react-router-dom";
const TodayDue = ({ props }) => {
    const navigate = useNavigate();
    const [countSummary, setCountSummary] = useState({
        "totalDuePending": 0,
        "inProcess": 0,
        "expectedCollection": 0,
        "alreadyCollected": 0
    })
    useEffect(()=>{
        apiService.get(`loan/installment/today-count`)
            .then((res)=>{
                setCountSummary((prev)=> res);
            }).catch((error)=>{
                console.log(error)
            })
    }, [])

    const goToTodayDue = ()=>{
        navigate('/due/today')
    }

    return (
        <Card className={classes.summary}>
            <div className={classes.title_summary} role="button" onClick={goToTodayDue}>
                <h2>Today's Due</h2>
            </div>
            <div className={classes.count_summary}>
                <label>Today's Target: <CurrencyFormatter amount={countSummary.expectedCollection} /></label>
                <label>Already Collected: <CurrencyFormatter amount={countSummary.alreadyCollected} /></label>
                <label>In Process: <CurrencyFormatter amount={countSummary.inProcess} /></label>
                <label>Outstanding: <CurrencyFormatter amount={countSummary.totalDuePending} /></label>
            </div>
        </Card>
    )
}
export default TodayDue;


export const Borrower = ({ props }) => {
    const dashboard = useSelector((state)=> state.dashboard).count;
    return (
        <Card className={classes.borrower}>
            <div className={classes.borrower_title}>
                <h3>Borrower </h3>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
            <div className={classes.borrower_count}>
                <label>Active Customer: {dashboard.uniqueCustomersCount}</label>
                {/* <label>In-active Customer: 23</label> */}
            </div>
        </Card>
    )
}

export const LoanDisbursed = () => {
    const dashboard = useSelector((state)=> state.dashboard).count;
    return (
        <Card className={classes.borrower}>
            <div className={classes.loan_title}>
                <h3>Loan Disbursed </h3>
                <FontAwesomeIcon icon={faLineChart}></FontAwesomeIcon>
            </div>
            <div className={classes.borrower_count}>
                <label>Today: 
                    <CurrencyFormatter amount={dashboard.disbusedLoan.today}/>
                </label>
                <label>This Week: 
                    <CurrencyFormatter amount={dashboard.disbusedLoan.thisWeek}/>
                </label>
                <label>This Month: 
                     <CurrencyFormatter amount={dashboard.disbusedLoan.thisMonth}/>
                </label>
            </div>
        </Card>
    )
}

export const OutOffStockCount = ()=>{
    const dashboard = useSelector((state)=> state.dashboard).count;
    useEffect(()=>{
        console.log(dashboard)
    }, [])
    return (
        <Card className={classes.borrower}>
            <div className={classes.loan_title}>
                <h3>Out Off Stock</h3>
                <FontAwesomeIcon icon={faBatteryEmpty}></FontAwesomeIcon>
            </div>
            <div className={classes.borrower_count}>
                <label>Total Item: {dashboard.outOfStock}</label>
            </div>
        </Card>
    )
}