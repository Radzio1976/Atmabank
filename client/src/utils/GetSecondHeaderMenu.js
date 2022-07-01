import { useContext } from "react";

import { AppContext } from "../App";

const GetSecondHeaderMenu = () => {
  const AppCtx = useContext(AppContext);

  AppCtx.setCategory(category);
  AppCtx.setCurrentPostTitle(currentPostTitle);
  AppCtx.setCurrentPostSlug(currentPostSlug);
}

export default GetSecondHeaderMenu;