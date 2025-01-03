import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from "react";
import Popup from "../../common/Popup";
import Grid from '../../Element/Grid/index';
import CurrencyFormatter from "../../common/CurrencyFormatter";
import DateFormatter from "../../common/DateFormatter";
import Button from "../../Element/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPrint } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from 'react-dom';
import { PayNow } from '../Loan/PayNow/PayNow';
import { payNowInstallment } from '../ajax';
import Spinner from '../../Element/Spinner';
import { toast } from 'react-toastify';
import style from './calender.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpList } from '../../store/actions/employee.action';

export const InstallmentListPopUP = ({ installments, currentMonth, currentYear, onClose }) => {
    const [title, setTitle] = useState('');
    const [isPayNow, setIsPayNow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const dispatch = useDispatch();
    const { employees=[] } = useSelector((state)=> state.employee);
    const [lo, setLo] = useState('');
    const [filteredIntallments, setFilteredIntallments] = useState([...installments]);
    
    useEffect(()=>{
        if(employees.length == 0){
            dispatch(fetchEmpList())
        }
    }, [dispatch, employees])

    useEffect(() => {
        const date = new Date(`${currentYear}-${currentMonth}-${installments[0].installment_date}`);
        const modalTitle = <DateFormatter date={date} />;
        setTitle(prevTitle => modalTitle);
    }, [installments, currentYear, currentMonth]);

    const gridColumns = useMemo(()=>[
        {
            columnKey: 'customer',
            desc: 'Customer',
            display: function (item) {
                return <span>{item.loanId.customer.name}</span>;
            }
        },
        {
            columnKey: 'guardian',
            desc: 'Guardian',
            display: function (item) {
                return <span>{item.loanId.customer.guardian}</span>;
            }
        },
        {
            columnKey: 'group',
            desc: 'Group',
            display: function (item) {
                return <span>{item.loanId.customer.group?.name}</span>;
            }
        },
        {
            columnKey: 'phone',
            desc: 'Phone',
            display: function (item) {
                return <span>{item.loanId.customer?.phone}</span>;
            }
        },
        {
            columnKey: 'lo',
            desc: 'Loan Officer',
            display: function (item) {
                return `${item.loanId.customer.group?.lo?.firstName} ${item.loanId.customer.group?.lo?.lastName}`;
            }
        },
        {
            columnKey: 'installmentAmt',
            desc: 'Amount',
            display: function (item) {
                return <CurrencyFormatter amount={item.installmentAmt} />;
            }
        },
        {
            columnKey: 'status',
            desc: 'Status',
        },
        {
            columnKey: 'collected',
            desc: 'Collected',
            display: function (item) {
                return <CurrencyFormatter amount={item.actualAmt} />;
            }
        },
        {
            columnKey: 'collectedBy',
            desc: 'Receiver',
            display: function (item) {
                return <span>{item.collectedBy && (item.collectedBy.firstName + ' ' + item.collectedBy.lastName)}</span>;
            }
        },
        {
            columnKey: 'paymnentAt',
            desc: 'Paid On',
            display: function (item) {
                return <span>{item.paymnentAt && (<DateFormatter date={item.paymnentAt} />)}</span>;
            }
        },
        {
            columnKey: 'actions',
            desc: 'Action',
            display: function (item) {
                return <>
                    {item.status === 'active' ? (<Button onClick={() => payNow(item)}>Pay</Button>) : null}
                </>;
            }
        }
    ], []);

    const payNow = (item) => {
        setIsPayNow(true);
        setSelectedItem((prevItem)=> item);
    };

    const print = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
            .map(style => style.outerHTML)
            .join('');
        printWindow.document.write(`<html><head><title>Print</title>  ${styles}`);
        printWindow.document.write('</head><body>');
        printWindow.document.write(document.querySelector('.print-only').innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    const handlePayNow = (payload)=>{
        setSpinner(true);
        payNowInstallment(payload).then((response)=>{
            console.log(payload)
            setSpinner(false);
            toast.success("EMI Paid Successfully");
            setIsPayNow(false);
        }).catch((error)=>{
            console.log(error)
            toast.error("Something Went Wrong");
            setSpinner(false);
        })
    }

    const handleLoChange = (e)=>{
        const id = e.target.value;
        setLo(id);
        if(id != ""){
            const filteredInsts = [...installments].filter((inst)=>inst.loanId.customer.group.lo._id === id);
            setFilteredIntallments(filteredInsts)
        }else{
            setFilteredIntallments([...installments])
        }
    }

    return (
        <React.Fragment>
            <Popup>
                <div className='popup_tool'>
                    <div data-testid="today_date" className={style.todayDate}> 
                        {title} 
                    </div>
                    <button className="popup-close" data-testid="close-button" onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={style.filter__panel}>
                    <div className={style.filterItem}>
                        <span>Loan Officer</span>
                        <select value={lo} onChange={(e)=> handleLoChange(e)}>
                            <option value="">--Select Loan Officer--</option>
                            {
                                employees.map((employee)=> <option value={employee._id} key={employee._id}>{employee.firstName + ' '+ employee.lastName}</option>)
                            }
                        </select>
                    </div>
                     <Button onClick={print} className={style.printBtn} data-testid="print-button">
                        <FontAwesomeIcon icon={faPrint} />
                    </Button>
                </div>
                
                <div className="popup__content print-only">
                    <Grid
                        data={filteredIntallments}
                        columns={gridColumns}
                    />
                </div>
            </Popup>
            { isPayNow && createPortal(
                    <PayNow 
                        id={selectedItem._id}
                        loanId={selectedItem.loanId._id} 
                        onClose={onClose}
                        installment_date={selectedItem.installment_date}
                        installmentAmt={selectedItem.installmentAmt}
                        onPay={handlePayNow}
                    />,
                    document.body
                )
            }
            {
                spinner && createPortal(
                    <Spinner/>,
                    document.body
                )
            }
        </React.Fragment>
    );
};

InstallmentListPopUP.propTypes = {
    installments: PropTypes.arrayOf(PropTypes.shape({
        installment_date: PropTypes.number,
        loanId: PropTypes.shape({
            customer: PropTypes.shape({
                name: PropTypes.string.isRequired,
                guardian: PropTypes.string,
                group: PropTypes.shape({
                    name: PropTypes.string,
                    lo: PropTypes.shape({
                        firstName: PropTypes.string,
                        lastName: PropTypes.string
                    })
                }),
                phone: PropTypes.string
            }).isRequired
        }).isRequired,
        installmentAmt: PropTypes.number.isRequired,
        actualAmt: PropTypes.number,
        collectedBy: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string
        }),
        paymnentAt: PropTypes.string,
        status: PropTypes.string.isRequired
    })).isRequired,
    currentMonth: PropTypes.number.isRequired,
    currentYear: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};