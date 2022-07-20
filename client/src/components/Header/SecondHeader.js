import {withRouter} from 'react-router-dom';

import './SecondHeader.css';

import AppState from '../../hooks/AppState';
import useResetPostsHook from '../../hooks/useResetPostsHook';
import useCurrentPostDataHook from '../../hooks/useCurrentPostDataHook';
import usePostsByCategoryHook from '../../hooks/usePostsByCategoryHook';
import useScreenWidthHook from '../../hooks/useScreenWidthHook';
import useScrollToTopHook from '../../hooks/useScrollToTopHook';

const SecondHeader = withRouter(props => {
    const pathName = props.location.pathname;
    const {screenWidth} = AppState();

    const {getResetPosts} = useResetPostsHook();
    const {getCategory} = useCurrentPostDataHook();
    const {getPostsByCategory} = usePostsByCategoryHook();
    const {GetScreenWidth} = useScreenWidthHook();
    const {scrollToTop} = useScrollToTopHook();

    GetScreenWidth();

    return(
        <div id="SecondHeader">
            <div className="second-header-container">
                <nav>
                    <ul>
                        <li style={{
                            display: pathName !== "/blog" && screenWidth <= 649 ? "none" : "block",
                            borderLeft: "none",
                            margin: "0 auto"
                        }}
                            onClick={
                            () => {
                                props.history.push("/")
                                scrollToTop();
                            }}>Home</li>
                        <li style={{
                            display: pathName !== "/blog" && screenWidth <= 649 ? "none" : "block"
                        }}
                            onClick={() => {
                            props.history.push("/blog");
                            getResetPosts();
                            getCategory();
                            scrollToTop();
                            }}>Blog</li>
                        <li style={{
                            display: props.category === undefined || (pathName !== "/blog" && screenWidth <= 649) ? "none" : "block",
                            borderLeft: props.category === "" ? "none" : "1px solid white"
                        }} 
                            onClick={() => {
                            props.history.push("/blog");
                            getPostsByCategory(props.category);
                            scrollToTop();
                            }}>{props.category}</li>
                        <li style={{
                            display: props.postTitle === undefined ? "none" : "block",
                            borderLeft: pathName !== "/blog" && screenWidth <= 649 ? "none" : "",
                            margin: pathName !== "/blog" && screenWidth <= 649 ? "0 auto" : ""
                            }}>{props.postTitle}</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
});

export default withRouter(SecondHeader);