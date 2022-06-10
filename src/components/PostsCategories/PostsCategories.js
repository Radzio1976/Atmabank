import {withRouter} from 'react-router-dom';
import {useQuery, gql } from "@apollo/client";
import { useState } from 'react';

const POSTSCATEGORIESQUERY = gql`
query MyQuery {
    blogPosts {
        id
        title
        slug
        categories {
                id
                name
        }
      }
}`

const PostsCategories = (props) => {
    const allPosts = props.allPosts;
    const posts = props.posts;
    const setPosts = props.setPosts;

    const [postsCategories, setPostsCategories] = useState([]);
    const {error, loading} = useQuery(POSTSCATEGORIESQUERY, {onCompleted: (data) => 
        {setPostsCategories(data.blogPosts)
        }})
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const uniqueCategories = () => {
        const mainBaseOfCategories = postsCategories;
        let categoriesNames = [];
    
        mainBaseOfCategories.forEach(category => {
            categoriesNames.push(category.categories[0].name)
        })
    
        const uniqueCategories = [...new Set(categoriesNames)]
        return uniqueCategories.sort();
      }

      const getPostsByCategory = (categoryName) => {
        props.history.push("/blog");

        let postsByCategory = allPosts.filter(post => {
            return post.categories[0].name === categoryName;
        })
        setPosts(postsByCategory);
      }

    return(
        <div id="PostsCategories">
        <div className="posts-categories-container">
            <div className="posts-categories-title">
                <h3>Kategorie</h3>
            </div>
            <nav>
                <ul>
                    {uniqueCategories().map((category, index) => {
                        return(
                            <li onClick={() => getPostsByCategory(category)} key={index}>{category}</li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    </div>
    )
};

export default withRouter(PostsCategories);

