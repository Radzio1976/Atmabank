import AppState from "./AppState";

const useFormValidationHook = (callback) => {
    const {name, nameError, email, emailError, text, textError} = AppState();
    const {nameErrorChange, emailErrorChange, textErrorChange} = useFormChangeHook();

    let isValid = true;
    
    if (name.length < 5 || name === nameError) {
      isValid = false;
      nameErrorChange();
    }
    if (email.length < 5 || email.includes("@") === false || email === emailError) {
      isValid = false;
      emailErrorChange();
    }
    if (text.length < 20 || text === textError) {
      isValid = false;
      textErrorChange();
    }
    if (isValid) { callback }
};

export default useFormValidationHook;