import AppState from "./AppState";

const useLastFiveComments = () => {
    const {setLastFiveComments} = AppState();

    const getLastFiveComments = (allComments) => {
        let comments = [];
        let slugs = [];
        let arrayOfCommentsSortedBySlug = [];
        
        allComments.forEach(comment => {
            slugs.push(comment.currentPostSlug)
        })
    
        const uniqueSlugs = [...new Set(slugs)]
    
        uniqueSlugs.forEach(slug => {
          let postComments = allComments.filter(comment => {
            return comment.currentPostSlug === slug
          });
          arrayOfCommentsSortedBySlug.push(postComments)
        })
    
        for (let i=0; i<arrayOfCommentsSortedBySlug.length; i++) {
          for (let j=0; j<arrayOfCommentsSortedBySlug[i].length; j++) {
            arrayOfCommentsSortedBySlug[i][j].scrollID = `${arrayOfCommentsSortedBySlug[i][j].currentPostSlug}-${j + 1}-comment`;
            comments.push(arrayOfCommentsSortedBySlug[i][j]);
            for (let k=0; k<arrayOfCommentsSortedBySlug[i][j].commentAnswers.length; k++) {
              arrayOfCommentsSortedBySlug[i][j].commentAnswers[k].scrollID = `${arrayOfCommentsSortedBySlug[i][j].commentAnswers[k].currentPostSlug}-${k + 1}-answer-of-${j + 1}-comment`;
              comments.push(arrayOfCommentsSortedBySlug[i][j].commentAnswers[k]);
            }
          }
        }
    
        let sortedByDateComments = comments.sort(function(a,b){
          return new Date(b.commentTime) - new Date(a.commentTime);
        }).slice(0, 5)
        setLastFiveComments(sortedByDateComments);
    };

    return {getLastFiveComments};
};

export default useLastFiveComments;
