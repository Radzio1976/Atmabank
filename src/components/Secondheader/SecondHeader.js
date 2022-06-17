import { useContext } from 'react';
import {withRouter} from 'react-router-dom';

import './SecondHeader.css';

import { AppContext } from '../../App';

const SecondHeader = withRouter(props => {
    const AppCtx = useContext(AppContext);
    console.log(AppCtx.secondHeaderMenu)
    return(
        <div id="SecondHeader">
            <div className="second-header-container">
                <nav>
                    <ul>
                        <li onClick={() => props.history.push("/")}>Home</li>
                        <li onClick={() => props.history.push("/")}>{AppCtx.category}</li>
                        <li>{AppCtx.currentPostTitle}</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
});

export default withRouter(SecondHeader);