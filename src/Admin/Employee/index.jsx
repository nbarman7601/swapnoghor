import { useEffect, useState } from "react";
import Grid from "../../Element/Grid";
import apiService from "../../axios";
const columns = [
  {
    columnKey: '_id',
    desc: 'ID'
  },
  {
    columnKey: 'firstName',
    desc: 'Name'
  },
  {
    columnKey: 'role',
    desc: 'Role'
  },
  {
    columnKey: 'email',
    desc: 'Email'
  },
  {
    columnKey: 'phone',
    desc: 'Phone'
  }
]
const Employee = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    apiService.get('/user/userlist?status=active')
        .then(
          (response)=>{
            setData((prevData)=> response);
          }
        )
  }, [])

  const handleSort =(e)=>{
      console.log(e)
  }

  return (
    <div className="container">
      <h3>Employee</h3>
     </div>
  )
}

export default Employee;