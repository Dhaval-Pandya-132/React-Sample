import React from "react";
import PropTypes from 'prop-types';


const TextInput = (props) => (
    <div className="form-group row">
        <label className={"col-sm-3 col-form-label"}>
            {props.labelText}
        </label>
        <div className="col-sm-9">
            <input className="form-control" required={props.required} type="text" name="labelInput" value={props.value}
                   onChange={
                       props.onChange
                   }/>
        </div>
    </div>
);

export default TextInput;

TextInput.propTypes = {
    labelText: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func
};

