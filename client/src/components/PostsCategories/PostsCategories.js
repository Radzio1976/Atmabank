import {withRouter} from 'react-router-dom';

import AppState from '../../utils/AppState';
import useUniqueCategoriesHook from '../../utils/GetUniqueCategoriesHook';
import useCategoryAndPostTitleHook from '../../utils/GetCategoryAndPostTitleHook';
import { useEffect } from 'react';

const PostsCategories = (props) => {
    const {postsMainBase, setPosts, uniqueCategories} = AppState();
    const {getUniqueCategories} = useUniqueCategoriesHook();
    const {getCategory} = useCategoryAndPostTitleHook();

    useEffect(() => {
        getUniqueCategories();
    }, []);

      const getPostsByCategory = (categoryName) => {
        let postsByCategory = postsMainBase.filter(post => {
            return post.categories[0].name === categoryName;
        })
        setPosts(postsByCategory);
      }


    return(
        <div id="PostsCategories" className="right-column-box">
        <div className="posts-categories-container right-column-box-container">
            <div className="posts-categories-title right-column-box-title">
                <h3>Kategorie</h3>
            </div>
            <nav>
                <ul>
                    {uniqueCategories.map((category, index) => {
                        return(
                            <li onClick={
                                () => {
                                props.history.push("/blog");
                                getPostsByCategory(category);
                                getCategory(category);
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

