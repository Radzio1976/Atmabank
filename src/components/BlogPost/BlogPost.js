import { useState } from 'react';
import { useParams } from "react-router-dom";
import {useQuery, gql } from "@apollo/client";

import BlogpostPostContainer from "./BlogpostPostContainer";
import BlogpostCommentsContainer from "./BlogpostCommentsContainer";

import "./BlogPost.css";

const ALLPOSTSQUERY = gql`
query MyQuery {
  blogPosts {
    id
    title
    slug
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
}`


const BlogPost = () => {
  let { slug } = useParams();

  const {data, error, loading} = useQuery(ALLPOSTSQUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const posts = data.blogPosts;

  const getCurrentPost = (slug) => {
    const currentPost = posts.filter(post => {
      return post.slug === slug;
    });
    return currentPost[0];
  }

  const currentPost = getCurrentPost(slug);

  return(
      <div id="BlogPost">
          <div className="blogpost-container">
          <div className="blogpost-container-left-column">
            <BlogpostPostContainer currentPost={currentPost} />
            <BlogpostCommentsContainer currentPost={currentPost} />
          </div>
          <div className="blogpost-container-right-column">

          </div>
          </div>
      </div>
  )
}

export default BlogPost;  