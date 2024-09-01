import { useFormContext } from "../FormProvider";

export const Stepper = () =>{
    const { currentStep, setCurrentStep } = useFormContext();
    return (
        <div className="stepper">
                <div className={setCurrentStep == 1 ? "step active firstStep": "step firstStep"}>Customer</div>
                <div className="step">Item</div>
                <div className="step">EMI</div>
                <div className="step lastStep">Preview</div>
        </div>
    )
}