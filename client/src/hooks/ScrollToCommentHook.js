import { scroller } from 'react-scroll'
import {useHistory} from 'react-router-dom';

const useScrollToCommentsHook = () => {
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
        }, 100);
    };

    return {scrollToComment};
}

export default useScrollToCommentsHook;