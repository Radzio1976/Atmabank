import BlogpostCommentsAnswerWrapper from './BlogpostCommentsAnswerWrapper';

const BlogpostCommentsAnswerContainer = (props) => {
    const comment = props.comment;

    return(
        <div className="blogpost-comments-answer-container">
        {
            comment.commentAnswers.map((answer, index) => {
                return(
                    <BlogpostCommentsAnswerWrapper key={index} answer={answer} index={index} />
                )
            })
        }
    </div>
    )
};

export default BlogpostCommentsAnswerContainer;