import { createGlobalState } from "react-hooks-global-state";

const initialState = {category: "", postTitle: "", postSlug: "", lastFiveComments: []};

const {useGlobalState} = createGlobalState(initialState);

const AppState = () => {
    const [category, setCategory] = useGlobalState("category");
    const [postTitle, setPostTitle] = useGlobalState("postTitle");
    const [postSlug, setPostSlug] = useGlobalState("postSlug");

    const [lastFiveComments, setLastFiveComments] = useGlobalState("lastFiveComments");

    return {category, setCategory, postTitle, setPostTitle, postSlug, setPostSlug, lastFiveComments, setLastFiveComments};
};

export default AppState;