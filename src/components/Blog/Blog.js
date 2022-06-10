import { useContext } from 'react';
import {withRouter} from 'react-router-dom';
import { AppContext } from '../../App';

import './Blog.css';

import RecentPosts from '../RecentPosts/RecentPosts';
import PostsCategories from '../PostsCategories/PostsCategories';

const Blog = withRouter(props => {
  const AppCtx = useContext(AppContext);

  return(
    <div id="Blog">
      <div className="blog-container">
        <div className="blog-container-left-column">
          {
            AppCtx.posts.slice(0).reverse().map((value) => {
              return(
                <div className="blog-post-container" key={value.id}>
                <div className="blog-post-title">
                  <h1>{value.title}</h1>
                </div>
                <div className="blog-post-image">
                  <img src={value.image[0].url} alt={value.image[0].fileName}></img>
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
          <RecentPosts />
          <PostsCategories />
        </div>
      </div>
    </div>
  )
})

export default withRouter(Blog);