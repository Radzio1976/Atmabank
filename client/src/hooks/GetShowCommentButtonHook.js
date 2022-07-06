import AppState from "./AppState";
import useCurrentPostCommentsHook from "./GetCurrentPostCommentsHook";
import useResetCommentFormHook from "./GetResetCommentFormHook";

const useShowCommentButtonHook = () => {
    const {currentPostComments, setMainCommentsFormVisibility} = AppState();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {resetCommentForm} = useResetCommentFormHook();

    const showCommentButton = () => {
        const currentComments = currentPostComments.map(el => {
            return {...el, isCommentAnswerOn: false}
        })
        setMainCommentsFormVisibility(true);
        getCurrentPostComments(currentComments);
        resetCommentForm();
      };

      return {showCommentButton};
};

export default useShowCommentButtonHook;