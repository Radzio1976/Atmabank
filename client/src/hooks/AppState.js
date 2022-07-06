import { createGlobalState } from "react-hooks-global-state";

const initialState = {
    postsMainBase: [],
    posts: [],
    category: "", 
    postTitle: "", 
    currentPostSlug: "", 
    postID: "", 
    lastFiveComments: [],
    name: "",
    email: "",
    text: "",
    currentPostComments: [],
    currentPostCommentsQty: 0,
    mainCommentsFormVisibility: true
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

    const [name, setName] = useGlobalState("name");
    const [email, setEmail] = useGlobalState("email");
    const [text, setText] = useGlobalState("text");

    const [currentPostComments, setCurrentPostComments] = useGlobalState("currentPostComments");
    const [currentPostCommentsQty, setCurrentPostCommentsQty] = useGlobalState("currentPostCommentsQty");

    const [mainCommentsFormVisibility, setMainCommentsFormVisibility] = useGlobalState("mainCommentsFormVisibility");
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
        setLastFiveComments,
        name,
        setName,
        email,
        setEmail,
        text,
        setText,
        currentPostComments,
        setCurrentPostComments,
        currentPostCommentsQty, 
        setCurrentPostCommentsQty,
        mainCommentsFormVisibility, 
        setMainCommentsFormVisibility
    };
};

export default AppState;