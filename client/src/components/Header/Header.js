import {withRouter} from 'react-router-dom';

import Logo from './Logo';
import Navigation from './Navigation';
import SecondHeader from './SecondHeader';

import AppState from '../../hooks/AppState';

  const Header = withRouter(props => {
    const {category, postTitle} = AppState();

    const secondHeaderRender = () => {
      if (props.location.pathname.includes("/blog")) {
        return <SecondHeader category={category} postTitle={postTitle} />
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