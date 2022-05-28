import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

  const LOGOQUERY = gql`
  {
    logo(where: {id: "cl3n2t6id8ur90bup0inx68lf"}) {
      id
      title
    }
  }
  `

  const Logo = () => {
    const {data, error, loading} = useQuery(LOGOQUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data.logo.title)
    
    return(
        <h1>{data.logo.title}</h1>
    )
  }

  export default Logo;