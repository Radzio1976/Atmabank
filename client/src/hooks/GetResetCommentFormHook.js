import AppState from "./AppState";

const useResetCommentFormHook = () => {
    const {setName, setEmail, setText} = AppState();
    
    const resetCommentForm = () => {
        setName("");
        setEmail("");
        setText("");  
      };

      return {resetCommentForm};
};

export default useResetCommentFormHook;