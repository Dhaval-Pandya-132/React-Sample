import React from "react";
import PropTypes from 'prop-types';

const ChoiceInput = (props) => {
    return (
        <div className="form-group row">
            <label className={"col-sm-3 col-form-label"}>
                {props.labelText}
            </label>
            <div className="col-sm-9">
                <textarea className="form-control" required={props.required} value={props.value}
                          onChange={props.onChange}/>
            </div>
        </div>
    );
};

export default ChoiceInput;

ChoiceInput.propTypes = {
    labelText: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func
};
