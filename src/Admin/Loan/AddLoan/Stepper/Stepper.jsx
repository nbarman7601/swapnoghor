import { EmiSelection } from "../EmiSelection/EmiSelection";
import { useFormContext } from "../FormProvider";
import { ItemSelection } from "../ItemSelection/ItemSelection";
import CustomerSelection from '../../AddLoan/CustomerSelection/CustomerSelection'
import React from "react";
import { Preview } from "../Preview/Preview";
import { Success } from "../PrintLoan/Success";
export const Stepper = () => {
    const { currentStep, setCurrentStep } = useFormContext();
    return (
        <React.Fragment>
            <div className="stepper">
                <div className={setCurrentStep === 1 ? "step active firstStep" : "step firstStep"}>Customer</div>
                <div className="step">Item</div>
                <div className="step">EMI</div>
                <div className="step lastStep">Preview</div>
            </div>
           { currentStep == 1 && <CustomerSelection /> }
           { currentStep == 2 && <ItemSelection /> }
           { currentStep == 3 && <EmiSelection /> }
           { currentStep == 4 && <Preview /> }
           { currentStep == 5 && <Success /> }
        </React.Fragment>

    )
}