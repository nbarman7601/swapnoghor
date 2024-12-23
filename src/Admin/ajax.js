import apiService from "../axios";

export function payNowInstallment({id, loanId, paymentDate, actualAmt}){
    return apiService.put(`/loan/installment/${id}/mark-as-paid`, { loanId, actualAmt, payment_date: paymentDate });
}

export function deleteItemApi(id){
    return apiService.delete(`/product/${id}/delete`);
}