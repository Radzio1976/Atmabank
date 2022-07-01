import {withRouter} from 'react-router-dom';

import Logo from './Logo';
import Navigation from './Navigation';
import SecondHeader from '../Secondheader';

import { AppContext } from '../../App';
import { useContext } from 'react';

  const Header = withRouter(props => {
    const AppCtx = useContext(AppContext);
    const secondHeaderRender = () => {
      if (props.location.pathname.includes("/blog")) {
        return <SecondHeader category={AppCtx.category} currentPostTitle={AppCtx.currentPostTitle} currentPostSlug={AppCtx.currentPostSlug} />
      } else return null;
    }

      return(
        <>
        <Logo />
        <Navigation />
        {secondHeaderRender()}
        </>
    )
  })

  export default Header;