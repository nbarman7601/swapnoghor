import React, { useEffect, useState } from "react";
import classes from './due.module.css';
import apiService from "../../axios";
import Spinner from "../../Element/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpList } from "../../store/actions/employee.action";

const DueInProgress = () => {
    const [collector, setCollector] = useState('');
    const [spinner, setSpinner] = useState(false);
    const {
        employees,
    } = useSelector((state) => state.employee)
    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(fetchEmpList());
    }, [dispatch]);
    return (
        <React.Fragment>
            <div className={classes.filter}>
                <div className={classes.left_filter_option}>
                    <div className="item">
                        <select value={collector} onChange={(e)=> setCollector(e.target.value)}>
                            <option value={``}>--Select Collector--</option>
                            {
                                employees.map((loItem) => <option key={loItem._id} value={loItem._id}>{loItem.firstName + ' ' + loItem.lastName}</option>)
                            }
                        </select>
                    </div>
                </div>

            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Loan Officer</th>
                            <th>Customer</th>
                            <th>Collected Amount</th>
                            <th>Date</th>
                            <th>
                                <label>
                                    <input type="checkbox" />Select All
                                </label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Hello</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {
                spinner && <Spinner />
            }
        </React.Fragment>
    )
}
export default DueInProgress;