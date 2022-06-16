import { useContext } from "react";
import Axios from 'axios';
import AddCommentForm from './AddCommentForm';

import { BlogPostContext } from "./BlogPost";
import {BlogpostCommentsContainerContext} from './BlogpostCommentsContainer';

const BlogpostAddCommentFormContainer= () => {
    const BlogPostCtx = useContext(BlogPostContext);
    const BlogpostCommentsContainerCtx = useContext(BlogpostCommentsContainerContext);
    
    const sendComment = () => {
        let comment = {
            postID: BlogPostCtx.postID, 
            name: BlogpostCommentsContainerCtx.name, 
            email: BlogpostCommentsContainerCtx.email, 
            text: BlogpostCommentsContainerCtx.text, 
            commentTime: BlogpostCommentsContainerCtx.commentTime, 
            isCommentAnswerOn: false,
            commentAnswers: []
        }
        
        Axios.post("http://localhost:3000/comments", comment)
        .then(res => {
            console.log("Wysłany komentarz", res.data);
            Axios.get("http://localhost:3000/comments")
            .then(res => {    
                const currentComments = res.data.filter(comment => {
                    return comment.postID === BlogPostCtx.postID
                });           
                BlogPostCtx.setCurrentPostComments(currentComments);
                BlogpostCommentsContainerCtx.resetForm();
                BlogPostCtx.getCurrentPostCommentsQty(currentComments);
            })
            .catch(err => {
                console.log("Nie udało się pobrać komentarzy")
            })
        })
        .catch(err => {
            console.log("Nie udało się wysłać komentarza");
        })
    }

    const showCommentButton = () => {
        const currentComments = BlogPostCtx.currentPostComments.map(el => {
            return {...el, isCommentAnswerOn: false}
        })
        BlogpostCommentsContainerCtx.setmainCommentsFormVisibility(true);
        BlogPostCtx.setCurrentPostComments(currentComments);
        BlogpostCommentsContainerCtx.resetForm();
      }

    return(
        <div className="blogpost-add-comment-form-container">
            <div className="blogpost-add-comment-form-title">
                <h1>Skomentuj artykuł</h1>
                {BlogpostCommentsContainerCtx.mainCommentsFormVisibility === false ? <p className="add-comment-form-button" onClick={showCommentButton}>Skomentuj</p> : ""}
            </div>
            {BlogpostCommentsContainerCtx.mainCommentsFormVisibility === true ? 
            <AddCommentForm sendComment={sendComment} />
            : ""}
        </div>
    )
};

export default BlogpostAddCommentFormContainer;