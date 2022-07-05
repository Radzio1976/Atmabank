import { createGlobalState } from "react-hooks-global-state";

const initialState = {
    postsMainBase: [],
    posts: [],
    category: "", 
    postTitle: "", 
    currentPostSlug: "", 
    postID: "", 
    lastFiveComments: []
};

const {useGlobalState} = createGlobalState(initialState);

const AppState = () => {
    const [postsMainBase, setPostsMainBase] = useGlobalState("postsMainBase"); 
    const [posts, setPosts] = useGlobalState("posts"); 

    const [category, setCategory] = useGlobalState("category");

    const [postTitle, setPostTitle] = useGlobalState("postTitle");
    const [currentPostSlug, setCurrentPostSlug] = useGlobalState("currentPostSlug");
    const [postID, setPostID] = useGlobalState("postID");

    const [lastFiveComments, setLastFiveComments] = useGlobalState("lastFiveComments");
    //console.log("AppState:");
    //console.log("Kategoria: ", category);
    //console.log("Tytuł aktualnego posta: ", postTitle);
    //console.log("Slug aktualnego posta: ", currentPostSlug);
    //console.log("ID aktualnego posta: ", postID);
    //console.log("Ostatnie 5 komentarzy: ", lastFiveComments);
    //console.log(postsMainBase)
    //console.log(posts)

    return {
        postsMainBase, 
        setPostsMainBase,
        posts, 
        setPosts,
        category, 
        setCategory, 
        postTitle, 
        setPostTitle, 
        currentPostSlug, 
        setCurrentPostSlug, 
        postID, 
        setPostID, 
        lastFiveComments, 
        setLastFiveComments
    };
};

export default AppState;