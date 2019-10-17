import React from "react";
import PropTypes from 'prop-types';

const Button = ({cssClassName, onClick, caption, captionClassName}) => (
    <button className={cssClassName} onClick={onClick} type="button">
        <span className={captionClassName}>{caption}</span>
    </button>
);

export default Button;

Button.propTypes = {
    cssClassName: PropTypes.string,
    onClick: PropTypes.func,
    caption: PropTypes.string
};

