import { useContext } from 'react';
import {withRouter} from 'react-router-dom';

import './SecondHeader.css';

import { AppContext } from '../../App';
import AppState from '../../utils/AppState';
import useCategoryAndPostTitleHook from '../../utils/GetCategoryAndPostTitleHook';

const SecondHeader = withRouter(props => {
    const AppCtx = useContext(AppContext);
    const {postsMainBase, setPosts} = AppState();
    const {getCategory} = useCategoryAndPostTitleHook()

    const getPostsByCategory = (categoryName) => {
        let postsByCategory = postsMainBase.filter(post => {
            return post.categories[0].name === categoryName;
        })
        setPosts(postsByCategory);
      }

    return(
        <div id="SecondHeader">
            <div className="second-header-container">
                <nav>
                    <ul>
                        <li onClick={
                            () => props.history.push("/")
                            }>Home</li>
                        <li style={{
                            paddingLeft: "25px", 
                            marginLeft: "25px", 
                            borderLeft: "1px solid white"}}
                            onClick={() => {
                            props.history.push("/blog");
                            AppCtx.setPosts(AppCtx.allPosts);
                            getCategory();
                            }}>Blog</li>
                        <li style={{
                            display: props.category === undefined ? "none" : "block", 
                            paddingLeft: "25px", 
                            marginLeft: "25px", 
                            borderLeft: "1px solid white"}} 
                            onClick={() => {
                            props.history.push("/blog")
                            getPostsByCategory(props.category)
                            }}>{props.category}</li>
                        <li style={{
                            display: props.postTitle === undefined ? "none" : "block", 
                            paddingLeft: "25px", 
                            marginLeft: "25px", 
                            borderLeft: "1px solid white"
                            }}>{props.postTitle}</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
});

export default withRouter(SecondHeader);