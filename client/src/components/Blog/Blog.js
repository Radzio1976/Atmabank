import { useContext, useEffect } from 'react';
import Axios from 'axios';

import './Blog.css';

import SecondHeader from '../Secondheader';
import BlogContainerLeftColumn from './BlogContainerLeftColumn';
import BlogContainerRightColumn from './BlogContainerRightColumn';
import RecentPosts from '../RecentPosts/RecentPosts';
import PostsCategories from '../PostsCategories/PostsCategories';
import RecentComments from '../RecentComments';

import { AppContext } from '../../App';

const Blog = () => {
  const AppCtx = useContext(AppContext);

  useEffect(() => {
    Axios.get("http://localhost:3000/comments")
    .then(res => {
      AppCtx.getLastFiveComments(res.data)  
    })
    .catch(err => {
        console.log("Nie udało się pobrać komentarzy")
    });
    AppCtx.getSecondHeaderMenu(AppCtx.category)
  }, [])

  return(
      <div id="Blog">
        <SecondHeader category={AppCtx.category} currentPostTitle={AppCtx.currentPostTitle} currentPostSlug={AppCtx.currentPostSlug} />
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