import Axios from "axios";
import AppState from "./AppState";
import useFormChangeHook from "./GetFormChangeHook";
import useCurrentPostCommentsHook from "./GetCurrentPostCommentsHook";
import useCurrentPostCommentsQtyHook from "./GetCurrentPostCommentsQtyHook";
import useLastFiveCommentsHook from "./GetLastFiveCommentsHook";
import useResetFormHook from "./GetResetFormHook";

const useSendCommentHook = () => {
    const {postID, name, email, text, currentPostSlug} = AppState();
    const {nameChange, nameError, nameErrorChange, emailChange, emailError, emailErrorChange, textChange, textError, textErrorChange} = useFormChangeHook();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {getCurrentPostCommentsQty} = useCurrentPostCommentsQtyHook();
    const {getLastFiveComments} = useLastFiveCommentsHook();
    const {resetForm} = useResetFormHook();

    const sendComment = () => {
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
            console.log("Nie udało się wysłać komentarza");
        });
        };   
        console.log(isValid)
      };

      return {sendComment};
};

export default useSendCommentHook;