import { createContext, useContext } from 'react';
import { useParams } from "react-router-dom";
import {useQuery, gql } from "@apollo/client";
import { AppContext } from '../../App';

import SecondHeader from '../Secondheader';
import BlogpostContainerLeftColumn from './BlogpostContainerLeftColumn';
import BlogpostPostContainer from "./BlogpostPostContainer";
import BlogpostCommentsContainer from "./BlogpostCommentsContainer";
import BlogpostCommentsQuantityContainer from './BlogpostCommentsQuantityContainer';
import BlogpostAddCommentFormContainer from './BlogpostAddCommentFormContainer';
import BlogpostCommentsWrapper from './BlogpostCommentsWrapper';
import BlogpostCommentNameAndTextWrapper from './BlogpostCommentNameAndTextWrapper';
import BlogpostCommentsAnswerContainer from './BlogpostCommentsAnswerContainer';
import BlogpostAddCommentsAnswerFormContainer from './BlogpostAddCommentsAnswerFormContainer';
import BlogpostCommentDateAndButtonWrapper from './BlogpostCommentDateAndButtonWrapper';
import BlogpostContainerRightColumn from './BlogpostContainerRightColumn';
import RecentPosts from '../RecentPosts/RecentPosts';
import PostsCategories from '../PostsCategories/PostsCategories';

import "./BlogPost.css";

const BlogPostContext = createContext();

const GET_CURRENR_POST = gql`
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

const BlogPost = () => {
  const AppCtx = useContext(AppContext);
  let { slug } = useParams();

  const { loading, error, data } = useQuery(GET_CURRENR_POST, {
    variables: { slug },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const currentPost = data.blogPosts[0];

  return(
    <BlogPostContext.Provider value={{
      currentPost,
      postID: currentPost.id
    }}>
      <div id="BlogPost">
        <SecondHeader category={AppCtx.category} currentPostTitle={AppCtx.currentPostTitle} currentPostSlug={AppCtx.currentPostSlug} />
        <div className="blogpost-container">
          <BlogpostContainerLeftColumn>
            <BlogpostPostContainer />
            <BlogpostCommentsContainer>
              <BlogpostCommentsQuantityContainer />
              <BlogpostCommentsWrapper>
                {
                  AppCtx.currentPostComments.map(comment => {
                      return(
                          <div className="blogpost-comment-wrapper" key={comment.id}>
                              <BlogpostCommentNameAndTextWrapper comment={comment} />
                              <BlogpostCommentDateAndButtonWrapper comment={comment} />
                              <BlogpostAddCommentsAnswerFormContainer comment={comment} />
                              <BlogpostCommentsAnswerContainer comment={comment} />
                          </div>
                      )
                  })
                }
              </BlogpostCommentsWrapper>    
              <BlogpostAddCommentFormContainer /> 
            </BlogpostCommentsContainer>
          </BlogpostContainerLeftColumn>
          <BlogpostContainerRightColumn>
            <RecentPosts />
            <PostsCategories posts={AppCtx.posts} />
          </BlogpostContainerRightColumn>
        </div>
    </div>
    </BlogPostContext.Provider>
  )
}

export {BlogPostContext};
export default BlogPost;  