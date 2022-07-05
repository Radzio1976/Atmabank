import AppState from "./AppState";

const useCurrentPostID = () => {
const {setPostID} = AppState();

const getCurrentPostID = (postID) => setPostID(postID);

return {getCurrentPostID};
};

export default useCurrentPostID;