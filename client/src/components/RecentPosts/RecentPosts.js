import {withRouter} from 'react-router-dom';

import AppState from '../../hooks/AppState';
import useScrollToTopHook from '../../hooks/useScrollToTopHook';

const RecentPosts = withRouter(props => {
    const {postsMainBase} = AppState();
    const {scrollToTop} = useScrollToTopHook();

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
                                <li onClick={() => {
                                    props.history.push(`/blog/${post.slug}`)
                                    scrollToTop();
                                }} key={post.id}>{post.title}</li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
});

export default withRouter(RecentPosts);