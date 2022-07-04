import { useContext, useEffect } from 'react';
import Axios from 'axios';

import './Blog.css';

import BlogContainerLeftColumn from './BlogContainerLeftColumn';
import BlogContainerRightColumn from './BlogContainerRightColumn';
import RecentPosts from '../RecentPosts/RecentPosts';
import PostsCategories from '../PostsCategories/PostsCategories';
import RecentComments from '../RecentComments';

import { AppContext } from '../../App';
import AppState from '../../utils/AppState';
import useCategoryAndPostTitle from '../../utils/GetCategoryAndPostTitle';

const Blog = () => {
  const AppCtx = useContext(AppContext);
  const {category} = AppState();
  const {getCategory, getPostTitle} = useCategoryAndPostTitle();
 
  useEffect(() => {
    Axios.post("/getComments")
    .then(res => {
      console.log("Wszystkie komentarze:");
      console.log(res.data.comments);
      AppCtx.getLastFiveComments(res.data.comments);
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