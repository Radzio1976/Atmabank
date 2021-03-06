import {withRouter} from 'react-router-dom';

import AppState from '../../hooks/AppState';
import useScrollToTopHook from '../../hooks/useScrollToTopHook';

const BlogContainerLeftColumn = withRouter(props => {
  const {posts} = AppState();
  const {scrollToTop} = useScrollToTopHook();
  
    return(
        <div className="blog-container-left-column">
          {
            posts.slice(0).reverse().map((value) => {
              return(
                <div className="blog-post-container" key={value.id}>
                <div className="blog-post-title">
                  <h3>{value.title}</h3>
                </div>
                <div className="blog-post-image">
                  <img src={value.image[0].url} alt={value.image[0].fileName}></img>
                </div>
                <div className="blog-post-text">
                  <p>{value.text.text.substring(0, 300)} ...</p>
                </div>
                <div className="blog-post-read-more">
                  <p onClick={() => {
                    props.history.push(`/blog/${value.slug}`);
                    scrollToTop();
                    }}>Więcej</p>
                </div>
              </div>
              )
            })
          }
        </div>
    )
});

export default withRouter(BlogContainerLeftColumn);