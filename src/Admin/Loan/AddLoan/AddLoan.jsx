import React, { useState } from "react";
import "./AddLoan.css";
import { FormProvider } from "./FormProvider";
import { Stepper } from "./Stepper/Stepper";
import { useUserRole } from "../../../common/hooks/useUserRole";
export const AddLoan = () => {
  const role = useUserRole();
  return (
    <div>
      {role == "admin" && (
        <FormProvider>
          <Stepper />
        </FormProvider>
      )}
      {
        role !== 'admin' && (
            <div className="onelineMsg">
                <img src={`/sorry.jpg`} alt="Sorry"/> 
                <strong>Sorry you don't have access to disburse a loan</strong>
            </div>
        )
      }
    </div>
  );
};
