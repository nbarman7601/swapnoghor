import { useState } from "react";
import Popup from "../../../common/Popup"
import Button from "../../../Element/Button"
import classes from './forceclose.module.css';
import CurrencyFormatter from "../../../common/CurrencyFormatter";
export const ForceClose = ({onClose, outstanding, onSubmit})=>{
    const [fcAmount, setFcAmount]= useState(outstanding)

    const handleSubmit = ()=>{
        onSubmit(fcAmount);
    }
    return (
        <Popup>
            <h2>Close Loan</h2>
            <div className={classes.forceClose}>
                <div className={classes.item}>
                    <span>Total Outstanding:<CurrencyFormatter amount={outstanding} /></span>
                </div>
                <div className={classes.item}>
                    <label htmlFor="close">
                        Close Amount: 
                    </label>
                    <input name="fcAmount" value={fcAmount} onChange={(e)=> setFcAmount(e.target.value)}/>
                </div>
                <div className={classes.btnContainer}>
                    <Button type="reset" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </Popup>
    )
}