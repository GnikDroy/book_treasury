
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for alert messages of various types.
 *
 * @component
 */
function AlertBox(props) {
    return (
        <aside className={"alert alert-" + props.type} role="alert">
            {props.children}
        </aside>
    );
}

AlertBox.propTypes = {
    /**
     * Type of the alert message
     */
    type: PropTypes.oneOf(['primary', 'secondary', 'danger',
        'success', 'info', 'warning', 'light', 'dark']),
    children: PropTypes.node.isRequired,
}

AlertBox.defaultProps = {
    type: "danger",
}

export default AlertBox;