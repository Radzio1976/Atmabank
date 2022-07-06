import AppState from "./AppState";

const useResetFormHook = () => {
    const {setName, setEmail, setText} = AppState();
    
    const resetForm = () => {
        setName("");
        setEmail("");
        setText("");  
      };

      return {resetForm};
};

export default useResetFormHook;