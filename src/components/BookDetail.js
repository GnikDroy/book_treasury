import React from 'react'
import PropTypes from 'prop-types';

/**
 * Component for individual book resource.
 *
 * @component
 */
export function BookResource(props) {
    const filename = props.uri.split("/").pop();
    return (
        <div className="row">
            <div className="col text-start fw-bold"> {filename} </div>
            <div className="col">
                <a className="btn btn-outline-success" href={props.uri}> {props.type} </a>
            </div>
        </div>
    );
}

BookResource.propTypes = {
    /**
     * The URI of the resource.
     */
    uri: PropTypes.string.isRequired,
    /**
     * The type of the resource.
     */
    type: PropTypes.string.isRequired,
}
BookResource.defaultProps = {}


/**
 * Display a table of book resources.
 *
 * @component
 */
export function BookResourceTable(props) {
    return (
        <div className="text-end">
            <div className="mb-2 h3">Resource Links</div>
            <div>
                {props.resources.map(x => <React.Fragment key={x.id}>{BookResource(x)}</React.Fragment>)}
            </div>
        </div>
    );
}
BookResourceTable.propTypes = {
    /**
     * The list of resource objects.
     */
    resources: PropTypes.array
}
BookResourceTable.defaultProps = {
    resources: []
}


/**
 * Display details of a book.
 *
 * @component
 */
function BookDetail(props) {
    const author = props.book.author == null ? "" : props.book.author.person;
    const cover = props.book.cover == null ? process.env.PUBLIC_URL + "/not_available.png" : props.book.cover.uri;

    const Badge = (props) => <span className="badge rounded-pill bg-success"> {props.children} </span>
    const BadgeList = (props) => props.list.map(x => <React.Fragment key={x} > <Badge>{x}</Badge> </React.Fragment>)

    return (
        <div className="container">
            <div className="row">
                <article className="col-md fade-slide-left">
                    <img className="img-fluid" src={cover} alt="Cover" />
                    <h1> {props.book.title} </h1>
                    <p className="h4"> {author} </p>
                    <p>
                        Type: {props.book.type}<br />
                        Downloads: {props.book.downloads}<br />
                        Languages: {props.book.languages.join(", ")} <br />
                        Bookshelves: <BadgeList list={props.book.bookshelves} />
                    </p>
                    <a href={props.book.license} className="btn btn-outline-success">License</a>
                </article>
                <article className="col-md fade-slide-right">
                    {props.book.resources != null && <BookResourceTable resources={props.book.resources} />}
                </article>
            </div>
        </div>
    );

}

BookDetail.propTypes = {
    /**
     * The book object to be displayed.
     */
    book: PropTypes.object.isRequired
}
BookDetail.defaultProps = {}

export default BookDetail;