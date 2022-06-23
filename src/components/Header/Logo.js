import {useQuery, gql} from "@apollo/client";
import {withRouter} from 'react-router-dom';

import './Header.css';

  const LOGOQUERY = gql`
  {
    logo(where: {id: "cl3n2t6id8ur90bup0inx68lf"}) {
      id
      title
    }
  }
  `

  const Logo = withRouter(props => {
    const {data, error, loading} = useQuery(LOGOQUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    //console.log(data.logo.title)
    
    return(
      <div id="Logo">
        <div id="logo-container">
          <h1 onClick={() => props.history.push("/")}>{data.logo.title}</h1>
        </div>
      </div>
    )
  })

  export default withRouter(Logo);