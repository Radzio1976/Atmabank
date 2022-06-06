import {withRouter} from 'react-router-dom';
import {useQuery, gql } from "@apollo/client";

import './Blog.css';

const ALLPOSTSQUERY = gql`
query MyQuery {
  blogPosts {
    id
    title
    slug
    image {
      id
      url
      fileName
    }
    text {
      text
      html
    }
  }
}`

const Blog = withRouter(props => {
  const {data, error, loading} = useQuery(ALLPOSTSQUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const posts = data.blogPosts;

  return(
    <div id="Blog">
      <div className="blog-container">
        <div className="blog-container-left-column">
          {
            posts.slice(0).reverse().map((value) => {
              return(
                <div className="blog-post-container" key={value.id}>
                <div className="blog-post-title">
                  <h1>{value.title}</h1>
                </div>
                <div className="blog-post-image">
                  <img src={value.image[0].url}></img>
                </div>
                <div className="blog-post-text">
                  <p>{value.text.text.substring(0, 300)} ...</p>
                </div>
                <div className="blog-post-read-more">
                  <p onClick={() => props.history.push(`/${value.slug}`)}>Read more</p>
                </div>
              </div>
              )
            })
          }
        </div>
        <div className="blog-container-right-column">

        </div>
      </div>
    </div>
  )
})

export default withRouter(Blog);