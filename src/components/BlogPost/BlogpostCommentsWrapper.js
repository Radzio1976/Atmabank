import { useContext } from "react";

import BlogpostCommentNameAndTextWrapper from './BlogpostCommentNameAndTextWrapper';
import BlogpostCommentsAnswerContainer from './BlogpostCommentsAnswerContainer';
import BlogpostAddCommentsAnswerFormContainer from './BlogpostAddCommentsAnswerFormContainer';
import BlogpostCommentDateAndButtonWrapper from './BlogpostCommentDateAndButtonWrapper';

import {BlogPostContext} from './BlogPost';

const BlogpostCommentsWrapper = () => {
    const BlogPostCtx = useContext(BlogPostContext);

    return(
        <div className="blogpost-comments-wrapper">
            {
                BlogPostCtx.currentPostComments.map(comment => {
                    return(
                        <div className="blogpost-comment-wrapper" key={comment.id}>
                            <BlogpostCommentNameAndTextWrapper comment={comment} />
                            <BlogpostCommentDateAndButtonWrapper comment={comment} />
                            <BlogpostAddCommentsAnswerFormContainer comment={comment} />
                            <BlogpostCommentsAnswerContainer comment={comment} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BlogpostCommentsWrapper;