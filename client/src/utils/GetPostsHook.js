import AppState from "./AppState";

const usePostsHook = () => {
    const {setPostsMainBase, setPosts} = AppState();
    const getPosts = (data) => {
        setPostsMainBase(data);
        setPosts(data);
    };
    return {getPosts};
};

export default usePostsHook;