import { createContext, useContext } from 'react';
import { useParams } from "react-router-dom";
import {useQuery } from "@apollo/client";
import Axios from 'axios';
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

import AppState from '../../utils/AppState';
import useCategoryAndPostTitleHook from '../../utils/GetCategoryAndPostTitleHook';
import useCurrentPostSlugHook from '../../utils/GetCurrentPostSlugHook';
import useLastFiveCommentsHook from '../../utils/GetLastFiveCommentsHook';
import useCurrentPostIDHook from '../../utils/GetCurrentPostIDHook';
import useCurrentPostCommentsHook from '../../utils/GetCurrentPostCommentsHook';
import useCurrentPostCommentsQtyHook from '../../utils/GetCurrentPostCommentsQtyHook';

const BlogPostContext = createContext();

const BlogPost = () => {
  const AppCtx = useContext(AppContext);
  const {currentPostComments} = AppState();
  const {getCategory, getPostTitle} = useCategoryAndPostTitleHook();
  const {getCurrentPostSlug} = useCurrentPostSlugHook();
  const {getLastFiveComments} = useLastFiveCommentsHook();
  const {getCurrentPostID} = useCurrentPostIDHook();
  const {getCurrentPostComments} = useCurrentPostCommentsHook();
  const {getCurrentPostCommentsQty} = useCurrentPostCommentsQtyHook();
  let { slug } = useParams();

const {error, loading, data} = useQuery(GET_CURRENT_POST, {onCompleted: (data) => {
  Axios.post("/getComments")
  .then(res => {
      //console.log("Wszystkie komentarze:");
      //console.log(res.data.comments);
      const currentComments = res.data.comments.filter(comment => {
          return comment.postID === data.blogPosts[0].id
      }); 
      let currentPost = data.blogPosts[0];
      getCategory(currentPost.categories[0].name);
      getPostTitle(currentPost.title);
      getCurrentPostSlug(currentPost.slug);
      getCurrentPostID(data.blogPosts[0].id);    
      getCurrentPostComments(currentComments);  
      getCurrentPostCommentsQty(currentComments);     
      getLastFiveComments(res.data.comments);   
  })
  .catch(err => {
      console.log("Nie udało się pobrać komentarzy")
  })
},
variables: {slug}})
if (loading) return <p>Loading...</p>;
if (error) return <p>Error :(</p>;

let currentPost = data.blogPosts[0];
let postID = currentPost.id

  return(
    <BlogPostContext.Provider value={{
      currentPost,
      postID
    }}>
      <div id="BlogPost">
        <div className="blogpost-container">
          <BlogpostContainerLeftColumn>
            <BlogpostPostContainer />
            <BlogpostCommentsContainer>
              <BlogpostCommentsQuantityContainer />
              <BlogpostCommentsWrapper>
                {
                  currentPostComments.map((comment, index) => {
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