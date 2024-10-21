import { useDispatch, useSelector } from 'react-redux';
import classes from './dashboard.module.css';
import LoanCount from './LoanCount';
import { useEffect } from 'react';
import { fetchDashboardCount } from '../../store/actions/dashboard.action';
import TodayDue, { Borrower, LoanDisbursed, OutOffStockCount } from './TodayDue/TodayDue';
import Card from '../../Element/Card/Card';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchDashboardCount());
    }, [dispatch])
    return (
        <div className={classes.dashboard}>
            <div className={classes.row}>
                <LoanCount/>
                <TodayDue />
                <Borrower />
            </div>
            <div className={classes.row}>
                <Card className={classes.disburse_loan}>
                    <div className={classes.summary_label}>
                        <h3>Disburse Loan</h3>
                    </div>
                    <div className={classes.summary_Link}>
                            <Link to={`/loan/disburse-loan`}>
                                <FontAwesomeIcon icon={faPlusCircle}/>
                            </Link>
                    </div>
                </Card>
                <LoanDisbursed />
                <OutOffStockCount />
            </div>
           
        </div>
    )
}