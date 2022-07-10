import Axios from "axios";

import AppState from "./AppState";
import useFormValidationHook from "./useFormValidationHook";
import useCurrentPostCommentsHook from "./useCurrentPostCommentsHook";
import useCurrentPostCommentsQtyHook from "./useCurrentPostCommentsQtyHook";
import useLastFiveCommentsHook from "./useLastFiveCommentsHook";
import useResetFormHook from "./useResetFormHook";

const useSendCommentHook = () => {
    const {postID, name, email, text, currentPostSlug} = AppState();
    const {getFormValidation} = useFormValidationHook();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {getCurrentPostCommentsQty} = useCurrentPostCommentsQtyHook();
    const {getLastFiveComments} = useLastFiveCommentsHook();
    const {resetForm} = useResetFormHook();

    const sendComment = () => {
        if (getFormValidation({name, email, text}) === true) {    
          let comment = {
            postID, 
            name, 
            email, 
            text, 
            currentPostSlug,
            commentTime: new Date(), 
            isCommentAnswerOn: false,
            commentAnswers: []
        }
        
        Axios.post("/addComment", comment)
        .then(res => {
            console.log(res.data.info);
            console.log("Wszystkie komentarze", res.data.comments);
    
            const currentComments = res.data.comments.filter(comment => {
              return comment.postID === postID
          });           
          getCurrentPostComments(currentComments);
          getCurrentPostCommentsQty(currentComments);
          getLastFiveComments(res.data.comments);
          resetForm();
          
        })
        .catch(err => {
            console.log("Nie udało się wysłać komentarza", err);
        });
        };   
      };

      return {sendComment};
};

export default useSendCommentHook;