import { useEffect, useState } from "react";
import CurrencyFormatter from "../../../common/CurrencyFormatter";
import Popup from "../../../common/Popup"
import payClass from './pay.module.css';
import DatePicker from "react-datepicker";
export const PayNow = ({ id, loanId, onClose, installment_date, installmentAmt, onPay  })=>{
    const [actualAmt, setActualAmt] = useState(installmentAmt);
    const [paymentDate, setPaymentDate] = useState(new Date());


    const handlePayNow = ()=>{
        onPay({id, actualAmt, paymentDate, loanId})
    }
    return (
        <Popup>
            <div className={payClass.payinfo}>
                <div className={payClass.item}>
                        <label>Installment Date</label>
                        <DatePicker selected={paymentDate} onChange={(date) => setPaymentDate(date)} />     
                </div>
                <div className={payClass.item}>
                    <label>
                         EMI Amount: 
                         <CurrencyFormatter amount={installmentAmt}/>
                    </label>
                </div>
                <div className={payClass.item}>
                    <label>
                         Actual Pay: 
                         <input type="number" 
                         onChange={(e)=> setActualAmt(e.target.value)}
                         value={actualAmt}
                         />
                    </label>
                </div>
                <div className={payClass.btnContainer}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handlePayNow}>Pay</button>
                </div>
            </div>
        </Popup>
    )
}