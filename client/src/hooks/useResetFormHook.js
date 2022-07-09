import AppState from "./AppState";

const useResetFormHook = () => {
    const {setName, setEmail, setSubject, setText} = AppState();
    
    const resetForm = () => {
        setName("");
        setEmail("");
        setSubject("");
        setText("");  
      };

      return {resetForm};
};

export default useResetFormHook;