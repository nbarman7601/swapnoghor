import React, { useState } from "react"
import './AddLoan.css';
import { FormProvider } from "./FormProvider";
import { Stepper } from "./Stepper/Stepper";
export const AddLoan = ()=>{
    return (
        <React.Fragment>
            <FormProvider>
                <Stepper/>
            </FormProvider>
        </React.Fragment>
    )
}