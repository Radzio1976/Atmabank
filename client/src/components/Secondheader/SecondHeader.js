import { useContext, useEffect } from 'react';
import {withRouter} from 'react-router-dom';

import './SecondHeader.css';

import { AppContext } from '../../App';

const SecondHeader = withRouter(props => {
    const AppCtx = useContext(AppContext);
    console.log(props)

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
                        <li onClick={
                            () => props.history.push("/")
                            }>Home</li>
                        <li style={{
                            paddingLeft: "25px", 
                            marginLeft: "25px", 
                            borderLeft: "1px solid white"}}
                            onClick={() => {
                            props.history.push("/blog");
                            //AppCtx.setPosts(AppCtx.allPosts);
                            AppCtx.clearCategory()
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
                            display: props.currentPostTitle === undefined ? "none" : "block", 
                            paddingLeft: "25px", 
                            marginLeft: "25px", 
                            borderLeft: "1px solid white"
                            }}>{props.currentPostTitle}</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
});

export default withRouter(SecondHeader);