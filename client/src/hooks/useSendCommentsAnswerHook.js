import Axios from "axios";

import AppState from "./AppState";
import useCurrentPostCommentsHook from "./useCurrentPostCommentsHook";
import useCurrentPostCommentsQtyHook from "./useCurrentPostCommentsQtyHook";
import useLastFiveCommentsHook from "./useLastFiveCommentsHook";
import useResetFormHook from "./useResetFormHook";

const useSendCommentsAnswerHook = () => {
    const {postID, currentPostComments, name, setName, email, setEmail, text, setText, currentPostSlug} = AppState();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {getCurrentPostCommentsQty} = useCurrentPostCommentsQtyHook();
    const {getLastFiveComments} = useLastFiveCommentsHook();
    const {resetForm} = useResetFormHook();

    const sendCommentsAnswer = (parentCommentID) => {
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