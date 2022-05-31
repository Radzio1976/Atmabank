import { useParams } from "react-router-dom";

import "./BlogPost.css";

const BlogPost = (props) => {
  let { slug } = useParams();

  const posts = props.posts;

  const currentPost = posts.filter(post => {
    return post.slug === slug;
  })

  console.log(currentPost)

  return(
    <div id="BlogPost">
      <div className="blogpost-container">
      <div className="blogpost-container-left-column">
      <div className="blogpost-post-container">
        <div className="blogpost-post-image">
          <img src={currentPost[0].image[0].url} alt={currentPost[0].image[0].fileName} ></img>
        </div>
        <div className="blogpost-post-text">
          <div dangerouslySetInnerHTML={{__html: currentPost[0].text.html}} />
        </div>
      </div>
      </div>
      <div className="blogpost-container-right-column">

</div>
      </div>
    </div>
  )
}

export default BlogPost;  