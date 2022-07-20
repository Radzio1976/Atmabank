import React from 'react';
import {withRouter} from 'react-router-dom';

import useResetPostsHook from '../../hooks/useResetPostsHook';
import useCurrentPostDataHook from '../../hooks/useCurrentPostDataHook';
import useResetFormHook from '../../hooks/useResetFormHook';
import useScrollToTopHook from '../../hooks/useScrollToTopHook';

const Navigation = withRouter(props => {
  const {getResetPosts} = useResetPostsHook();
  const {getCategory} = useCurrentPostDataHook();
  const {resetForm} = useResetFormHook();
  const {scrollToTop} = useScrollToTopHook();

  return(
    <div id="Navigation">
      <div id="nav-container">
        <nav>
          <ul>
            <li onClick={() => {
              props.history.push('/');
              scrollToTop();
              }}>HOME</li>
            <li onClick={() => {
              props.history.push('/o-mnie')
              scrollToTop();
              }}>O MNIE</li>
            <li onClick={() => {
              props.history.push('/blog');
              getResetPosts();
              getCategory();
              scrollToTop();
              }}>BLOG</li>
            <li onClick={() => {
              props.history.push('/kontakt')
              resetForm();
              scrollToTop();
              }}>KONTAKT</li>
          </ul>
        </nav>
      </div>
  </div>
  )
})

export default withRouter(Navigation);