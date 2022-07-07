import AppState from "./AppState";

const useFormChangeHook = () => {
    const {setName, setNameError, setEmail, setEmailError, setText, setTextError} = AppState();

    const nameChange = (nameValue) => setName(nameValue);
    
    const nameErrorChange = () => setNameError("Pole imię musi zawierać conajmniej 5 znaków");
    
    const emailChange = (emailValue) => setEmail(emailValue);

    const emailErrorChange = () => setEmailError("Pole email musi zawierać conajmniej 5 znaków oraz @");

    const textChange = (textValue) => setText(textValue);

    const textErrorChange = () => setTextError("Pole text musi zawierać conajmniej 20 znaków");

    return {nameChange, nameErrorChange, emailChange, emailErrorChange, textChange, textErrorChange};
};

export default useFormChangeHook;