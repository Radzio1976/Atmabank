import BlogpostCommentsAnswerWrapper from './BlogpostCommentsAnswerWrapper';

const BlogpostCommentsAnswerContainer = (props) => {
    const comment = props.comment;
    const parentCommentIndex = props.parentCommentIndex;
    const currentPostSlug = props.currentPostSlug;

    return(
        <div className="blogpost-comments-answer-container">
        {
            comment.commentAnswers.map((answer, index) => {
                return(
                    <BlogpostCommentsAnswerWrapper key={index} comment={comment} answer={answer} index={index} parentCommentIndex={parentCommentIndex} currentPostSlug={currentPostSlug} />
                )
            })
        }
    </div>
    )
};

export default BlogpostCommentsAnswerContainer;