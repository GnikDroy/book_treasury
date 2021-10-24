import React from "react";

// props.placeholder
// props.btn_label
// props.action (input_dom) -> {}
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

export default SearchBar;