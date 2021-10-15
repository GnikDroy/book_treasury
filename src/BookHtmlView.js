import React from 'react'
import { extract_html } from './BookApi';

function BookHtmlView(props) {
    const html_resource = extract_html(props.book);
    const html_style = {
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
    }
    return (
        <div className="mt-5">
            {
                html_resource != null &&
                <iframe src={html_resource.uri} title={props.book.title} style={html_style} />
            }
        </div>
    );
}

export default BookHtmlView
