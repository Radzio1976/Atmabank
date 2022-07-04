import { createGlobalState } from "react-hooks-global-state";

const initialState = {category: "", postTitle: "", postSlug: ""};

const {useGlobalState} = createGlobalState(initialState);

const AppState = () => {
    const [category, setCategory] = useGlobalState("category");
    const [postTitle, setPostTitle] = useGlobalState("postTitle");

    return {category, setCategory, postTitle, setPostTitle};
};

export default AppState;