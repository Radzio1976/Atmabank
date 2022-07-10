import AppState from "./AppState";
import useFormChangeHook from "./useFormChangeHook";

const useFormValidationHook = () => {
  const {nameError, emailError, subjectError, textError} = AppState();
  const {nameErrorChange, emailErrorChange, subjectErrorChange, textErrorChange} = useFormChangeHook();

    const getFormValidation = ({name, email, subject, text}) => {
      let isValid = true;
    
      if (name.length < 5 || name === nameError) {
        isValid = false;
        nameErrorChange();
      }
      if (email.length < 5 || email.includes("@") === false || email === emailError) {
        isValid = false;
        emailErrorChange();
      }
      if (subject !== undefined) {
        if (subject.length < 5 || subject === subjectError) {
          isValid = false;
          subjectErrorChange();
        }
      }
      if (text.length < 20 || text === textError) {
        isValid = false;
        textErrorChange();
      }
        if (isValid) {
            return true;
        } else {
          return false;
        }
    };

    return {getFormValidation};
};

export default useFormValidationHook;