import React from "react"
import './customer.css'
export const AddCustomer = () => {
    return (
        <React.Fragment>
            <fieldset>
                <legend>Customer Detail</legend>
                <div className="row">
                    <div className="col-lg-3 col-sm-12">
                        <div class="mb-3">
                            <label for="outlinedInput" className="form-label">Name</label>
                            <input type="text" className="form-control" id="outlinedInput" placeholder="Enter text here" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <div class="mb-3">
                            <label for="outlinedInput" className="form-label">Group</label>
                            <input type="text" className="form-control" id="outlinedInput" placeholder="Enter text here" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <div class="mb-3">
                            <label for="outlinedInput" className="form-label">Age</label>
                            <input type="text" className="form-control" id="outlinedInput" placeholder="Enter text here" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <div class="mb-3">
                            <label for="outlinedInput" className="form-label">Group</label>
                            <input type="text" className="form-control" id="outlinedInput" placeholder="Enter text here" />
                        </div>
                    </div>
                </div>
            </fieldset>
        </React.Fragment>
    )
}