import Axios from "axios";
import AppState from "./AppState";
import useFormChangeHook from "./GetFormChangeHook";
import useCurrentPostCommentsHook from "./GetCurrentPostCommentsHook";
import useCurrentPostCommentsQtyHook from "./GetCurrentPostCommentsQtyHook";
import useLastFiveCommentsHook from "./GetLastFiveCommentsHook";
import useResetFormHook from "./GetResetFormHook";

const useSendCommentHook = () => {
    const {postID, name, email, text, currentPostSlug} = AppState();
    const {nameChange, emailChange, textChange} = useFormChangeHook();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {getCurrentPostCommentsQty} = useCurrentPostCommentsQtyHook();
    const {getLastFiveComments} = useLastFiveCommentsHook();
    const {resetForm} = useResetFormHook();

    const sendComment = () => {
        console.log("Wysyłam komentarz");
        let isValid = true;
    
        if (name.length < 5) {
          isValid = false;
          nameChange("Pole Imię musi zawierać conajmniej 5 znaków");
        }
        if (email.length < 5 || email.includes("@") === false) {
          isValid = false;
          emailChange("Pole Email musi zawierać conajmniej 5 znaków oraz @");
        }
        if (text.length < 20) {
          isValid = false;
          textChange("Pole Twój komentarz musi zawierać conajmniej 20 znaków")
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
      };

      return {sendComment};
};

export default useSendCommentHook;