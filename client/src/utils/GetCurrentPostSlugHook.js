import AppState from "./AppState";

const useCurrentPostSlugHook = () => {
    const {setCurrentPostSlug} = AppState();

    const getCurrentPostSlug = (postSlug) => setCurrentPostSlug(postSlug);

    return {getCurrentPostSlug};
};

export default useCurrentPostSlugHook;