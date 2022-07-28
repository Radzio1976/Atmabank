import Axios from 'axios';

import AppState from "./AppState";
import useCurrentPostCommentsHook from "./useCurrentPostCommentsHook";
import useCurrentPostCommentsQtyHook from "./useCurrentPostCommentsQtyHook";
import useLastFiveCommentsHook from "./useLastFiveCommentsHook";

const useRemoveCommentsAnswerHook = () => {
    const {postID} = AppState();
    const {getCurrentPostComments} = useCurrentPostCommentsHook();
    const {getCurrentPostCommentsQty} = useCurrentPostCommentsQtyHook();
    const {getLastFiveComments} = useLastFiveCommentsHook();

    const removeCommentsAnswer = (commentID, commentsAnswerID) => {
        Axios.post("/removeCommentsAnswer", {commentID, commentsAnswerID})
        .then(res => {
            console.log(res.data)

            const currentComments = res.data.comments.filter(comment => {
                return comment.postID === postID
            });           
            getCurrentPostComments(currentComments);
            getCurrentPostCommentsQty(currentComments);
            getLastFiveComments(res.data.comments);
        })
        .catch(error => {
            console.log("Nie udało się wysłać numeru ID komentarza", error)
        })
    };

    return {removeCommentsAnswer};
};

export default useRemoveCommentsAnswerHook;