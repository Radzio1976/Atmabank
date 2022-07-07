import AppState from "./AppState";

const useCurrentPostIDHook = () => {
const {setPostID} = AppState();

const getCurrentPostID = (postID) => setPostID(postID);

return {getCurrentPostID};
};

export default useCurrentPostIDHook;