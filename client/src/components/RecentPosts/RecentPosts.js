import {withRouter} from 'react-router-dom';

import AppState from '../../utils/AppState';

const RecentPosts = withRouter(props => {
    const {postsMainBase} = AppState();

    return(
        <div id="RecentPosts"  className="right-column-box">
            <div className="recent-posts-container right-column-box-container">
                <div className="recent-posts-title right-column-box-title">
                    <h3>Aktualne posty</h3>
                </div>
                <nav>
                    <ul>
                        {postsMainBase.slice(0).reverse().map(post => {
                            return(
                                <li onClick={() => props.history.push(`/blog/${post.slug}`)} key={post.id}>{post.title}</li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
});

export default withRouter(RecentPosts);