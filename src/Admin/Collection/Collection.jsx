import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Element/Spinner";
import { fetchCollection, setCollectionFilter, setFromDate, setToDate } from "../../store/actions/collection.action";
import { fetchEmpList } from "../../store/actions/employee.action";
import classes from './collection.module.css';
import DatePicker from "react-datepicker";
import CurrencyFormatter from "../../common/CurrencyFormatter";
import DateFormatter from "../../common/DateFormatter";
import { toast } from "react-toastify";
import Button from "../../Element/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';

const Collection = () => {
    const dispatch = useDispatch();

    const {
        loading,
        collectedBy,
        from,
        to,
        data,
        totalCollection,
        refreshNeeded
    } = useSelector((state) => state.collection);
    const {
        employees,
        needRefresh
    } = useSelector((state)=> state.employee);

    useEffect(()=>{
        if(needRefresh){
            dispatch(fetchEmpList())
        }
    }, [])

    useEffect(() => {
        if(refreshNeeded){
           dispatch(fetchCollection())
        }
    }, [dispatch])

  
    const handleFormChange = (e)=>{
        dispatch(setCollectionFilter(e.target.value));
    }

    const handleFromDate = (e)=>{
        dispatch(setFromDate(e))
    }

    const handleToDate = (e)=>{
        dispatch(setToDate(e))
    }

    const searchData = ()=>{
        if(from !== "" && to !== ""){
            dispatch(fetchCollection());
        }else{
            toast.error(`From and To Date Could Not Be Blank`)
        }
    }
    const exportToExcel = () => {
        let modifiedTableData = [];

        data.forEach((row) => {
            row.installments.forEach((installment, index) => {
                let rowData = {
                    date: index === 0 ? moment(row._id).format("YYYY-MM-DD") : '',
                    total: index === 0 ? row.totalCollection : '',
                    customers: installment.loan.customer.name,
                    group: installment.loan.customer.group?.name,
                    EMI: installment.installmentAmt,
                    actualPay: installment.actualAmt,
                    collector: `${installment.collectedBy.firstName} ${installment.collectedBy.lastName}`
                };
                modifiedTableData.push(rowData);
            });
        });

        const worksheet = XLSX.utils.json_to_sheet(modifiedTableData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAsExcelFile(excelBuffer, 'Collection_List');
    };

    const saveAsExcelFile = (buffer, fileName) => {
        const data = new Blob([buffer], { type: 'application/octet-stream' });
        saveAs(data, `${fileName}.xlsx`);
    };

    return (
        <React.Fragment>
            {
                loading && <Spinner />
            }
            <div className="collection">
                <div className={classes.page__tool}>
                    <div className={classes.page_filter}>
                        <div className={classes.item_filter}>
                            <span>Loan Officer</span>
                            <select 
                            name={`collectedBy`} 
                            value={collectedBy}
                            onChange={(e)=> handleFormChange(e)}
                            >
                               <option key="noItem" value={``}>--Select--</option>
                                {
                                    employees.map((user)=><option key={user._id} value={user._id}>{user.firstName + ' '+user.lastName}</option>)
                                }
                            </select>
                        </div>
                        <div className={classes.item_filter}>
                            <span>From:</span>
                            <DatePicker 
                                onChange={(e)=> handleFromDate(e)}
                                name={`from`} 
                                selected={from}
                                />
                        </div>
                        <div className={classes.item_filter}>
                            <span>To:</span>
                            <DatePicker
                            onChange={(e)=> handleToDate(e)} 
                            name={`to`}
                            selected={to}/>
                        </div>
                        <div className={classes.item_filter}>
                            <button className={classes.search_btn} onClick={searchData}> 
                                Search 
                            </button>
                        </div>
                    </div>
                    <div className={classes.page_count_tool}>
                        <span>Total Collection: 
                            <CurrencyFormatter amount={totalCollection}/>
                        </span>
                        <Button className={`btn btn-primary`} onClick={exportToExcel}>
                            <FontAwesomeIcon icon={faDownload}/>
                        </Button>
                    </div>
                </div>
                <div className="page_container">
                    <table className="table_container">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Total Collection</th>
                                <th>Customer</th>
                                <th>Group</th>
                                <th>EMI</th>
                                <th>Paid</th>
                                <th>Loan Officer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => (<tr key={item._id}>
                                    <td>
                                        <DateFormatter date={item._id}/>
                                    </td>
                                    <td>
                                       <CurrencyFormatter amount={item.totalCollection}/>
                                    </td>
                                    <td>
                                       <ul>
                                          {
                                            item.installments.map((litem)=> <li key={litem._id}>{litem.loan.customer.name} | &nbsp;
                                            <span className={classes.greyCol}>{litem.loan.customer.guardian}</span> &nbsp; -
                                            {litem.loan.customer.group?.weekday}
                                             </li>)
                                          }
                                       </ul>
                                    </td>
                                    <td>
                                    <ul>
                                    {
                                            item.installments.map((litem)=> <li key={litem._id}>
                                                    <span>{litem.loan.customer.group.name}</span> 
                                            </li>)
                                          }
                                          </ul>
                                    </td>
                                    <td>
                                      <ul>
                                          {
                                            item.installments.map((litem)=> <li key={litem._id}>
                                                    <CurrencyFormatter amount={litem.installmentAmt}/>
                                            </li>)
                                          }
                                       </ul>
                                    </td>
                                    <td>
                                      <ul>
                                          {
                                            item.installments.map((litem)=> <li key={litem._id}>
                                                <CurrencyFormatter amount={litem.actualAmt}/>
                                            </li>)
                                          }
                                       </ul>
                                    </td>
                                    <td>
                                    <ul>
                                          {
                                            item.installments.map((litem)=> <li key={litem._id}>{litem.collectedBy.firstName + ' '+ litem.collectedBy.lastName}</li>)
                                          }
                                       </ul>
                                    </td>
                                  
                                </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>

    )
}

export default Collection;