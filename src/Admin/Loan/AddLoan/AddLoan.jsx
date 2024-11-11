import React, { useState, useEffect } from "react";
import "./AddLoan.css";
import { FormProvider } from "./FormProvider";
import { Stepper } from "./Stepper/Stepper";
import { useUserRole } from "../../../common/hooks/useUserRole";
import { useDispatch } from "react-redux";
import { resetDisburseLoan } from "../../../store/actions/disburse.action";
export const AddLoan = () => {
  const role = useUserRole();
  const dispatch = useDispatch()
  useEffect(()=>{
    return ()=>{
      console.log('clearing loan data');
      dispatch(resetDisburseLoan())
    }
  }, [])


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
