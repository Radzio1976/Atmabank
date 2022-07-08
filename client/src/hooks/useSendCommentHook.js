import Axios from "axios";

import AppState from "./AppState";
import useCurrentPostCommentsHook from "./useCurrentPostCommentsHook";
import useCurrentPostCommentsQtyHook from "./useCurrentPostCommentsQtyHook";
import useLastFiveCommentsHook from "./useLastFiveCommentsHook";
import useResetFormHook from "./useResetFormHook";

const useSendCommentHook = () => {
    const {postID, name, setName, email, setEmail, text, setText, currentPostSlug} = AppState();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {getCurrentPostCommentsQty} = useCurrentPostCommentsQtyHook();
    const {getLastFiveComments} = useLastFiveCommentsHook();
    const {resetForm} = useResetFormHook();

    const sendComment = () => {
        let isValid = true;
    
        if (name.length < 5 || name === "Pole imię musi zawierać conajmniej 5 znaków") {
          isValid = false;
          setName("Pole imię musi zawierać conajmniej 5 znaków");
        }
        if (email.length < 5 || email.includes("@") === false || email === "Pole email musi zawierać conajmniej 5 znaków oraz @") {
          isValid = false;
          setEmail("Pole email musi zawierać conajmniej 5 znaków oraz @")
        }
        if (text.length < 20 || text === "Pole text musi zawierać conajmniej 20 znaków") {
          isValid = false;
          setText("Pole text musi zawierać conajmniej 20 znaków")
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