import { useSelector } from 'react-redux';
import classes from './dashboard.module.css';
import CurrencyFormatter from '../../common/CurrencyFormatter';
import Card from '../../Element/Card/Card';
function LoanCount() {
    const {
        count
    } = useSelector((state)=> state.dashboard);
  
    return (
        <Card className={classes.loanItemSummary}>
            <div className={classes.description}>
               <h3 className={classes.circle}>Loans</h3>
            </div>
            <div className={classes.countSummary}>
                <div className={classes.itemCount}>
                    <label>  Outstanding: &nbsp;
                        <CurrencyFormatter amount={count?.totalOutstanding[0].totalAmount} /> </label>
                </div>
                <div className={classes.itemCount}>
                    <label>  Active Loan: &nbsp;
                        <CurrencyFormatter amount={count?.totalLoanAmount[0].totalAmount} /> </label>
                </div>
                <div className={classes.itemCount}>
                    <label>  Overdue: &nbsp;
                        <CurrencyFormatter amount={count?.totalOverdueAmount[0].totalAmount} /> </label>
                </div>
            </div>
        </Card>
    )
}

export default LoanCount;