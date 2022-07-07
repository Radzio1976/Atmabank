import Axios from "axios";

import AppState from "./AppState";
import useFormChangeHook from "./useFormChangeHook";
import useCurrentPostCommentsHook from "./useCurrentPostCommentsHook";
import useCurrentPostCommentsQtyHook from "./useCurrentPostCommentsQtyHook";
import useLastFiveCommentsHook from "./useLastFiveCommentsHook";
import useResetFormHook from "./useResetFormHook";

const useSendCommentsAnswerHook = () => {
    const {postID, currentPostComments, name, email, text, currentPostSlug} = AppState();
    const {nameError, nameErrorChange, emailError, emailErrorChange, textError, textErrorChange} = useFormChangeHook();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {getCurrentPostCommentsQty} = useCurrentPostCommentsQtyHook();
    const {getLastFiveComments} = useLastFiveCommentsHook();
    const {resetForm} = useResetFormHook();

    const sendCommentsAnswer = (parentCommentID) => {
        let isValid = true;
    
        if (name.length < 5 || name === nameError) {
          isValid = false;
          nameErrorChange();
        }
        if (email.length < 5 || email.includes("@") === false || email === emailError) {
          isValid = false;
          emailErrorChange();
        }
        if (text.length < 20 || text === textError) {
          isValid = false;
          textErrorChange();
        }
        if (isValid) {
            let mainComment = currentPostComments.filter(comment => {
                return comment._id === parentCommentID;
            })
            console.log(mainComment[0]._id)
            let commentAnswer = {
                parentCommentID,
                postID, 
                name, 
                email, 
                text, 
                currentPostSlug,
                commentTime: new Date(), 
                isCommentAnswerOn: false,
            }
          
              Axios.post("/addCommentsAnswer", commentAnswer)
              .then(res => {
                  console.log(res.data.info);
                  console.log("Wszystkie komentarze:", res.data.comments);
                  const currentComments = res.data.comments.filter(comment => {
                    return comment.postID === postID
                });           
                getCurrentPostComments(currentComments);
                getCurrentPostCommentsQty(currentComments);
                getLastFiveComments(res.data.comments);
                resetForm();   
              })
              .catch(err => {
                  console.log("Nie udało się wysłać odpowiedzi na komentarz", err);
              });
        };
    };

    return {sendCommentsAnswer};
};

export default useSendCommentsAnswerHook;