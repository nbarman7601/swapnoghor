import { useDispatch, useSelector } from 'react-redux';
import classes from './dashboard.module.css';
import LoanCount from './LoanCount';
import { useEffect } from 'react';
import { fetchDashboardCount } from '../../store/actions/dashboard.action';

export default function Dashboard(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchDashboardCount());
    }, [dispatch])
    return (
        <div className={classes.dashboard}>
            <div className={classes.row}>
                <LoanCount />
            </div>
        </div>
    )
}