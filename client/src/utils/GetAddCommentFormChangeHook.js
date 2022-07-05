import AppState from "./AppState";

const useAddCommentFormChangeHook = () => {
    const {setName, setEmail, setText} = AppState();

    const nameChange = (nameValue) => setName(nameValue);
    
    const emailChange = (emailValue) => setEmail(emailValue);

    const textChange = (textValue) => setText(textValue);

    return {nameChange, emailChange, textChange};
};

export default useAddCommentFormChangeHook;