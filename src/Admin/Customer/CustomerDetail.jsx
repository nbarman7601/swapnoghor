import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import apiService from "../../axios";

export const CustomerDetail = ()=>{
    const {id} = useParams();
    const [customer, setCustomer] = useState(null);
    const [loans, setLoans] = useState([]);
    useEffect(()=>{
        console.log(id);
        apiService.get(`customer/${id}`)
            .then((response)=>{
                    console.log(response)
                }
            ).catch(
                (err)=>{
                    console.log(err)
                }
            )
    }, [id])

    return (
        <div className="container">
              <div className="page_tool">
                    <h3>Customer Detail</h3>
                    <div className="tools menu-container">
                       
                    </div>
                </div>
                <fieldset>
                    <legend>Customer Detail</legend>
                </fieldset>
                <fieldset>
                    <legend>Loans</legend>
                </fieldset>
        </div>
    )
}