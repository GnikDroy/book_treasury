import React from 'react';
import PropTypes from 'prop-types';

/**
 * A spinny throbber component.
 *
 * @component
 */
function Throbber(props) {
    return (
        <div style={{ width: props.size, height: props.size }}
            className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

Throbber.propTypes = {
    /**
     * The size of the throbber. Fed to the width/height property in CSS.
     */
    size: PropTypes.string,
}

Throbber.defaultProps = {
    size: "5em",
}

export default Throbber;