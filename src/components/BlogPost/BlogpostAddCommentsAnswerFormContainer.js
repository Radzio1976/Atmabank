import { useContext } from "react";
import Axios from 'axios';

import AddCommentForm from './AddCommentForm';

import { BlogPostContext } from "./BlogPost";
import {BlogpostCommentsContainerContext} from './BlogpostCommentsContainer';

const BlogpostAddCommentsAnswerFormContainer = (props) => {
    const BlogPostCtx = useContext(BlogPostContext);
    const BlogpostCommentsContainerCtx = useContext(BlogpostCommentsContainerContext);
    const comment = props.comment;

    const sendCommentsAnswer = (parentCommentID) => {
        console.log(parentCommentID);
        console.log(BlogPostCtx.currentPostComments);
        let mainComment = BlogPostCtx.currentPostComments.filter(comment => {
            return comment.id === parentCommentID;
        })
        let commentAnswer = {
            parentCommentID,
            postID: BlogPostCtx.postID, 
            name: BlogpostCommentsContainerCtx.name, 
            email: BlogpostCommentsContainerCtx.email, 
            text: BlogpostCommentsContainerCtx.text, 
            commentTime: BlogpostCommentsContainerCtx.commentTime, 
            isCommentAnswerOn: false,
        }
        mainComment[0].commentAnswers.push(commentAnswer);
            let commentsData = {
            postID: mainComment[0].postID,
            name: mainComment[0].name, 
            email: mainComment[0].email,
            text: mainComment[0].text,
            commentTime: mainComment[0].commentTime, 
            isCommentAnswerOn: false,
            commentAnswers: mainComment[0].commentAnswers
        }
              
        Axios.put(`http://localhost:3000/comments/${parentCommentID}`, commentsData)
        .then(res => {
            console.log("Wysłana odpowiedź do komentarza :", res.data)
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
            console.log("Nie udało się wysłać odpowiedzi na komentarz", err);
        })
      
      }

    return(
        <>
        {comment.isCommentAnswerOn === true ? <div className="blogpost-add-comments-answer-form-container">
        <div className="blogpost-add-comments-answer-form">
            <h4>Odpowiedz użytkownikowi {comment.name}</h4>
        </div>
            <AddCommentForm sendComment={() => sendCommentsAnswer(comment.id)} />
        </div> : ""}
    </>
    )
};

export default BlogpostAddCommentsAnswerFormContainer;
