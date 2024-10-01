import moment from "moment";
import { RESET_DISBURSE_LOAN, UPDATE_CART_ITEMS, UPDATE_CUSTOMER_SELECTION, UPDATE_GROUP_QUERY, UPDATE_LOAN_INFO, UPDATE_TOTAL_AMOUNT } from "../actions/disburse.action";

const initalState = {
    customer: null,
    group: '',
    cartItems: [],
    loanInfo: {
        downpayment: 0,
        totalAmt: 0,
        loanAmt: 0,
        extra: 0,
        installment_duration: '1W',
        installment_interval: '1Y',
        installment_amt: 0,
        installment_start_date: '',
        noOfInstallment: 0,
        outOfEMIAmount: 0,
        sanctioned_date: moment(new Date()).format("YYYY-MM-DD"),
        precollection_amt: 0
    },
    installments: []
}

export const disburseReducer = (state = initalState, action)=>{
    switch(action.type){
        case UPDATE_CUSTOMER_SELECTION: 
                return {
                    ...state,
                    customer: action.payload,
                }
        case UPDATE_GROUP_QUERY:
                return {
                    ...state,
                    group: action.payload
                }
        case UPDATE_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            }
        case UPDATE_TOTAL_AMOUNT: 
            return {
                ...state,
                loanInfo: {
                    ...state.loanInfo,
                    totalAmt: action.payload
                }
            }
        case UPDATE_LOAN_INFO:
            return {
                ...state,
                loanInfo: {
                    ...state.loanInfo,
                    ...action.payload.loanInfo
                },
                installments: action.payload.installments
            }
        case RESET_DISBURSE_LOAN:
            return initalState;
        default:
            return state;
    }
}