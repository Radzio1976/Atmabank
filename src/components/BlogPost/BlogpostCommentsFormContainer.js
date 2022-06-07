import React, { useEffect, useState, useContext } from "react";

import {BlogPostContext} from './BlogPost';

const BlogpostCommentsFormContainer = () => {
    const BlogPostCtx = useContext(BlogPostContext);
    
    return(
        <div className="blogpost-comments-form-container">
        <div className="blogpost-comments-form-title">
            <h1>Zostaw komentarz</h1>
            {BlogPostCtx.mainCommentsFormVisibility === false ? <button onClick={BlogPostCtx.showCommentButton}>Zostaw komentarz</button> : ""}
        </div>
        {BlogPostCtx.mainCommentsFormVisibility === true ? <div className="blogpost-comments-form-wrapper">
            <form>
                <input type="text" name="name" value={BlogPostCtx.name} onChange={(e) => BlogPostCtx.nameChange(e.target.value)} placeholder="Imię"/>
                <input type="text" name="email" value={BlogPostCtx.email} onChange={(e) => BlogPostCtx.emailChange(e.target.value)} placeholder="Email" />
                <textarea name="text" value={BlogPostCtx.text} onChange={(e) => BlogPostCtx.textChange(e.target.value)} placeholder="Twój komentarz" />
                <button onClick={BlogPostCtx.sendComment}>Wyślij</button>
            </form>
        </div> : ""}
    </div>
    )
};

export default BlogpostCommentsFormContainer;