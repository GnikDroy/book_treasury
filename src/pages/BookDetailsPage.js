import React from 'react'
import { useParams } from 'react-router-dom';
import { fetch_book, parse_book, extract_epub } from '../api/BookApi';
import Throbber from '../components/Throbber';
import BookDetail from '../components/BookDetail';
import EpubView from '../components/EpubView';
import AlertBox from '../components/AlertBox';


function BookDetailsPage() {
    const { id } = useParams();
    const [book, setBook] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [epubLocation, setEpubLocation] = React.useState(() => JSON.parse(localStorage.getItem(id)));

    React.useEffect(() => {
        fetch_book(id).then((result) => {
            setBook(parse_book(result));
            setLoading(false);
        }).catch(() => {
            setError(true);
        });
    }, [id]);

    React.useEffect(
        () => { localStorage.setItem(id, JSON.stringify(epubLocation)); },
        [id, epubLocation]
    );

    const error_msg =
        <AlertBox visible={error} type="danger">
            The book was not found.
        </AlertBox>;

    const CustomThrobber = (props) =>
        <div className="d-flex justify-content-center py-5 my-5">
            <Throbber {...props} />
        </div>

    return (
        <div className="container">
            {error_msg}
            {Object.keys(book).length !== 0 &&
                <>
                    <BookDetail book={book} />
                    {
                        extract_epub(book) &&
                        <EpubView
                            showToc={true}
                            title={book.title}
                            url={extract_epub(book).uri}
                            epubInitOptions={{ openAs: 'epub' }}
                            location={epubLocation}
                            locationChanged={(loc) => {
                                setEpubLocation(loc);
                                localStorage.setItem(id, JSON.stringify(loc));
                            }}
                            loadingView={
                                <CustomThrobber visible={true} size="6rem" />
                            }
                        />
                    }
                </>
            }
            <CustomThrobber visible={loading && !error} size="6rem" />
        </div>
    );
}

export default BookDetailsPage;