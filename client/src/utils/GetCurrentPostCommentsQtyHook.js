import AppState from "./AppState";

const useCurrentPostCommentsQtyHook = () => {
    const {setCurrentPostCommentsQty} = AppState();

    const getCurrentPostCommentsQty = (currentComments) => {
        let result = 0;
        let parentCommentsQty = currentComments.length;
        currentComments.forEach(value => {
          result = value.commentAnswers.length + result;
        })
        setCurrentPostCommentsQty(result + parentCommentsQty);  
      };

      return {getCurrentPostCommentsQty};
};

export default useCurrentPostCommentsQtyHook;