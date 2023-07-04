import Axios from "axios";

import AppState from "./AppState";
import useFormValidationHook from "./useFormValidationHook";
import useCurrentPostCommentsHook from "./useCurrentPostCommentsHook";
import useCurrentPostCommentsQtyHook from "./useCurrentPostCommentsQtyHook";
import useLastFiveCommentsHook from "./useLastFiveCommentsHook";
import useResetFormHook from "./useResetFormHook";

const useSendCommentsAnswerHook = () => {
  const { currentPostComments, postID, name, email, text, currentPostSlug } =
    AppState();
  const { getFormValidation } = useFormValidationHook();
  const { getCurrentPostComments } = useCurrentPostCommentsHook();
  const { getCurrentPostCommentsQty } = useCurrentPostCommentsQtyHook();
  const { getLastFiveComments } = useLastFiveCommentsHook();
  const { resetForm } = useResetFormHook();

  const sendCommentsAnswer = (parentCommentID) => {
    if (getFormValidation({ name, email, text }) === true) {
      let commentAnswer = {
        parentCommentID,
        postID,
        name,
        email,
        text,
        currentPostSlug,
        commentTime: new Date(),
        isCommentAnswerOn: false,
      };

      Axios.post("/addCommentsAnswer", commentAnswer)
        .then((res) => {
          console.log(res.data.info);

          Axios.post("/getComments")
            .then((res) => {
              const currentComments = res.data.comments.filter((comment) => {
                return comment.postID === postID;
              });
              getCurrentPostComments(currentComments);
              getCurrentPostCommentsQty(currentComments);
              getLastFiveComments(res.data.comments);
              resetForm();
            })
            .catch((err) => {
              console.log("Nie udało się pobrać komentarzy", err);
            });
        })
        .catch((err) => {
          console.log("Nie udało się wysłać odpowiedzi na komentarz", err);
        });
    }
  };

  return { sendCommentsAnswer };
};

export default useSendCommentsAnswerHook;
