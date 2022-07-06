import AppState from "./AppState";
import useCurrentPostCommentsHook from "./GetCurrentPostCommentsHook";
import useResetCommentFormHook from "./GetResetCommentFormHook";

const useShowSendAnswerFormHook = () => {
    const {currentPostComments, setMainCommentsFormVisibility} = AppState();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {resetCommentForm} = useResetCommentFormHook();

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
        resetCommentForm();
      };

      return {showSendAnswerForm};
};

export default useShowSendAnswerFormHook;