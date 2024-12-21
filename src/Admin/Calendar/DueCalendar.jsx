import React, { useEffect, useState } from 'react';
import './Calendar.css';
import apiService from '../../axios';
import CurrencyFormatter from '../../common/CurrencyFormatter';
import Button from '../../Element/Button';
import { InstallmentListPopUP } from './InstallmentList';
import { createPortal } from 'react-dom';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const Calendar = () => {
    const [extraData, setExtraData] = useState(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [paidMoney, setPaidMoney] = useState(0);
    const [total, setTotal]= useState(0);
    const [loading, setLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [installments, setInstallments]= useState([]);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    const today = new Date();
    const currentDay = today.getDate();
    const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

    useEffect(() => {
        setLoading(preLoading => true);
        apiService.get(`loan/installment-with-datebound`, {
            params: {
                from: currentYear + '-' + currentMonth.toString().padStart(2, '0') + '-01',
                to: currentYear + '-' + currentMonth.toString().padStart(2, '0') + '-' + daysInMonth,
            }
        }).then(
            (response) => {
                const installments = response.data;
                const paidMoneyTotal = response.data.filter((installment) => installment.status === 'paid').reduce((accumulator, currentValue) => accumulator + currentValue.actualAmt, 0);
                const totalMoney = response.data.reduce((accumulator, currentValue) => accumulator + currentValue.installmentAmt, 0);

                setPaidMoney(paidMoneyTotal);
                setTotal(totalMoney)
                let groupedData = installments.reduce((grouped, installment) => {
                    const installmentDate = new Date(installment.installment_date);
                    const key = installmentDate.getDate();

                    const item = {
                        ...installment,
                        installment_date: key,
                        isPast: installmentDate < new Date(),
                    };

                    if (!grouped[key]) {
                        grouped[key] = [];
                    }

                    grouped[key].push(item);

                    return grouped;
                }, {});

                for (let day in groupedData) {
                    // Initialize accumulators
                    let totalEmi = 0;
                    let collected = 0;
                    let inProcess = 0;

                    // Process each item in the group
                    groupedData[day].forEach(item => {
                        totalEmi += item.installmentAmt;

                        if (item.status === 'paid') {
                            collected += item.actualAmt;
                        } else if (item.status === 'OIP') {
                            inProcess += item.actualAmt;
                        }
                    });

                    // Update the first item in the array with the calculated values
                    const firstItem = groupedData[day][0];
                    firstItem.totalEmi = totalEmi;
                    firstItem.collected = collected;
                    firstItem.inProcess = inProcess;
                }

                setExtraData((prevGroupedData) => groupedData);
                setLoading(preLoading => false);
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }, [currentYear, currentMonth])



    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const viewInstallment = (extrData)=>{
            setInstallments((prevInstallment)=>extrData)
            setIsPopupOpen(true);
    }
    const renderDays = () => {
        const calendarDays = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const extraInfo = extraData ? extraData[day] ? extraData[day] : [] : [];
            const isToday = isCurrentMonth && day === currentDay;
            calendarDays.push(
                <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                    <div>{day}</div>
                    {
                        loading ? 'Loading...' :
                            (<div>
                                {extraInfo.length > 0 ?
                                    (
                                        <div className="extra-data">
                                            <div className='amount_info'>
                                                <span>Total:  </span>
                                                <CurrencyFormatter amount={extraInfo[0].totalEmi} />
                                            </div>
                                            <div className='amount_info'>
                                                <span>Collected: </span>
                                                <CurrencyFormatter amount={extraInfo[0].collected} />
                                            </div>
                                            <div className='amount_info'>
                                                <span>Process: </span>
                                                <CurrencyFormatter amount={extraInfo[0].inProcess} />
                                            </div>
                                            <Button onClick={(e)=>viewInstallment(extraInfo)}>View</Button>
                                        </div>
                                    ) : null
                                }
                            </div>)
                    }
                </div>
            );
        }

        return calendarDays;
    };

    const closePopup = ()=>{
        setIsPopupOpen(false)
    }



    return (
        <div className="calendar">
            <div className='money_collection'>
                <div className='total'>
                    <strong>Total: </strong>
                    <CurrencyFormatter amount={total}/>
                </div>
                <div className='paid'>
                      <strong>Paid:</strong>
                      <CurrencyFormatter amount={paidMoney}/>
                </div>
            </div>
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>Previous</button>
                <h2>{months[currentMonth-1]} {currentYear}</h2>
                <button onClick={handleNextMonth}>Next</button>
            </div>
            <div className="calendar-week-header">
                {daysOfWeek.map(day => (
                    <div key={day} className="calendar-day-header">{day}</div>
                ))}
            </div>
            <div className="calendar-grid">
                {renderDays()}
            </div>
            {isPopupOpen && ( createPortal(
                 <InstallmentListPopUP 
                 onClose={closePopup} 
                 currentMonth={currentMonth}
                 currentYear={currentYear}
                 installments={installments} />,
                 document.body
            ))
            }
        </div>
    );
};

export default Calendar;
