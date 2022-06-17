import { useContext,  } from "react";

import { AppContext } from "../../App";
import { BlogPostContext } from "./BlogPost";

const BlogpostCommentsQuantityContainer = () => {
    const AppCtx = useContext(AppContext);

    return(
        <div className="blogpost-comments-quantity-container">
        <div className="blogpost-comments-quantity-text">
            <h3>{`${AppCtx.currentPostCommentsQty} komentarz${AppCtx.currentPostCommentsQty < 2 ? "" : AppCtx.currentPostCommentsQty <= 4 ? "e" : "y"}`}</h3>
        </div>
    </div>
    )
};

export default BlogpostCommentsQuantityContainer;