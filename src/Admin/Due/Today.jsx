import { useEffect, useState } from "react";
import apiService from "../../axios";
import { useDispatch } from "react-redux";
import { setGlobalError } from "../../store/actions/global.action";
import CurrencyFormatter from "../../common/CurrencyFormatter";

const Today = ()=>{
    const [installments, setInstallments] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        apiService.get(`loan/installment/today`)
            .then((response)=>{
                setInstallments(response.data)
            }).catch((error)=>{
                dispatch(setGlobalError('Something went wrong. Please try after sometimes'))
                setInstallments([]);
            })
    }, [])

    return (
        <div className="content">
            <h2>Today's Due</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Group</th>
                            <th>Address</th>
                            <th>EMI Amount</th>
                            <th>Loan Officer</th>
                            <th>Status</th>
                            <th>Paid Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        installments.length > 0 && 
                         (
                            <tbody>
                                {
                                    installments.map((installment)=>(
                                        <tr key={installment._id}>
                                            <td>{installment.customer.name}</td>
                                            <td>{installment.group.name}</td>
                                            <td>{installment.customer.address}</td>
                                            <td>
                                                <CurrencyFormatter amount={installment.installmentAmt} />
                                            </td>
                                            <td>
                                                {installment.lo.firstName} &nbsp; {installment.lo.lastName}
                                            </td>
                                            <td>
                                                {installment.status}
                                            </td>
                                            <td>
                                                {installment.actualAmt}
                                            </td>
                                            <td>
                                                {
                                                    installment.status == 'active' && <button>Pay</button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                         )
                    }
                </table>
            </div>
        </div>
    )
}
export default Today;