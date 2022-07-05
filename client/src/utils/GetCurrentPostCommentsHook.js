import AppState from "./AppState";

const useCurrentPostCommentsHook = () => {
    const {setCurrentPostComments} = AppState();

    const getCurrentPostComments = (currentComments) => setCurrentPostComments(currentComments);

    return {getCurrentPostComments};
};

export default useCurrentPostCommentsHook;