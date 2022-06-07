import React, { useEffect, useState, useContext } from "react";
import Axios from 'axios';

import BlogpostCommentsFormContainer from './BlogpostCommentsFormContainer';
import {BlogPostContext} from './BlogPost';

const BlogpostCommentsContainer = (props) => {
    const BlogPostCtx = useContext(BlogPostContext);
    const postID = BlogPostCtx.postID;

    useEffect(() => {
        Axios.get("http://localhost:3000/comments").
        then(res => {
            const currentComments = res.data.filter(comment => {
                return comment.postID === postID
            });        
            BlogPostCtx.setCurrentPostComments(currentComments);

        }).
        catch(err => {
            console.log("Nie udało się pobrać komentarzy")
        })
    }, []);

    return(
        <div className="blogpost-comments-container">
            <BlogpostCommentsFormContainer />

            <div className="blogpost-comments-wrapper">
            {
                BlogPostCtx.currentPostComments.map(comment => {
                    return(
                        <div className="blogpost-comment-wrapper" key={comment.id}>
                            <div className="blogpost-comment-name-and-text-wrapper">
                                <div className="blogpost-comment-name">
                                    <p>{comment.name}</p>
                                </div>
                                <div className="blogpost-comment-text">
                                    <p>{comment.text}</p>
                                </div>
                            </div>

                            <div className="blogpost-comment-date-and-button-wrapper">
                                <div className="blogpost-comment-date">
                                    <p>{comment.commentTime}</p>
                                </div>
                                <div className="blogpost-comment-button">
                                    <button onClick={(e) => BlogPostCtx.showSendAnswerForm(comment.id)}>Odpowiedz</button>
                                </div>
                            </div>

                            {comment.isCommentAnswerOn === true ? <div className="blogpost-comments-form-container">
                                <div className="blogpost-comments-form-title">
                                    <h1>Zostaw komentarz</h1>
                                </div>
                                <div className="blogpost-comments-form-wrapper">
                                    <form>
                                    <input type="text" name="name" value={BlogPostCtx.name} onChange={(e) => BlogPostCtx.nameChange(e.target.value)} placeholder="Imię"/>
                                        <input type="text" name="email" value={BlogPostCtx.email} onChange={(e) => BlogPostCtx.emailChange(e.target.value)} placeholder="Email" />
                                        <textarea name="text" value={BlogPostCtx.text} onChange={(e) => BlogPostCtx.textChange(e.target.value)} placeholder="Twój komentarz" />
                                    </form>
                                    <button onClick={() => BlogPostCtx.sendCommentsAnswer(comment.id)}>Wyślij</button>
                                </div>
                            </div> : ""}

                            <div className="blogpost-comments-answer-container" style={{paddingLeft: "25px"}}>
                                {
                                    comment.commentAnswers.map((answer, index) => {
                                        return(
                                        <div className="blogpost-comments-answer-wrapper" key={index}>
                                            <div className="blogpost-comment-name-and-text-wrapper">
                                                <div className="blogpost-comment-name">
                                                    <p>{answer.name} {answer.parentCommentID} {comment.id}</p>
                                                </div>
                                                <div className="blogpost-comment-text">
                                                    <p>{answer.text}</p>
                                                </div>
                                            </div>
                
                                            <div className="blogpost-comment-date-wrapper">
                                                <div className="blogpost-comment-date">
                                                    <p>{answer.commentTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default BlogpostCommentsContainer;