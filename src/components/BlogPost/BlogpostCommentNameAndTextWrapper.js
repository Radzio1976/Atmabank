const BlogpostCommentNameAndTextWrapper = (props) => {
    const comment = props.comment;

    return(
        <div className="blogpost-comment-name-and-text-wrapper">
        <div className="blogpost-comment-name">
            <p>{comment.name}</p>
        </div>
        <div className="blogpost-comment-text">
            <p>{comment.text}</p>
        </div>
    </div>
    )
};

export default BlogpostCommentNameAndTextWrapper;