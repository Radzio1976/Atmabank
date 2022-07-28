import AppState from "./AppState";

const useFormChangeHook = () => {
    const {setLogin, setPassword, setAscii, setGoogleToken, setName, nameError, setEmail, emailError, setSubject, subjectError, setText, textError} = AppState();

    const loginChange = (loginValue) => setLogin(loginValue);

    const passwordChange = (passwordValue) => setPassword(passwordValue);

    const googleTokenChange = (googleTokenValue) => setGoogleToken(googleTokenValue);

    const nameChange = (nameValue) => setName(nameValue);

    const nameErrorChange = () => setName(nameError);
    
    const emailChange = (emailValue) => setEmail(emailValue);

    const emailErrorChange = () => setEmail(emailError);

    const subjectChange = (subjectValue) => setSubject(subjectValue);

    const subjectErrorChange = () => setSubject(subjectError);

    const textChange = (textValue) => setText(textValue);

    const textErrorChange = () => setText(textError);

    return {loginChange, passwordChange, googleTokenChange, nameChange, nameErrorChange, emailChange, emailErrorChange, subjectChange, subjectErrorChange, textChange, textErrorChange};
};

export default useFormChangeHook;