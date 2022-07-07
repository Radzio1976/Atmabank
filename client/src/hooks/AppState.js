import { createGlobalState } from "react-hooks-global-state";

const initialState = {
    postsMainBase: [],
    posts: [],
    category: "", 
    currentPost: {},
    postTitle: "", 
    currentPostSlug: "", 
    postID: "", 
    lastFiveComments: [],
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    text: "",
    textError: "",
    currentPostComments: [],
    currentPostCommentsQty: 0,
    mainCommentsFormVisibility: true
};

const {useGlobalState} = createGlobalState(initialState);

const AppState = () => {
    const [postsMainBase, setPostsMainBase] = useGlobalState("postsMainBase"); 
    const [posts, setPosts] = useGlobalState("posts"); 

    const [category, setCategory] = useGlobalState("category");

    const [currentPost, setCurrentPost] = useGlobalState("currentPost");
    const [postTitle, setPostTitle] = useGlobalState("postTitle");
    const [currentPostSlug, setCurrentPostSlug] = useGlobalState("currentPostSlug");
    const [postID, setPostID] = useGlobalState("postID");

    const [lastFiveComments, setLastFiveComments] = useGlobalState("lastFiveComments");

    const [name, setName] = useGlobalState("name");
    const [nameError, setNameError] = useGlobalState("nameError");
    const [email, setEmail] = useGlobalState("email");
    const [emailError, setEmailError] = useGlobalState("emailError");
    const [text, setText] = useGlobalState("text");
    const [textError, setTextError] = useGlobalState("textError");

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
        currentPost, 
        setCurrentPost,
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
        nameError, 
        setNameError,
        email,
        setEmail,
        emailError, 
        setEmailError,
        text,
        setText,
        textError, 
        setTextError,
        currentPostComments,
        setCurrentPostComments,
        currentPostCommentsQty, 
        setCurrentPostCommentsQty,
        mainCommentsFormVisibility, 
        setMainCommentsFormVisibility
    };
};

export default AppState;