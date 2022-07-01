import { useParams } from "react-router-dom";
import {useQuery, gql } from "@apollo/client";

const GET_CURRENT_POST = gql`
  query BlogPost($slug: String!) {
    blogPosts(where: {slug: $slug}) {
      id
      title
      slug
      categories {
        id
        name
  }
      image {
        id
        url
        fileName
      }
      text {
        text
        html
      }
    }
  }
`;

const GetCurrentPost = () => {
    let { slug } = useParams();

    const { loading, error, data } = useQuery(GET_CURRENT_POST, {
      variables: { slug },
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;
  
    const currentPost = data.blogPosts[0];

    return {slug, currentPost};
};

export default GetCurrentPost;