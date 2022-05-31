import { useParams } from "react-router-dom";

const BlogPost = (props) => {
  let { slug } = useParams();

  const posts = props.posts;

  const currentPost = posts.filter(post => {
    return post.slug === slug;
  })

  return(
    <h1>{`To jest ${currentPost[0].title.toLowerCase()}.`}</h1>
  )
}

export default BlogPost;