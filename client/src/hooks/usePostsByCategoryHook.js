import AppState from "./AppState";

const usePostsByCategoryHook = () => {
    const {postsMainBase, setPosts} = AppState();
    const getPostsByCategory = (categoryName) => {
        let postsByCategory = postsMainBase.filter(post => {
            return post.categories[0].name === categoryName;
        })
        setPosts(postsByCategory);
      }
    return {getPostsByCategory};
};

export default usePostsByCategoryHook;