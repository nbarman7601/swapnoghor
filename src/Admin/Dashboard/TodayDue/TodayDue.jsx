import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyFormatter from "../../../common/CurrencyFormatter"
import Card from "../../../Element/Card/Card"
import classes from './style.module.css';
import { faBattery, faIceCream, faLineChart, faUser } from "@fortawesome/free-solid-svg-icons";
import { faBatteryEmpty } from "@fortawesome/free-solid-svg-icons/faBatteryEmpty";
const TodayDue = ({ props }) => {
    return (
        <Card className={classes.summary}>
            <div className={classes.title_summary}>
                <h2>Today's Due</h2>
            </div>
            <div className={classes.count_summary}>
                <label>Today's Target: <CurrencyFormatter amount={2340.00} /></label>
                <label>Already Collected: <CurrencyFormatter amount={2340.00} /></label>
                <label>In Process: <CurrencyFormatter amount={2340.00} /></label>
                <label>Outstanding: <CurrencyFormatter amount={2340.00} /></label>
            </div>
        </Card>
    )
}
export default TodayDue;


export const Borrower = ({ props }) => {
    return (
        <Card className={classes.borrower}>
            <div className={classes.borrower_title}>
                <h3>Borrower </h3>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
            <div className={classes.borrower_count}>
                <label>Active Customer: 234</label>
                <label>In-active Customer: 23</label>
            </div>
        </Card>
    )
}

export const LoanDisbursed = () => {
    return (
        <Card className={classes.borrower}>
            <div className={classes.loan_title}>
                <h3>Loan Disbursed </h3>
                <FontAwesomeIcon icon={faLineChart}></FontAwesomeIcon>
            </div>
            <div className={classes.borrower_count}>
                <label>Today: 234</label>
                <label>This Week: 234</label>
                <label>This Month: 23</label>
            </div>
        </Card>
    )
}

export const OutOffStockCount = ()=>{
    return (
        <Card className={classes.borrower}>
            <div className={classes.loan_title}>
                <h3>Out Off Stock</h3>
                <FontAwesomeIcon icon={faBatteryEmpty}></FontAwesomeIcon>
            </div>
            <div className={classes.borrower_count}>
                <label>Total Item: 234</label>
            </div>
        </Card>
    )
}