import AppState from "./AppState";
import useFormChangeHook from "./useFormChangeHook";

const useFormValidationHook = () => {
  const {nameError, emailError, subjectError, textError} = AppState();
  const {nameErrorChange, emailErrorChange, subjectErrorChange, textErrorChange} = useFormChangeHook();

    const getFormValidation = () => {
      console.log("Validation");
    };

    return {getFormValidation};
};

export default useFormValidationHook;