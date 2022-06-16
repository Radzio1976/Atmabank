import { useContext,  } from "react";

import { BlogPostContext } from "./BlogPost";

const BlogpostCommentsQuantityContainer = () => {
    const BlogPostCtx = useContext(BlogPostContext);

    return(
        <div className="blogpost-comments-quantity-container">
        <div className="blogpost-comments-quantity-text">
            <h3>{`${BlogPostCtx.currentPostCommentsQty} komentarz${BlogPostCtx.currentPostCommentsQty < 2 ? "" : BlogPostCtx.currentPostCommentsQty <= 4 ? "e" : "y"}`}</h3>
        </div>
    </div>
    )
};

export default BlogpostCommentsQuantityContainer;