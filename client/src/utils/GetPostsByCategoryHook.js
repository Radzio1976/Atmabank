import { useContext } from "react";
import { AppContext } from "../App";

const useGetPostsByCategoryHook = () => {
    const AppCtx = useContext(AppContext);
    const getPostsByCategory = (categoryName) => {    
        let postsByCategory = AppCtx.allPosts.filter(post => {
            return post.categories[0].name === categoryName;
        })
        AppCtx.setPosts(postsByCategory);
    };
    return {getPostsByCategory};
};

export default useGetPostsByCategoryHook;