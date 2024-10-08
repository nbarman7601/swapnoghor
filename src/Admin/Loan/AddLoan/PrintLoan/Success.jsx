import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../../../Element/Button"
import { faClose, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import classes from './success.module.css';

import { resetDisburseLoan } from "../../../../store/actions/disburse.action"
import React, { Suspense } from "react"

const Print = React.lazy(()=>import('./Print'));
export const Success = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const print = () => {
        // setIsPrint(true)
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

    const gotoList = () => {
        dispatch(resetDisburseLoan())
        navigate('/loan');
    }
    return (
        <div className={classes.successContainer}>
            <div className={classes.success}>
                <div className={classes.thumb}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                </div>

                <h3 className={classes.successText}>Loan has been Created</h3>
                <div className={classes.btnSection}>
                    <Button onClick={print} className={classes.download}>
                        <FontAwesomeIcon icon={faDownload} /> Print Loan Paper
                    </Button>
                    <Button onClick={gotoList}>
                        <FontAwesomeIcon icon={faClose} /> Go To List
                    </Button>
                </div>
            </div>
            <div className={classes.hideDiv}>
                <div className="print-only">
                    <Suspense fallback={`Loading`}>
                        <Print />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}