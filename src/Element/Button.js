import React from 'react';
import './element.css';
const Button = ({ onClick, children, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={`btn ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
// Button.propTypes = {
//     onClick: PropTypes.func,
//     children: PropTypes.node.isRequired,
//     className: PropTypes.string,
//     disabled: PropTypes.bool
// };

// Button.defaultProps = {
//     onClick: () => { },
//     className: '',
//     disabled: false
// };

export default Button;