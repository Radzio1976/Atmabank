import AddCommentForm from "./AddCommentForm";

import useSendCommentsAnswerHook from "../../hooks/useSendCommentsAnswerHook";

const BlogpostAddCommentsAnswerFormContainer = (props) => {
  const { sendCommentsAnswer } = useSendCommentsAnswerHook();
  const comment = props.comment;

  return (
    <>
      {comment.isCommentAnswerOn === true ? (
        <div className="blogpost-add-comments-answer-form-container">
          <div className="blogpost-add-comments-answer-form">
            <h5>Odpowiedz użytkownikowi {comment.name}</h5>
          </div>
          <AddCommentForm sendComment={() => sendCommentsAnswer(comment.id)} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BlogpostAddCommentsAnswerFormContainer;
