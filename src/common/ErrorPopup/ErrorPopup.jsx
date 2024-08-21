import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../Element/Button"
import Popup from "../Popup"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import './ErrorPopup.css';
export const ErrorPopup = ({errors = [], onClose})=>{
    return (
        <Popup>
            <div className="popup_header">
                <div className={`close_icon`} tabIndex={1} onClick={onClose}>
                    <FontAwesomeIcon icon={faClose}/>
                </div>
            </div>
            {
                errors.length ? (
                <div className="error_list">
                    <ul>
                        {errors.map((error, index)=><li key={index} dangerouslySetInnerHTML={{ __html: error }}></li>)}
                    </ul>
                </div>): null
            }
        </Popup>
    )
}