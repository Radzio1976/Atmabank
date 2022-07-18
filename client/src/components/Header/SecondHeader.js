import {withRouter} from 'react-router-dom';

import './SecondHeader.css';

import useResetPostsHook from '../../hooks/useResetPostsHook';
import useCurrentPostDataHook from '../../hooks/useCurrentPostDataHook';
import usePostsByCategoryHook from '../../hooks/usePostsByCategoryHook';
import { useEffect } from 'react';
import { useState } from 'react';

const SecondHeader = withRouter(props => {
    console.log(props.location.pathname)
    const pathName = props.location.pathname;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth)
        })
    })
    console.log(screenWidth)
    const {getResetPosts} = useResetPostsHook();
    const {getCategory} = useCurrentPostDataHook();
    const {getPostsByCategory} = usePostsByCategoryHook();

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
                            () => props.history.push("/")
                            }>Home</li>
                        <li style={{
                            display: pathName !== "/blog" && screenWidth <= 649 ? "none" : "block"
                        }}
                            onClick={() => {
                            props.history.push("/blog");
                            getResetPosts();
                            getCategory();
                            }}>Blog</li>
                        <li style={{
                            display: props.category === undefined || (pathName !== "/blog" && screenWidth <= 649) ? "none" : "block",
                            borderLeft: props.category === "" ? "none" : "1px solid white"
                        }} 
                            onClick={() => {
                            props.history.push("/blog")
                            getPostsByCategory(props.category)
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