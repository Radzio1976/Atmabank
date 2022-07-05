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
    nameError: "Pole imię musi zawierać conajmniej 5 znaków",
    email: "",
    emailError: "Pole email musi zawierać conajmniej 5 znaków oraz @",
    text: "",
    textError: "Pole tekst musi zawierać conajmniej 20 znaków",
    currentPostComments: []
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
    const nameError = useGlobalState("nameError");
    const [email, setEmail] = useGlobalState("email");
    const emailError = useGlobalState("emailError");
    const [text, setText] = useGlobalState("text");
    const textError = useGlobalState("textError");

    const [currentPostComments, setCurrentPostComments] = useGlobalState("currentPostComments");
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
        nameError,
        email,
        setEmail,
        emailError,
        text,
        setText,
        textError,
        currentPostComments,
        setCurrentPostComments
    };
};

export default AppState;