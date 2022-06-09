const AddCommentForm = (props) => {
    const BlogPostCtx = props.BlogPostCtx;
    const sendComment = props.sendComment;

    return(
        <div className="add-comment-form">
            <h3>Formularz testowy</h3>
        <form>
            <input type="text" name="name" value={BlogPostCtx.name} onChange={(e) => BlogPostCtx.nameChange(e.target.value)} placeholder="Imię"/>
            <input type="text" name="email" value={BlogPostCtx.email} onChange={(e) => BlogPostCtx.emailChange(e.target.value)} placeholder="Email" />
            <textarea name="text" value={BlogPostCtx.text} onChange={(e) => BlogPostCtx.textChange(e.target.value)} placeholder="Twój komentarz" />
        </form>
        <button onClick={sendComment}>Wyślij</button>
    </div>
    )
};

export default AddCommentForm;