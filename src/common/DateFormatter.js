import moment from 'moment';
import React from 'react';

const DateFormatter = ({date})=>{
    return (
        <span>{moment(date).format('DD MMM, yyyy')}</span>
    )
}
export default DateFormatter;