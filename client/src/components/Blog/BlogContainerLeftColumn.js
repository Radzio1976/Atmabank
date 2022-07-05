import {withRouter} from 'react-router-dom';
import AppState from '../../utils/AppState';

const BlogContainerLeftColumn = withRouter(props => {
  const {posts} = AppState();
  
    return(
        <div className="blog-container-left-column">
          {
            posts.slice(0).reverse().map((value) => {
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
                  <p onClick={() => props.history.push(`/blog/${value.slug}`)}>Read more</p>
                </div>
              </div>
              )
            })
          }
        </div>
    )
});

export default withRouter(BlogContainerLeftColumn);