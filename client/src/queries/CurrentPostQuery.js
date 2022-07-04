import {gql } from "@apollo/client";

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
  }`;

export default GET_CURRENT_POST;