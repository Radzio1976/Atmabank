import React, { useEffect, useContext, createContext } from "react";
import Axios from 'axios';

import { AppContext } from "../../App";
import { BlogPostContext } from "./BlogPost";

const BlogpostCommentsContainerContext = createContext();

const BlogpostCommentsContainer = ({children}) => {
    const AppCtx = useContext(AppContext);
    const BlogPostCtx = useContext(BlogPostContext);
    const postID = BlogPostCtx.postID;



    return(
        <div className="blogpost-comments-container">{children}</div>
    )
}

export {BlogpostCommentsContainerContext};
export default BlogpostCommentsContainer;