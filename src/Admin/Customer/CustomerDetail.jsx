import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import apiService from "../../axios";
import Grid from "../../Element/Grid";
import DateFormatter from "../../common/DateFormatter";
import CurrencyFormatter from "../../common/CurrencyFormatter";

export const CustomerDetail = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loans, setLoans] = useState([]);
    const loanColumns = [
        {
            columnKey: 'id',
            desc: 'ID',
            display: function(item){
                return <Link to={`/loan/${item._id}/detail`}>{item._id}</Link>
            }
        },
        {
            columnKey: 'status',
            desc: 'Status'
        },
        {
            columnKey: 'sanctioned_date',
            desc: 'Sanctioned Date',
            display: function (item) {
                return <DateFormatter date={item.sanctioned_date} />
            }
        },
        {
            columnKey: 'totalAmt',
            desc: 'Total Amount',
            display: function (item) {
                return <CurrencyFormatter amount={item.totalAmt} />
            }
        },
        {
            columnKey: 'downpayment',
            desc: 'Down Payment',
            display: function (item) {
                return <CurrencyFormatter amount={item.downpayment} />
            }
        },
        {
            columnKey: 'outstandingInstallments',
            desc: 'Loan Amount',
            display: function (item) {
                return <CurrencyFormatter amount={item.loanAmt} />
            }
        },
       
        {
            columnKey: 'loanAmt',
            desc: 'Paid Amount',
            display: function (item) {
                return item.paidInstallments.length > 0
                   ? <CurrencyFormatter 
                     amount={item.paidInstallments[0]?.totalInstallmentAmount} 
                   /> : null;
            }
        },
        {
            columnKey: 'loanAmt',
            desc: 'Outstanding',
            display: function (item) {
                return item.outstandingInstallments.length > 0 ?
                 <CurrencyFormatter 
                 amount={item.outstandingInstallments[0]?.totalInstallmentAmount} 
                 /> : null
            }
        }
    ]
    useEffect(() => {
        apiService.get(`customer/${id}`)
            .then((response) => {
                setCustomer((prevCustomer) => response.customer);
                setLoans((prevLoan) => response.loans)
            }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
    }, [id])

    return (
        <div className="container">
            <div className="page_tool">
                <h3>Customer Detail</h3>
                <div className="tools menu-container">

                </div>
            </div>
            <fieldset>
                <legend>Customer Detail</legend>
                {
                    customer ? (
                        <React.Fragment>
                            <div className="row">
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Name:</strong> {customer.name} </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Phone:</strong> {customer.phone} </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Age:</strong> {customer.age} </label>
                                </div>
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Guardian:</strong> {customer.guardian} </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3">
                                    <label className="identification"> <strong> Address:</strong> {customer.address} </label>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : ''
                }

            </fieldset>
            <fieldset>
                <legend>Loans</legend>
                {
                    loans.length ? (
                        <Grid
                            data={loans}
                            sort={false}
                            showIndex={false}
                            pagination={false}
                            columns={loanColumns}
                        />
                    ) : ''
                }
            </fieldset>
        </div>
    )
}