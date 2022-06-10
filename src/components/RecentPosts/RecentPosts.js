import {withRouter} from 'react-router-dom';
import {useQuery, gql } from "@apollo/client";

const RECENTPOSTSQUERY = gql`
query MyQuery {
  blogPosts {
    id
    title
    slug
  }
}`

const RecentPosts = (props) => {
    const {data, error, loading} = useQuery(RECENTPOSTSQUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const posts = data.blogPosts;

    return(
        <div id="RecentPosts">
            <div className="recent-posts-container">
                <div className="recent-posts-title">
                    <h3>Aktualne posty</h3>
                </div>
                <nav>
                    <ul>
                        {posts.slice(0).reverse().map(post => {
                            return(
                                <li onClick={() => props.history.push(`${post.slug}`)} key={post.id}>{post.title}</li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default withRouter(RecentPosts);