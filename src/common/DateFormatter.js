import moment from 'moment';
import React from 'react';

const DateFormatter = ({date})=>{
    return (
        <span>{moment(date).format('DD/MM/YY')}</span>
    )
}
export default DateFormatter;