import {withRouter} from 'react-router-dom';

import './SecondHeader.css';

import useResetPostsHook from '../../utils/GetResetPostsHook';
import useCategoryAndPostTitleHook from '../../utils/GetCategoryAndPostTitleHook';
import usePostsByCategoryHook from '../../utils/GetPostsByCategoryHook';

const SecondHeader = withRouter(props => {
    const {getResetPosts} = useResetPostsHook();
    const {getCategory} = useCategoryAndPostTitleHook()
    const {getPostsByCategory} = usePostsByCategoryHook();

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
                            getResetPosts();
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