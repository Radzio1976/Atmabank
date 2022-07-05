import { useEffect } from 'react';
import Axios from 'axios';

import './Blog.css';

import BlogContainerLeftColumn from './BlogContainerLeftColumn';
import BlogContainerRightColumn from './BlogContainerRightColumn';
import RecentPosts from '../RecentPosts/RecentPosts';
import PostsCategories from '../PostsCategories/PostsCategories';
import RecentComments from '../RecentComments';

import AppState from '../../utils/AppState';
import useCategoryAndPostTitleHook from '../../utils/GetCategoryAndPostTitleHook';
import useLastFiveCommentsHook from '../../utils/GetLastFiveCommentsHook';

const Blog = () => {
  const {category} = AppState();
  const {getCategory, getPostTitle} = useCategoryAndPostTitleHook();
  const {getLastFiveComments} = useLastFiveCommentsHook();
 
  useEffect(() => {
    Axios.post("/getComments")
    .then(res => {
      //console.log("Wszystkie komentarze:");
      //console.log(res.data.comments);
      getLastFiveComments(res.data.comments);
    })
    .catch(err => {
        console.log("Nie udało się pobrać komentarzy")
    });
    getCategory(category);
    getPostTitle();
  }, [])

  return(
      <div id="Blog">
        <div className="blog-container">
          <BlogContainerLeftColumn />
          <BlogContainerRightColumn>
            <RecentPosts />
            <PostsCategories />
            <RecentComments />
          </BlogContainerRightColumn>
        </div>
      </div>
  )
};

export default Blog;