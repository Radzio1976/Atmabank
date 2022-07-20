import {withRouter} from "react-router-dom";

import './Footer.css';

import useScrollToTopHook from "../../hooks/useScrollToTopHook";

const Footer = (props) => {
    const {scrollToTop} = useScrollToTopHook();
    return(
        <div id="Footer">
            <div className="footer-container">
                <p onClick={() => {
                    props.history.push("/kontakt")
                    scrollToTop()}}>Designed by <span>Atma Bank</span></p>
            </div>
        </div>
    )
};

export default withRouter(Footer);