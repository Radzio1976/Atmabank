import React, { createContext } from "react";
const BlogpostCommentsContainerContext = createContext();

const BlogpostCommentsContainer = ({children}) => {
    return(
        <div className="blogpost-comments-container">{children}</div>
    )
}

export {BlogpostCommentsContainerContext};
export default BlogpostCommentsContainer;