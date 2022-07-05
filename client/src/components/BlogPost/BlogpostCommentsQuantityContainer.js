import AppState from "../../utils/AppState";

const BlogpostCommentsQuantityContainer = () => {
    const {currentPostCommentsQty} = AppState();

    return(
        <div className="blogpost-comments-quantity-container">
        <div className="blogpost-comments-quantity-text">
            <h3>{`${currentPostCommentsQty} komentarz${currentPostCommentsQty < 2 ? "" : currentPostCommentsQty <= 4 ? "e" : "y"}`}</h3>
        </div>
    </div>
    )
};

export default BlogpostCommentsQuantityContainer;