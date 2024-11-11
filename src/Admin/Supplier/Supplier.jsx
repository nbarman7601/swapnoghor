import { useEffect, useMemo, useState } from 'react';
import classes from './supplier.module.css';
import apiService from '../../axios';
import Grid from '../../Element/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Supplier = ()=>{
    const [suppliers, setSuppliers] = useState([]);
    const columns = useMemo(()=>{
        return [
          {
            columnKey: "name",
            desc: "Supplier",
          },
          {
            columnKey: "address",
            desc: "Address",
          },
          {
            columnKey: "phone",
            desc: "Phone",
          },
          {
            columnKey: "status",
            desc: "Status"
          },
          {
            columnKey: "supplier_item",
            desc: "Item Supply"
          }
        ];
    },[])
    useEffect(()=>{
        apiService.get(`supplier/suppliers`)
            .then((res)=>{
                console.log(`response`, res);
                setSuppliers(res);
            }).catch((error)=>{
                console.log(`error`, error);
            })
    }, [])
    return (
        <div className={classes.supplierContainer}>
            <div className={classes.page_frilter_tool}>
                <div className={classes.pageFilter}>
                    <div className={classes.filterItem}>
                        <span>Status</span>
                        <select className={classes.formControl}>
                            <option value={''}>
                                --Select Status--
                            </option>
                            <option value={`active`}>Active</option>
                            <option value={`inactive`}>Inactive</option>
                        </select>
                    </div>
                    <div className={classes.filterItem}>
                        <span>Supplier</span>
                        <input
                          className={classes.supplierInput}
                          placeholder='Search by Supplier/Distributor Name'
                        />
                    </div>
                    <div className={classes.buttonItem}>
                        <button>
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.pageContainer}>
                <Grid
                    data={suppliers}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default Supplier;