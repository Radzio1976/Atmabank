import AppState from "./AppState";

const useResetFormHook = () => {
    const {setName, setEmail, setSubject, setText, setSendMessageSuccess} = AppState();
    
    const resetForm = () => {
        setName("");
        setEmail("");
        setSubject("");
        setText("");  
        setSendMessageSuccess(false);
      };

      return {resetForm};
};

export default useResetFormHook;