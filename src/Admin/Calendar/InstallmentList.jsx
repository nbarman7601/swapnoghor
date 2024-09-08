import { useEffect, useState } from "react"
import Popup from "../../common/Popup"
import Grid from '../../Element/Grid/index'
import CurrencyFormatter from "../../common/CurrencyFormatter"
import DateFormatter from "../../common/DateFormatter"
import Button from "../../Element/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faPrint } from "@fortawesome/free-solid-svg-icons"
import PropTypes from 'prop-types';

export const InstallmentListPopUP = ({ installments, currentMonth, currentYear, onClose }) => {
    const [title, setTitle] = useState('');
    useEffect(() => {
        const date = new Date(`${currentYear}-${currentMonth}-${installments[0]?.installment_date}`)
        const modalTitle = <DateFormatter date={date} />
        setTitle(prevTitle => modalTitle)
    }, [installments, currentYear, currentMonth])

    const gridColumns = [
        {
            columnKey: 'customer',
            desc: 'Customer',
            display: function (item) {
                return <span>{item.loanId.customer.name}</span>
            }
        },
        {
            columnKey: 'guardian',
            desc: 'Guardian',
            display: function (item) {
                return <span>{item.loanId.customer.guardian}</span>
            }
        },
        {
            columnKey: 'group',
            desc: 'Group',
            display: function (item) {
                return <span>{item.loanId.customer.group?.name}</span>
            }
        },
        {
            columnKey: 'phone',
            desc: 'Phone',
            display: function (item) {
                return <span>{item.loanId.customer?.phone}</span>
            }
        },
        {
            columnKey: 'lo',
            desc: 'Loan Officer',
            display: function (item) {
                return `${item.loanId.customer.group?.lo?.firstName} ${item.loanId.customer.group?.lo?.lastName}`
            }
        },
        {
            columnKey: 'installmentAmt',
            desc: 'Amount',
            display: function (item) {
                return <CurrencyFormatter amount={item.installmentAmt} />
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
                return <CurrencyFormatter amount={item.actualAmt} />
            }
        },
        {
            columnKey: 'collectedBy',
            desc: 'Receiver',
            display: function (item) {
                return <span>{item.collectedBy && (item.collectedBy.firstName + ' ' + item.collectedBy.lastName)}</span>
            }
        },
        {
            columnKey: 'paymnentAt',
            desc: 'Paid On',
            display: function (item) {
                return <span>
                    {
                        item.paymnentAt && (<DateFormatter date={item.paymnentAt} />)
                    }
                </span>
            }
        },
        {
            columnKey: 'actions',
            desc: 'Action',
            display: function (item) {
                return <>
                    {item.status == 'active' ? (<Button onClick={() => payNow(item)}>Pay</Button>) : null}
                </>
            }
        }
    ];

    const payNow = (item) => {
        console.log(item);
    }

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
        printWindow.focus();
        printWindow.print();
    }

    return (
        <Popup>
            <div className='popup_tool'>
                <div> {title} </div>
                <Button onClick={print}>
                    <FontAwesomeIcon icon={faPrint} />
                </Button>
                <button className="popup-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
            <div className="popup__content print-only">
                <Grid
                    data={installments}
                    columns={gridColumns}
                />
            </div>

        </Popup>
    )
}
InstallmentListPopUP.propTypes = {
    installments: PropTypes.arrayOf(PropTypes.shape({
        installment_date: PropTypes.string.isRequired,
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
    currentMonth: PropTypes.string.isRequired,
    currentYear: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};