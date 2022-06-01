import { useParams } from "react-router-dom";

import BlogpostPostContainer from "./BlogpostPostContainer";
import BlogpostCommentsContainer from "./BlogpostCommentsContainer";

import "./BlogPost.css";

const BlogPost = (props) => {
  let { slug } = useParams();

  const sendSlug = () => {
    props.getCurrentPost(slug)
  }
  sendSlug();

  const currentPost = props.getCurrentPost(slug);

  console.log(currentPost)

  return(
    <div id="BlogPost">
      <div className="blogpost-container">
      <div className="blogpost-container-left-column">
        <BlogpostPostContainer currentPost={currentPost} />
        <BlogpostCommentsContainer currentPost={currentPost} />
      </div>
      <div className="blogpost-container-right-column">

</div>
      </div>
    </div>
  )
}

export default BlogPost;  