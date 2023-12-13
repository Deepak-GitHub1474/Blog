import "./PageNotFound.css";

import { useNavigate } from "react-router-dom";
import pageNotFound from "./pageNotFound.jpg"

function PageNotFound() {
    
    const navigate = useNavigate();
    function goback() {
        navigate(-1)
    }

    return (
        <div className="page-not-found-wrapper">
            <div>
                <img src={pageNotFound} alt="404-img" />
            </div>
            <div className="page-not-found-back-btn-container" onClick={goback}>
                <button className="page-not-found-back-btn">Go Back</button>
            </div>
        </div>
    )
}

export default PageNotFound;