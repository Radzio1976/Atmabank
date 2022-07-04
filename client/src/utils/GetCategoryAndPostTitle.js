import AppState from "./AppState";

const useCategoryAndPostTitle = () => {
    const {setCategory, setPostTitle} = AppState();

    const getCategory = (category) => setCategory(category);
    const getPostTitle = (postTitle) => setPostTitle(postTitle);

    return {getCategory, getPostTitle};
};

export default useCategoryAndPostTitle;