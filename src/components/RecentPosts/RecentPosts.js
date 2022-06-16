import { useContext } from 'react';
import {withRouter} from 'react-router-dom';
import { AppContext } from '../../App';

const RecentPosts = withRouter(props => {
    const AppCtx = useContext(AppContext);

    return(
        <div id="RecentPosts">
            <div className="recent-posts-container">
                <div className="recent-posts-title">
                    <h3>Aktualne posty</h3>
                </div>
                <nav>
                    <ul>
                        {AppCtx.allPosts.slice(0).reverse().map(post => {
                            return(
                                <li onClick={() => props.history.push(`/${post.slug}`)} key={post.id}>{post.title}</li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
});

export default withRouter(RecentPosts);