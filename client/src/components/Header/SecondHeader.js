import {withRouter} from 'react-router-dom';

import './SecondHeader.css';

import useResetPostsHook from '../../hooks/useResetPostsHook';
import useCurrentPostDataHook from '../../hooks/useCurrentPostDataHook';
import usePostsByCategoryHook from '../../hooks/usePostsByCategoryHook';

const SecondHeader = withRouter(props => {
    const {getResetPosts} = useResetPostsHook();
    const {getCategory} = useCurrentPostDataHook();
    const {getPostsByCategory} = usePostsByCategoryHook();

    return(
        <div id="SecondHeader">
            <div className="second-header-container">
                <nav>
                    <ul>
                        <li className="first-second-header-li"
                            onClick={
                            () => props.history.push("/")
                            }>Home</li>
                        <li className="second-header-li second-second-header-li"
                            onClick={() => {
                            props.history.push("/blog");
                            getResetPosts();
                            getCategory();
                            }}>Blog</li>
                        <li className="second-header-li third-second-header-li"
                            style={{
                            display: props.category === undefined ? "none" : "block"
                        }} 
                            onClick={() => {
                            props.history.push("/blog")
                            getPostsByCategory(props.category)
                            }}>{props.category}</li>
                        <li className="second-header-li fourth-second-header-li"
                            style={{
                            display: props.postTitle === undefined ? "none" : "block"
                            }}>{props.postTitle}</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
});

export default withRouter(SecondHeader);