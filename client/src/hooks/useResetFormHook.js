import AppState from "./AppState";

const useResetFormHook = () => {
    const {setLogin, setPassword, setGoogleToken, setName, setEmail, setSubject, setText, setSendMessageSuccess} = AppState();
    
    const resetForm = () => {
      setLogin("");
      setPassword("");
      setGoogleToken("");
      setName("");
      setEmail("");
      setSubject("");
      setText("");  
      setSendMessageSuccess(false);
    };

    return {resetForm};
};

export default useResetFormHook;