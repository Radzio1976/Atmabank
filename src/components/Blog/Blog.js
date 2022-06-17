import './Blog.css';

import SecondHeader from '../Secondheader';
import BlogContainerLeftColumn from './BlogContainerLeftColumn';
import BlogContainerRightColumn from './BlogContainerRightColumn';
import RecentPosts from '../RecentPosts/RecentPosts';
import PostsCategories from '../PostsCategories/PostsCategories';

const Blog = () => {
  return(
      <div id="Blog">
        <SecondHeader currentPostCategories={"Kategorie danego posta"} />
        <div className="blog-container">
          <BlogContainerLeftColumn />
          <BlogContainerRightColumn>
            <RecentPosts />
            <PostsCategories />
          </BlogContainerRightColumn>
        </div>
      </div>
  )
};

export default Blog;