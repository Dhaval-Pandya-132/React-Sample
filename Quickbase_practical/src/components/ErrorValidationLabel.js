import React from "react";
import PropTypes from 'prop-types';

const ErrorValidationLabel = ({errorMessage}) => (
    <div className={"form-group row"}>
        <label className={"small-text text-danger"}>
            {errorMessage}
        </label>
    </div>
);

export default ErrorValidationLabel;

ErrorValidationLabel.propTypes = {
    errorMessage: PropTypes.string
};

