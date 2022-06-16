import React, { useContext } from "react";

import { BlogPostContext } from "./BlogPost";

const BlogpostPostContainer = (props) => {
  const BlogPostCtx = useContext(BlogPostContext);
  const currentPost = BlogPostCtx.currentPost;

    return(
        <div className="blogpost-post-container">
          <div className="blogpost-post-image">
            <img src={currentPost.image[0].url} alt={currentPost.image[0].fileName} ></img>
          </div>
          <div className="blogpost-post-text">
            <div dangerouslySetInnerHTML={{__html: currentPost.text.html}} />
          </div>
      </div>
    )
}

export default BlogpostPostContainer;