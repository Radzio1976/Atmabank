import AppState from "./AppState";
import useCurrentPostCommentsHook from "./useCurrentPostCommentsHook";
import useResetFormHook from "./useResetFormHook";

const useShowSendAnswerFormHook = () => {
    const {currentPostComments, setMainCommentsFormVisibility} = AppState();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {resetForm} = useResetFormHook();

    const showSendAnswerForm = (id) => {
        const currentComments = currentPostComments.map(el => {
            if (el._id === id) {
                return {...el, isCommentAnswerOn: true}
            } else {
                return {...el, isCommentAnswerOn: false}
            }
            return {...el};
        });
      
        setMainCommentsFormVisibility(false);
        getCurrentPostComments(currentComments);
        resetForm();
      };

      return {showSendAnswerForm};
};

export default useShowSendAnswerFormHook;