
import React from 'react';

function AlertBox(props) {
    return (
        <div className={"alert alert-" + props.type} role="alert" style={{ display: props.visible ? "block" : "none" }}>
            {props.children}
        </div>
    );
}

export default AlertBox;