import React from "react";
export const EMIInterval = ({interval})=>{
        const outputInterval = interval === '1W' ? '1 Week' : interval === '2W' ? '2 Week': '1 Month';
        return <span>{outputInterval}</span>
}