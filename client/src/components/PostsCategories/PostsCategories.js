import {withRouter} from 'react-router-dom';

import useUniqueCategoriesHook from '../../utils/GetUniqueCategoriesHook';
import useCategoryAndPostTitleHook from '../../utils/GetCategoryAndPostTitleHook';
import usePostsByCategoryHook from '../../utils/GetPostsByCategoryHook';

const PostsCategories = (props) => {
    const {getUniqueCategories} = useUniqueCategoriesHook();
    const {getCategory} = useCategoryAndPostTitleHook();
    const {getPostsByCategory} = usePostsByCategoryHook();

    return(
        <div id="PostsCategories" className="right-column-box">
        <div className="posts-categories-container right-column-box-container">
            <div className="posts-categories-title right-column-box-title">
                <h3>Kategorie</h3>
            </div>
            <nav>
                <ul>
                    {getUniqueCategories().map((category, index) => {
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

