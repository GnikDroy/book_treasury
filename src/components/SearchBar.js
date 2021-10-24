import React from "react";
import PropTypes from 'prop-types';

/**
 * A simple search bar.
 *
 * @component
 */
function SearchBar(props) {
    const input = React.useRef();
    return (
        <div className="input-group mb-3">
            <input ref={input}
                type="text"
                className="form-control"
                placeholder={props.placeholder}
                aria-label={props.placeholder}
                aria-describedby="basic-addon2"
                onKeyUp={(event) => {
                    if (event.key === "Enter") {
                        props.action(input.current);
                    }
                }}
            />
            <div className="input-group-append">
                <button
                    className="btn-lg btn-success"
                    type="button"
                    onClick={() => props.action(input.current)}>
                    {props.btn_label}
                </button>
            </div>
        </div>
    );

}

SearchBar.propTypes = {
    /**
     * Text to be displayed as a placeholder.
     */
    placeholder: PropTypes.string,
    /**
     * To be displayed in the button.
     */
    btn_label: PropTypes.node,
    /**
     * Text to be displayed in the button.
     */
    action: PropTypes.func.isRequired,
}

SearchBar.defaultProps = {
    placeholder: "Text",
    btn_label: "Search",
}
export default SearchBar;