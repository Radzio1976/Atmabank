import { useContext } from "react";
import { scroller } from 'react-scroll'
import {withRouter, useHistory} from 'react-router-dom';
import { AppContext } from "../../App";

import AppState from "../../utils/AppState";

const RecentComments = withRouter(props => {
  const AppCtx = useContext(AppContext);
  const {lastFiveComments} = AppState();

  const history = useHistory();
  const scrollTarget = (target) => scroller.scrollTo(target, {smooth: true, duration: 700});

  const scrollToComment = async (target, slug) => {
    if (history.location.pathname !==`/blog/${slug}`) {
      await history.push(`/blog/${slug}`);
  }
    const interval = setInterval(() => {
        scrollTarget(target);
        if (document.getElementById(`${target}`) !== null) {
            clearInterval(interval);
        }
    }, 100)
};

  return(
    <div id="RecentComments"  className="right-column-box">
        <div className="recent-comments-container right-column-box-container">
        <div className="recent-comments-title right-column-box-title">
            <h3>Aktualne komentarze</h3>
        </div>
        <nav>
            <ul>
                {
                    lastFiveComments.map((comment, index) => {
                        return(
                            <li onClick={() => scrollToComment(`${comment.scrollID}`, `${comment.currentPostSlug}`)} key={index} style={{marginBottom: "10px"}}>
                            <div className="recent-comments-user-container">
                                <div className="recent-comments-user-avatar"></div>
                                <div className="recent-comments-user-name-and-date">
                                    <p>{comment.name}</p>
                                    <p>{AppCtx.getCommentTimeInPolish(new Date(comment.commentTime))}</p>
                                </div>
                            </div>
                            <div className="recent-comments-user-comment">
                                <p>{comment.text.substring(0, 80)} ...</p>
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