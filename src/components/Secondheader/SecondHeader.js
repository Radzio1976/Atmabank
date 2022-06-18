import { useContext } from 'react';
import {withRouter} from 'react-router-dom';

import './SecondHeader.css';

import { AppContext } from '../../App';

const SecondHeader = withRouter(props => {
    const AppCtx = useContext(AppContext);

    const getPostsByCategory = (categoryName) => {
        let postsByCategory = AppCtx.allPosts.filter(post => {
            return post.categories[0].name === categoryName;
        })
        AppCtx.setPosts(postsByCategory);
      }

    return(
        <div id="SecondHeader">
            <div className="second-header-container">
                <nav>
                    <ul>
                        <li onClick={() => props.history.push("/")}>Home</li>
                        <li onClick={() => {
                            props.history.push("/blog");
                            AppCtx.clearCategory()
                            }}>Blog</li>
                        <li onClick={() => {
                            props.history.push("/blog")
                            getPostsByCategory(AppCtx.category)
                            }}>{AppCtx.category}</li>
                        <li>{AppCtx.currentPostTitle}</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
});

export default withRouter(SecondHeader);