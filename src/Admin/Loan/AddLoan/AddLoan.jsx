import React, { useState } from "react"
import  CustomerSelection  from "./CustomerSelection/CustomerSelection";
import './AddLoan.css';
import { FormProvider } from "./FormProvider";
import { ItemSelection } from "./ItemSelection/ItemSelection";
import { Stepper } from "./Stepper/Stepper";
import { EmiSelection } from "./EmiSelection/EmiSelection";
export const AddLoan = ()=>{
    return (
        <React.Fragment>
            <FormProvider>
                <Stepper/>
                <CustomerSelection />
                <ItemSelection />
                <EmiSelection/>
            </FormProvider>
        </React.Fragment>
    )
}