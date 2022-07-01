import { createContext, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {useQuery, gql } from "@apollo/client";
import { AppContext } from '../../App';

import GET_CURRENT_POST from '../../queries/CurrentPostQuery';

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
import RecentComments from '../RecentComments';

import "./BlogPost.css";

const BlogPostContext = createContext();

const BlogPost = () => {
  const AppCtx = useContext(AppContext);
  let { slug } = useParams();

  const { loading, error, data } = useQuery(GET_CURRENT_POST, {
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
        <div className="blogpost-container">
          <BlogpostContainerLeftColumn>
            <BlogpostPostContainer />
            <BlogpostCommentsContainer>
              <BlogpostCommentsQuantityContainer />
              <BlogpostCommentsWrapper>
                {
                  AppCtx.currentPostComments.map((comment, index) => {
                      return(
                          <div id={`${currentPost.slug}-${index + 1}-comment`} className="blogpost-comment-wrapper" key={comment._id}>
                              <BlogpostCommentNameAndTextWrapper comment={comment} />
                              <BlogpostCommentDateAndButtonWrapper comment={comment} />
                              <BlogpostAddCommentsAnswerFormContainer comment={comment} />
                              <BlogpostCommentsAnswerContainer comment={comment} parentCommentIndex={index} currentPostSlug={currentPost.slug} />
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
            <RecentComments />
          </BlogpostContainerRightColumn>
        </div>
    </div>
    </BlogPostContext.Provider>
  )
}

export {BlogPostContext};
export default BlogPost;