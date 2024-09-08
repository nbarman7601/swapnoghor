import React, { useEffect, useState } from "react"
import Card from "../../../../Element/Card/Card"
import AutoComplete from "../../../../Element/AutoComplete/AutoComplete";
import apiService from "../../../../axios";
import { useFormContext } from "../FormProvider";
import Button from '../../../../Element/Button';
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { 
    updateCustomerSelection, 
    updateGroupQuery 
} from "../../../../store/actions/disburse.action";
const CustomerSelection = ({group, customer, updateGroup, updateCustomer}) => {
    const { formData, updateFormData, currentStep, setCurrentStep } = useFormContext();
    const [listCustomer, setListCustomer] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [initGroup, setInitgroup] = useState('');
    const fetchSuggestions = async (query) => {
        const response =  await apiService.get('/group/list', {
            params: {
                search: query,
                sortBy: 'name',
                sort: 'asc',
                page: 1,
                limit: 25,
                status: 'active'
            },
        })
        return response.data.map((item) => ({ _id: item._id, name: item.name, customers: item.customers }));
    };

    useEffect(()=>{
        setInitgroup(group);
        setSelectedCustomer(customer);
    }, [customer])

    const handleSelect = (e) => {
        console.log(e);
        updateGroup(e.name);
        setListCustomer((prevList) => e.customers)
    }

    const next = () => {
          if(group){
            updateFormData({group: group})
          }else{
            toast.error('Please Select Group');
            return 0;
          }
          if(selectedCustomer){
            updateFormData({customer: selectedCustomer})
          }else{
            toast.error('Please Select Customer');
            return 0;
          }
           setCurrentStep(2);
    }

    const handleCustomerSelection = (e)=>{
        const id = e.target.value;
        const sCustomer = listCustomer.find((lcustomer)=> lcustomer._id == id);
        updateCustomer(sCustomer);
    }

    return (
        <React.Fragment>
            {
                currentStep == 1 ?
                    (<Card>
                        <div className="customer_selection">
                            <div className="customer__detail">
                                <div className="col-xs-12">
                                    <label>Group</label>
                                    <AutoComplete
                                        fetchSuggestions={fetchSuggestions}
                                        onSelect={handleSelect}
                                    />
                                </div>
                                <div className="col-xs-12">
                                    <label>Customer</label>
                                    <select className="customer_dropdown" onChange={(e)=>handleCustomerSelection(e)}>
                                        <option>--Customer--</option>
                                        {
                                            listCustomer.map((customer) => <option key={customer._id} value={customer._id}>{customer.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="customer__information">
                                {
                                    customer ?
                                        (
                                            <table>
                                                <tbody className="mytablebody">
                                                    <tr>
                                                        <td>Name</td>
                                                        <td>{customer.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Group</td>
                                                        <td>{group}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guardian</td>
                                                        <td>{customer.guardian}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td>{customer.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phone</td>
                                                        <td>{customer.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Age</td>
                                                        <td>{customer.age}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ID Card</td>
                                                        <td>{customer.identityProof}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ID No</td>
                                                        <td>{customer.identityNo}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        ) : null
                                }

                            </div>
                        </div>
                        <div className="btn-container-stepper">
                            {/* <Button onClick={prev}>Prev</Button> */}
                            <Button onClick={next} className={`next`}>Next</Button>
                        </div>
                    </Card>) : null
            }

        </React.Fragment>

    )
}

const mapStateToProps = (state)=>{
    return {
        customer: state.disburse.customer, 
        group: state.disburse.group
    }
}

const mapDispatchToProps = (dispatch)=>{
   return {
      updateGroup: (query)=> dispatch(updateGroupQuery(query)),
      updateCustomer: (cst)=> dispatch(updateCustomerSelection(cst))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSelection);