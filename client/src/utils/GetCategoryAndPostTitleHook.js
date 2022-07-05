import AppState from "./AppState";

const useCategoryAndPostTitleHook = () => {
    const {setCategory, setPostTitle} = AppState();

    const getCategory = (category) => setCategory(category);
    const getPostTitle = (postTitle) => setPostTitle(postTitle);

    return {getCategory, getPostTitle};
};

export default useCategoryAndPostTitleHook;