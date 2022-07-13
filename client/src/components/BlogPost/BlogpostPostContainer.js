const BlogpostPostContainer = (props) => {
  const currentPost = props.currentPost;

    return(
        <div className="blogpost-post-container">
          <div className="blogpost-post-image">
            <img src={currentPost.image[0].url} alt={currentPost.image[0].fileName} ></img>
          </div>
          <div className="blogpost-post-text">
            <h5>{currentPost.title}</h5>
            <div dangerouslySetInnerHTML={{__html: currentPost.text.html}} />
          </div>
      </div>
    )
}

export default BlogpostPostContainer;