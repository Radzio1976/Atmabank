import AppState from "./AppState";
import useCurrentPostCommentsHook from "./useCurrentPostCommentsHook";
import useResetFormHook from "./useResetFormHook";

const useShowCommentButtonHook = () => {
    const {currentPostComments, setMainCommentsFormVisibility} = AppState();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {resetForm} = useResetFormHook();

    const showCommentButton = () => {
        const currentComments = currentPostComments.map(el => {
            return {...el, isCommentAnswerOn: false}
        })
        setMainCommentsFormVisibility(true);
        getCurrentPostComments(currentComments);
        resetForm();
      };

      return {showCommentButton};
};

export default useShowCommentButtonHook;