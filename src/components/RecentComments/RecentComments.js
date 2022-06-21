import React, { useEffect } from 'react';
import { useContext } from "react";
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {withRouter, useHistory} from 'react-router-dom';
import { AppContext } from "../../App";

const RecentComments = withRouter(props => {
  const AppCtx = useContext(AppContext);
  //console.log(AppCtx.allComments)
  //console.log(AppCtx.lastFiveComments);

  useEffect(() => {
    AppCtx.getLastFiveComments(AppCtx.allComments);
  }, [AppCtx.setLastFiveComments])

  const history = useHistory();
  const scrollTarget = (target) => scroller.scrollTo(target, {smooth: true, duration: 700});

  const scrollToComment = async (target, slug) => {
    if (history.location.pathname !==`/${slug}`) {
      await history.push(`/${slug}`);
  }
    setTimeout(() => {
    scrollTarget(target);
    }, 1000)

};

  return(
    <div id="RecentComments">
        <div className="recent-comments-container">
        <div className="recent-comments-title">
            <h3>Aktualne posty</h3>
        </div>
        <nav>
            <ul>
                {
                    AppCtx.lastFiveComments.map((comment, index) => {
                        return(
                            <li onClick={() => scrollToComment(`${comment.scrollID}`, `${comment.currentPostSlug}`)} key={index} style={{marginBottom: "10px"}}>
                            <div className="recent-comments-user-container">
                                <div className="recent-comments-user-avatar"></div>
                                <div className="recent-comments-user-name-and-date">
                                    <p>{comment.name}</p>
                                    <p>{comment.commentTime}</p>
                                </div>
                            </div>
                            <div className="recent-comments-user-comment">
                                <p>{comment.text}</p>
                            </div>
                        </li>
                        )
                    })
                }

            </ul>
        </nav>
      </div>
  </div>
  )
})

export default withRouter(RecentComments);