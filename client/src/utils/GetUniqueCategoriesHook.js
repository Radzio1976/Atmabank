import AppState from "./AppState";

const useUniqueCategoriesHook = () => {
    const {postsMainBase} = AppState();
    const getUniqueCategories = () => {
        const mainBaseOfCategories = postsMainBase;
        let categoriesNames = [];
    
        mainBaseOfCategories.forEach(category => {
            categoriesNames.push(category.categories[0].name)
        })
    
        const uniqueCategories = [...new Set(categoriesNames)]

        return uniqueCategories.sort();
      };
      return {getUniqueCategories};
};

export default useUniqueCategoriesHook;