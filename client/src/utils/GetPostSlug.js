import AppState from "./AppState";

const usePostSlug = () => {
    const {setPostSlug} = AppState();

    const getPostSlug = (postSlug) => setPostSlug(postSlug);

    return {getPostSlug};
};

export default usePostSlug;