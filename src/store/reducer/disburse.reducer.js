import { UPDATE_CART_ITEMS, UPDATE_CUSTOMER_SELECTION, UPDATE_GROUP_QUERY } from "../actions/disburse.action";

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
        noOfInstallment: '',
        outOfEMIAmount: 0,
        sanctioned_date: '',
        precollection_amt: 0
    }
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
        default:
            return state;
    }
}