import AppState from "../../hooks/AppState";

const BlogpostCommentsQuantityContainer = () => {
    const {currentPostCommentsQty} = AppState();

    return(
        <div className="blogpost-comments-quantity-container">
        <div className="blogpost-comments-quantity-text">
            <h5>{`${currentPostCommentsQty} komentarz${currentPostCommentsQty === 0 ? "y" : currentPostCommentsQty < 2 ? "" : currentPostCommentsQty <= 4 ? "e" : "y"}`}</h5>
        </div>
    </div>
    )
};

export default BlogpostCommentsQuantityContainer;