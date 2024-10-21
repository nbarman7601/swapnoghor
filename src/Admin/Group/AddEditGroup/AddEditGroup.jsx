import React, { useEffect, useState } from "react";
import Popup from "../../../common/Popup"
import './AddEditGroup.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import apiService from "../../../axios";
import Button from "../../../Element/Button";
import Spinner from "../../../Element/Spinner";
import PropTypes from 'prop-types';
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const AddEditGroup = ({ group, mode, onClose }) => {
    const [groupData, setGroupData] = useState(group);
    const [los, setLos] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        apiService.get('/user/userlist', {
            params: {
                search: '',
                sortBy: 'firstName',
                sort: 'asc',
                page: 1,
                limit: 50,
                status: 'active',
                searchBy: ''
            },
        }).then((response) => {
            setLos(prevLos => response.data);
        })
    }, [group])


    const handleValueChange = (e) => {
        setGroupData((prevGroupData) => ({ ...prevGroupData, [e.target.name]: e.target.value }))
    }

    const addUpdateGroup = () => {
        if(mode === 'EDIT'){
            setLoading(true);
            apiService.put(`group/${groupData._id}/update`, groupData)
                .then(
                    (response)=>{
                        setLoading(false);
                        onClose(true);
                    }
                ).catch(error=>{
                   // onClose();
                    setLoading(false);
                })
        }else{
            setLoading(true)
            apiService.post(`group/add-new-group`, groupData)
                .then(
                    (response)=>{
                        onClose(true)
                        setLoading(false);
                    }
                ).catch(error=>{
                    setLoading(false);
                })
        }
    }

    const handleClose = ()=>{
        onClose(false);
    }

    return (
        <React.Fragment>
            <Popup>
                <div className="popup_header">
                    <div className={`close_icon`}  tabIndex={1} onClick={handleClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
                <div className="group_form">
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Group Name</label>
                            <input type="text"
                                name="name"
                                onChange={(e) => handleValueChange(e)}
                                value={groupData.name} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Weekday</label>
                            <select type="text"
                                name="weekday"
                                onChange={(e) => handleValueChange(e)}
                                value={groupData.name}>
                                {
                                    weekdays.map((weekday, index) => <option key={index} value={weekday}>{weekday}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Loan Officer</label>
                            <select type="text"
                                name="lo"
                                onChange={(e) => handleValueChange(e)}
                                value={groupData.lo}>
                                <option value={''}>--Select--</option>
                                {
                                    los.map((lo, index) => <option key={index} value={lo._id}>{lo.firstName + ' ' + lo.lastName}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="btn-container">
                        <Button onClick={addUpdateGroup}>{
                            mode === 'EDIT' ? 'Update Group' : 'Add Group'
                        }</Button>
                    </div>
                </div>
            </Popup>
            {loading ? <Spinner/> : null}
        </React.Fragment>
    )
}
AddEditGroup.propTypes = {
    group: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    mode: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}
