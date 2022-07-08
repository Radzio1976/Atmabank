import AppState from "./AppState";

const useCurrentPostDataHook = () => {
    const {setCategory, setPostTitle, setPostID, setCurrentPostSlug} = AppState();

    const getCategory = (category) => setCategory(category);
    const getPostTitle = (postTitle) => setPostTitle(postTitle);
    const getCurrentPostID = (postID) => setPostID(postID);
    const getCurrentPostSlug = (postSlug) => setCurrentPostSlug(postSlug);

    return {getCategory, getPostTitle, getCurrentPostID, getCurrentPostSlug};
};

export default useCurrentPostDataHook;