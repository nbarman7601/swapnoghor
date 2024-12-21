import { useEffect, useState } from "react";
import Card from "../../Element/Card/Card";
import styles from "./item.module.css";
import apiService from "../../axios";
import { Link, useParams } from "react-router-dom";
import DateFormatter from "../../common/DateFormatter";

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      apiService
        .get(`product/${id}/details`)
        .then((res) => {
          setItem(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <Card className={styles.flexGrid} title={`Item Details`}>
        <div className={styles.itemRow}>
          <div className={styles.itemlabel}>Name:</div>
          <div className={styles.itemSpan}>{item?.name}</div>
        </div>
        <div className={styles.itemRow}>
          <div className={styles.itemlabel}>Model:</div>
          <div className={styles.itemSpan}>{item?.model}</div>
        </div>
        <div className={styles.itemRow}>
          <div className={styles.itemlabel}>Stock:</div>
          <div className={styles.itemSpan}>{item?.stock}</div>
        </div>
        <div className={styles.itemRow}>
          <div className={styles.itemlabel}>Price:</div>
          <div className={styles.itemSpan}>{item?.price}</div>
        </div>
        <div className={styles.itemRow}>
          <div className={styles.itemlabel}>Sold Out Price:</div>
          <div className={styles.itemSpan}>{item?.eprice}</div>
        </div>
      </Card>
      <Card title={`Purchased By:`}>
          <table>
             <thead>
                <tr>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Qty</th>
                  <th>Date</th>  
                </tr> 
             </thead>
             <tbody>
                 {
                    item?.loans.map(
                      (loan, index)=>(
                        <tr key={index}>
                          <td>
                           <Link to={`/customer/detail/${loan.loan.customer._id}/`}>
                              {loan.loan.customer.name}
                           </Link> 
                          </td>
                          <td>{loan.loan.customer.address}</td>
                          <td>{loan.loan.customer.phone}</td>
                          <td>{loan.qty}</td>
                          <td>
                            <DateFormatter date={loan.loan.sanctioned_date}/>
                          </td>
                        </tr>
                      )
                    )
                 }
             </tbody>
          </table>
      </Card>
    </div>
  );
};

export default ItemDetail;
