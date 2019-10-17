import React from "react";
import PropTypes from 'prop-types';


const TypeInput = (props) => (
    <div className="form-group row">
        <label className={"col-sm-3 col-form-label"}>
            {props.labelText}
        </label>
        <div className="col-sm-9">
            <span className={"mr-5"}>{props.checkboxText}</span>
            <input className="form-check-input" required={props.required} type={"checkbox"}
                   checked={props.checked}
                   onChange={props.onChange}/>
        </div>
    </div>
);

export default TypeInput;

TypeInput.propTypes = {
    labelText: PropTypes.string,
    checkboxText: PropTypes.string,
    checked: PropTypes.bool,
    handleCheckboxChange: PropTypes.func,
    required: PropTypes.bool
};

