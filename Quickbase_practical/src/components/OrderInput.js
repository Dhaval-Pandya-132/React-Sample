import React from "react";
import PropTypes from 'prop-types';

const OptionComponent = (props) => {
    return (
        <option value={props.value}>
            {props.label}
        </option>
    );
};

OptionComponent.propTyoes = {
    label: PropTypes.string,
    value: PropTypes.string
};

const OrderInput = (props) => {
    return (
        <div className="form-group row">
            <label className={"col-sm-3 col-form-label"}>
                {props.labelText}
            </label>
            <div className="col-sm-9">

                <select className="form-control" required={props.required} value={props.value}
                        onChange={props.onChange}>
                    {props.optionsArray.map(
                        (optionObj, index) => (
                            <OptionComponent key={index}
                                             value={optionObj.value}
                                             label={optionObj.displayLabel}
                            />
                        )
                    )}
                </select>
            </div>
        </div>
    );
};

export default OrderInput;

OrderInput.propTypes = {
    labelText: PropTypes.string,
    optionsArray: PropTypes.array,
    required: PropTypes.bool,
    onChange: PropTypes.func
};
