import { useContext } from 'react';
import {withRouter} from 'react-router-dom';

import { AppContext } from '../../App';

const PostsCategories = (props) => {
    const AppCtx = useContext(AppContext);

    const uniqueCategories = () => {
        const mainBaseOfCategories = AppCtx.allPosts;
        let categoriesNames = [];
    
        mainBaseOfCategories.forEach(category => {
            categoriesNames.push(category.categories[0].name)
        })
    
        const uniqueCategories = [...new Set(categoriesNames)]
        return uniqueCategories.sort();
      }

      const getPostsByCategory = (categoryName) => {
        let postsByCategory = AppCtx.allPosts.filter(post => {
            return post.categories[0].name === categoryName;
        })
        AppCtx.setPosts(postsByCategory);
      }


    return(
        <div id="PostsCategories" className="right-column-box">
        <div className="posts-categories-container right-column-box-container">
            <div className="posts-categories-title right-column-box-title">
                <h3>Kategorie</h3>
            </div>
            <nav>
                <ul>
                    {uniqueCategories().map((category, index) => {
                        return(
                            <li onClick={
                                () => {
                                props.history.push("/blog");
                                getPostsByCategory(category);
                                AppCtx.getSecondHeaderMenu(category);
                            }} key={index}>{category}</li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    </div>
    )
};

export default withRouter(PostsCategories);

