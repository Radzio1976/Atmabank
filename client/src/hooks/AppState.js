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
    subject: "",
    subjectError: "Pole temat musi zawierać conajmniej 5 znaków",
    text: "",
    textError: "Pole tekst musi zawierać conajmniej 20 znaków",
    currentPostComments: [],
    currentPostCommentsQty: 0,
    mainCommentsFormVisibility: true,
    backToTopButton: false,
    screenWidth: window.innerWidth
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
    const [nameError] = useGlobalState("nameError");
    const [email, setEmail] = useGlobalState("email");
    const [emailError] = useGlobalState("emailError");
    const [subject, setSubject] = useGlobalState("subject");
    const [subjectError] = useGlobalState("subjectError");
    const [text, setText] = useGlobalState("text");
    const [textError] = useGlobalState("textError");

    const [currentPostComments, setCurrentPostComments] = useGlobalState("currentPostComments");
    const [currentPostCommentsQty, setCurrentPostCommentsQty] = useGlobalState("currentPostCommentsQty");

    const [mainCommentsFormVisibility, setMainCommentsFormVisibility] = useGlobalState("mainCommentsFormVisibility");

    const [backToTopButton, setBackToTopButton] = useGlobalState("backToTopButton");

    const [screenWidth, setScreenWidth] = useGlobalState("screenWidth");

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
        subject, 
        setSubject,
        subjectError,
        text,
        setText,
        textError,
        currentPostComments,
        setCurrentPostComments,
        currentPostCommentsQty, 
        setCurrentPostCommentsQty,
        mainCommentsFormVisibility, 
        setMainCommentsFormVisibility,
        backToTopButton, 
        setBackToTopButton,
        screenWidth, 
        setScreenWidth
    };
};

export default AppState;