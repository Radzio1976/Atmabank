import {useQuery, gql} from "@apollo/client";
  import {withRouter} from 'react-router-dom';
  import React from "react";

  const NAVQUERY = gql`
  query Navigation {
    navigation(where: {id: "cl3o72rpirmzd0eujlrw23y4q"}) {
      homeTitle
      homeSlug
      aboutTitle
      aboutSlug
      blogTitle
      blogSlug
      contactTitle
      contactSlug
    }
  }
  `

  const Navigation = withRouter(props => {
    const {data, error, loading} = useQuery(NAVQUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const navigationData = data.navigation;
    console.log(navigationData)

    return(
      <div id="Navigation">
        <div id="nav-container">
          <nav>
            <ul>
              <li onClick={() => props.history.push('/')}>{navigationData.homeTitle}</li>
              <li onClick={() => props.history.push(`/${navigationData.aboutSlug}`)}>{navigationData.aboutTitle}</li>
              <li onClick={() => props.history.push(`/${navigationData.blogSlug}`)}>{navigationData.blogTitle}</li>
              <li onClick={() => props.history.push(`/${navigationData.contactSlug}`)}>{navigationData.contactTitle}</li>
            </ul>
          </nav>
        </div>
    </div>
    )
  })

  /*
  const Navigation = (props) => {
    const {data, error, loading} = useQuery(NAVQUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data.navigation.homeTitle)

    return(
      <div id="Navigation">
        <nav>
          <ul>
            <li onClick={() => history.pushState("/")}>Home</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </div>
    )
  }
  */

  export default withRouter(Navigation);