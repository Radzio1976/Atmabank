import { useParams } from "react-router-dom";
import {useQuery } from "@apollo/client";
import Axios from 'axios';

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
import BackToTopButton from "../BackToTopButton/BackToTopButton";

import "./BlogPost.css";

import AppState from '../../hooks/AppState';
import useCurrentPostDataHook from '../../hooks/useCurrentPostDataHook';
import useLastFiveCommentsHook from '../../hooks/useLastFiveCommentsHook';
import useCurrentPostCommentsHook from '../../hooks/useCurrentPostCommentsHook';
import useCurrentPostCommentsQtyHook from '../../hooks/useCurrentPostCommentsQtyHook';

const BlogPost = () => {
  const {currentPostComments} = AppState();
  const {getCategory, getPostTitle, getCurrentPostID, getCurrentPostSlug} = useCurrentPostDataHook();
  const {getLastFiveComments} = useLastFiveCommentsHook();
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
      getCurrentPostID(currentPost.id);    
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

  return(
      <div id="BlogPost">
        <div className="blogpost-container">
          <BlogpostContainerLeftColumn>
            <BlogpostPostContainer currentPost={currentPost} />
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
            <PostsCategories />
            <RecentComments />
          </BlogpostContainerRightColumn>
          <BackToTopButton />
        </div>
    </div>
  )
}

export default BlogPost;