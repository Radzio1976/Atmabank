import AppState from "./AppState";

const useResetPostsHook = () => {
    const {setPosts, postsMainBase} = AppState();

    const getResetPosts = () => setPosts(postsMainBase);

    return {getResetPosts};
};

export default useResetPostsHook;