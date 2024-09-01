import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);

    const updateFormData = (newData) => {
        setFormData((prev) => ({
            ...prev,
            ...newData,
        }));
    };

    return (
        <FormContext.Provider
            value={{ formData, updateFormData, currentStep, setCurrentStep }}
        >
            {children}
        </FormContext.Provider>
    );
};
