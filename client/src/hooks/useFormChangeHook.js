import AppState from "./AppState";

const useFormChangeHook = () => {
    const {setName, nameError, setEmail, emailError, setSubject, subjectError, setText, textError} = AppState();

    const nameChange = (nameValue) => setName(nameValue);

    const nameErrorChange = () => setName(nameError);
    
    const emailChange = (emailValue) => setEmail(emailValue);

    const emailErrorChange = () => setEmail(emailError);

    const subjectChange = (subjectValue) => setSubject(subjectValue);

    const subjectErrorChange = () => setSubject(subjectError);

    const textChange = (textValue) => setText(textValue);

    const textErrorChange = () => setText(textError);

    return {nameChange, nameErrorChange, emailChange, emailErrorChange, subjectChange, subjectErrorChange, textChange, textErrorChange};
};

export default useFormChangeHook;