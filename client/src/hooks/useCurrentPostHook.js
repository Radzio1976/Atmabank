import AppState from "./AppState";

const useCurrentPostHook = () => {
    const {setCurrentPost} = AppState();

    const getCurrentPost = (currentPost) => setCurrentPost(currentPost);

    return {getCurrentPost};
};

export default useCurrentPostHook;