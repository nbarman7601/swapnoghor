import { Link } from "react-router-dom"
import Grid from "../../Element/Grid"

export const SelectedCustomer = ({customers})=>{
        const columns = [
            {
                columnKey: 'name',
                desc: 'Name',
                display: function(item){
                    return <Link to={`/customer/detail/${item._id}`}>{item.name}</Link>
                }
            },
            {
                columnKey: 'address',
                desc: 'Address'
            },
            {
                columnKey: 'phone',
                desc: 'Phone'
            }
        ]
        return (
            <Grid
             data={customers}
             columns={columns}
            />
        )
}