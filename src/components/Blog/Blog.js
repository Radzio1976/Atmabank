import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const DANE = gql`
{
  homePage(where: {id: "cl3mx115w4wgy0cuimveo6jni"}) {
    id
    slug
    homePageText
    sliderID
  }
}
`

const Blog = () => {
  const {data, error, loading} = useQuery(DANE);
  console.log(data)
  return(
    <h1>Blog</h1>
  )
 }

export default Blog;