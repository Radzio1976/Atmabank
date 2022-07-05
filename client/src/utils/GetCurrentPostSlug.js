import AppState from "./AppState";

const useCurrentPostSlug = () => {
    const {setCurrentPostSlug} = AppState();

    const getCurrentPostSlug = (postSlug) => setCurrentPostSlug(postSlug);

    return {getCurrentPostSlug};
};

export default useCurrentPostSlug;