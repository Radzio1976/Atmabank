import { useContext } from 'react';
import {withRouter} from 'react-router-dom';
import { AppContext } from '../../App';

const PostsCategories = () => {
    const AppCtx = useContext(AppContext);

    return(
        <div id="PostsCategories">
        <div className="posts-categories-container">
            <div className="posts-categories-title">
                <h3>Kategorie</h3>
            </div>
            <nav>
                <ul>
                    {AppCtx.uniqueCategories().map((category, index) => {
                        return(
                            <li onClick={() => AppCtx.getPostsByCategory(category)} key={index}>{category}</li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    </div>
    )
};

export default withRouter(PostsCategories);

