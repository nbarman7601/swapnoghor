import { useSelector } from 'react-redux';
import classes from './dashboard.module.css';
import CurrencyFormatter from '../../common/CurrencyFormatter';
function LoanCount() {
    const {
        count,
        loading
    } = useSelector((state)=> state.dashboard);
  
    return (
        <div className={classes.item}>
            <div className={classes.description}>
               <h3 className={classes.circle}>Loans</h3>
            </div>
            <div className={classes.itemCount}>
                Total Outstanding: <CurrencyFormatter amount={count?.totalOutstanding[0].totalAmount}/> <br />
                Paid: 345
            </div>
        </div>
    )
}

export default LoanCount;