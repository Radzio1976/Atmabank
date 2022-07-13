import {withRouter} from "react-router-dom";

import './Footer.css';

const Footer = (props) => {
    return(
        <div id="Footer">
            <div className="footer-container">
                <p onClick={() => props.history.push("/kontakt")}>Designed by <span>Atma Bank</span></p>
            </div>
        </div>
    )
};

export default withRouter(Footer);