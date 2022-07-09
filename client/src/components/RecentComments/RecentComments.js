import {withRouter} from 'react-router-dom';

import AppState from "../../hooks/AppState";
import useScrollToCommentsHook from "../../hooks/useScrollToCommentHook";
import useCommentTimeInPolishHook from "../../hooks/useCommentTimeInPolishHook";

const RecentComments = withRouter(props => {
  const {lastFiveComments} = AppState();
  const {scrollToComment} = useScrollToCommentsHook();
  const {getCommentTimeInPolish} = useCommentTimeInPolishHook();

  return(
    <div id="RecentComments"  className="right-column-box">
        <div className="recent-comments-container right-column-box-container" style={{wordBreak: "break-word"}}>
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
                                    <p>{getCommentTimeInPolish(new Date(comment.commentTime))}</p>
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