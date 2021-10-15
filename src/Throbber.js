import React from 'react';

function Throbber(props) {
    return (
        <div style={{ display: props.visible ? "block" : "none", width: props.size, height: props.size }}
            className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default Throbber;